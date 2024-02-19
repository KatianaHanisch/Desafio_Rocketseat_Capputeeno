import { Product } from "./product";

export interface ProductsFetcherResponse {
  data: {
    allProducts: Product[];
  };
}
