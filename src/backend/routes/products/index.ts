// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { Request, Response } from 'express';
import { Product } from '../../modules/models/Product';
import { Product as IProduct } from '../../../frontend/lib/api_client';

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
  const products = await Product.findAll();
  const productsResponse = products.map((product): Required<CamelToSnakeCaseNested<IProduct>> => ({
    id: product.id,
    product_slug: product.product_slug,
    product_name: product.product_name,
    price: product.price,
    image_url: product.image_url,
    description: product.description
  }));
  res.status(200).json(productsResponse);

}

async function _post(req: Request, res: Response) {
  const product = req.body as Product;
  const newProduct = await Product.create({
    product_slug: product.product_slug,
    product_name: product.product_name,
    price: product.price,
    image_url: product.image_url,
    description: product.description
  });
  await newProduct.save();
  res.status(201).json(product);
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
