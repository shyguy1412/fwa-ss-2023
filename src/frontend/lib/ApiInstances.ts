import { Configuration, OrderApi, ProductApi } from "./api_client";

const config = new Configuration({
  basePath: 'api/v0',
  accessToken: 'bla'
});

export const productApi = new ProductApi(config);
export const orderApi = new OrderApi(config);