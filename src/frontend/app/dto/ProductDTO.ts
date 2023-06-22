import { Product } from "@frontend/lib/api_client";

export class ProductDTO implements Required<Product>{
  id: number;
  productSlug: string;
  productName: string;
  price: number;
  imageUrl: string;
  description: string;

  constructor(product: Product) {
    if (!product.id) throw new Error('Invalid Product Id');
    if (!product.productSlug) throw new Error('Invalid Product Slug');
    if (!product.productName) throw new Error('Invalid Product  Name');
    if (!product.price) throw new Error('Invalid Product Price');
    if (!product.imageUrl) throw new Error('Invalid Product Image Url');
    if (!product.description) throw new Error('Invalid Product Description');

    this.id = product.id;
    this.productSlug = product.productSlug;
    this.productName = product.productName;
    this.price = product.price;
    this.imageUrl = product.imageUrl;
    this.description = product.description;
  }
}