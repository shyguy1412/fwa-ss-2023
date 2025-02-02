// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Order } from '../../modules/models/Order';
import type { Request, Response } from 'express';
import { response } from '../../lib/Responses';
import { Product_Order } from '../../modules/models/Product_Order';
import type { Order as IOrder } from '../../../frontend/lib/api_client';
import { Product } from '../../modules/models/Product';
import { getProductOrderProduct } from '../../lib/APIHelpers';

const methods = {
    GET: (req: Request, res: Response) => _get(req, res),
    HEAD: (req: Request, res: Response) => _head(req, res),
    POST: (req: Request, res: Response) => _post(req, res),
    PUT: (req: Request, res: Response) => _put(req, res),
    DELETE: (req: Request, res: Response) => _delete(req, res),
    UPDATE: (req: Request, res: Response) => _update(req, res),
    OPTIONS: (req: Request, res: Response) => _options(req, res),
    TRACE: (req: Request, res: Response) => _trace(req, res),
};

export default async function handler(req: Request, res: Response) {
    const method = req.method ?? 'GET';
    if (Object.hasOwn(methods, method))
        await methods[method as keyof typeof methods](req, res);
}

async function _get(req: Request, res: Response) {
    //TODO: AUTH

    try {
        const orders = (await Order.findAll({
            include: Product_Order
        }));

        //@ts-ignore sequilize doesnt recognize included tables
        const productOrders: ProductOrder[][] = orders.map(order => order.getDataValue('Product_Orders'))

        const responseData: CamelToSnakeCaseNested<Required<IOrder>>[] = await Promise.all(orders.map(async (order, i) => ({
            id: order.id,
            user_id: order.user_id,
            order_date: order.order_date,
            shipping_method: order.shipping_method as NonNullable<IOrder['shippingMethod']>,
            payment_method: order.payment_method as NonNullable<IOrder['paymentMethod']>,
            products: await Promise.all(productOrders[i].map(productOrder => getProductOrderProduct(productOrder)))
        })));

        res.status(200).json(responseData);
    } catch (_) {
        console.log(_);
        return response(res, '500');
    }
}

async function _post(req: Request, res: Response) {
    const order = req.body as Order & { products: NonNullable<IOrder['products']>; };
    const newOrder = await Order.create({
        shipping_method: order.shipping_method,
        payment_method: order.payment_method,
        user_id: order.user_id
    });
    newOrder.save();
    for (const productOrder of order.products) {
        const newProductOrder = await Product_Order.create({
            amount: productOrder.amount!,
            order_id: newOrder.id,
            product_id: productOrder.id!
        });
    }
    res.status(201).json(order);
}

async function _put(req: Request, res: Response) {
    res.status(500).send('Method does not exist for this route');
}

async function _delete(req: Request, res: Response) {
    res.status(500).send('Method does not exist for this route');
}

async function _head(req: Request, res: Response<any>) {
    res.status(500).send('Method does not exist for this route');
}
async function _update(req: Request, res: Response<any>) {
    res.status(500).send('Method does not exist for this route');
}

async function _trace(req: Request, res: Response<any>) {
    res.status(500).send('Method does not exist for this route');
}

async function _options(req: Request, res: Response) {
    res.status(500).send('Method does not exist for this route');
}
