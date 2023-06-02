import { Injectable } from '@angular/core';
import { productApi } from '@frontend/lib/ApiInstances';
import { ProductDTO } from '../../dto/ProductDTO';


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
}
