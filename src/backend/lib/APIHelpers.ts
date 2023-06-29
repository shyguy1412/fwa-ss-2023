import { Order } from "../../frontend/lib/api_client";
import { Product } from "../modules/models/Product";
import { Product_Order } from "../modules/models/Product_Order";

export async function getProductOrderProduct(productOrder: Product_Order): Promise<CamelToSnakeCaseNested<Required<NonNullable<Order['products']>[number]>>> {
  const product = await Product.findOne({ where: { id: productOrder.product_id } });

  if (!product) throw new Error('Product not found');

  return {
    id: product.id,
    product_slug: product.product_slug,
    product_name: product.product_name,
    price: product.price,
    image_url: product.image_url,
    description: product.description,
    amount: productOrder.amount,
  };
}