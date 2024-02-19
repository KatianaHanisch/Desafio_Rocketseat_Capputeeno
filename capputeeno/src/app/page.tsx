"use client";

import styles from "./page.module.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ProductsList } from "@/components/products-list";
import { FilterBar } from "@/components/filter-bar";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className={styles.main}>
        <FilterBar />
        <ProductsList />
      </main>
    </QueryClientProvider>
  );
}
