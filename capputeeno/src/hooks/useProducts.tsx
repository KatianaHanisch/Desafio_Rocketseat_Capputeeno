import axios, { AxiosPromise } from "axios";
import { useQuery } from "@tanstack/react-query";

import { ProductsFetcherResponse } from "@/types/products-response";
import { useFilter } from "./useFilter";
import { mountQuery } from "@/utils/graphql-filters";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

const fetcher = (query: string): AxiosPromise<ProductsFetcherResponse> => {
  return axios.post(API_URL, {
    query,
  });
};

export function useProducts() {
  const { type, priority } = useFilter();
  const query = mountQuery(type, priority);
  const { data } = useQuery({
    queryFn: () => fetcher(query),
    queryKey: ["products", type, priority],
  });

  return {
    data: data?.data?.data?.allProducts,
  };
}
