import { Configuration, ProductApi } from "./api_client";

const config = new Configuration({
  basePath: 'api/v1',
  accessToken: 'bla'
})

export const productApi = new ProductApi(config);