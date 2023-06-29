import { Injectable } from '@angular/core';
import { productApi } from '@frontend/lib/ApiInstances';
import { ProductDTO } from '@frontend/app/dto/ProductDTO';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  async getProduct(slug: string): Promise<ProductDTO> {
    const response = await productApi.productsSlugGet({
      slug
    });
    return new ProductDTO(response);
  }
  async getProducts(): Promise<ProductDTO[]> {
    const response = await productApi.productsGet();
    console.log(response);
    
    return response.map(product => new ProductDTO(product));
  }
}
