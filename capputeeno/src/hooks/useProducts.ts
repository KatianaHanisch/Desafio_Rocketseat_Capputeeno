import axios, { AxiosPromise } from "axios";
import { useQuery } from "@tanstack/react-query";

import { ProductsFetcherResponse } from "@/types/products-response";
import { useFilter } from "./useFilter";
import { mountQuery, quatidadeItens } from "@/utils/graphql-filters";
import { useDeferredValue } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

const fetcher = (query: string): AxiosPromise<ProductsFetcherResponse> => {
  return axios.post(API_URL, {
    query,
  });
};

export function useProducts() {
  const { type, priority, search, page } = useFilter();

  const searchDeferred = useDeferredValue(search);

  const query = mountQuery(type, priority, page - 1);

  const queryQuantidade = quatidadeItens(type, priority);

  const response = useQuery({
    queryFn: () => fetcher(queryQuantidade),
    queryKey: ["products-quantidade", type, priority, page],
    staleTime: 1000 * 60 * 1,
  });

  const { data } = useQuery({
    queryFn: () => fetcher(query),
    queryKey: ["products", type, priority, page],
    staleTime: 1000 * 60 * 1,
  });

  const totalItens = response?.data?.data?.data.allProducts.length;

  const products = data?.data?.data?.allProducts;

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchDeferred.toLowerCase())
  );

  return {
    data: filteredProducts,
    totalItens: totalItens,
  };
}
