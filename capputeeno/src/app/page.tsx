"use client";

import { ProductsList } from "@/components/products-list";
import { FilterBar } from "@/components/filter-bar";
import { DefaultPageLayout } from "@/components/default-page-layout";
import styled from "styled-components";
import { Pagination } from "@/components/pagination";
import { useFilter } from "@/hooks/useFilter";

const PageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Home() {
  const { page, setPage } = useFilter();

  const handleChangePage = (value: number) => {
    setPage(value);
  };

  return (
    <DefaultPageLayout>
      <PageWrapper>
        <FilterBar />
        <Pagination page={page} handleChangePage={handleChangePage} />
        <ProductsList />
        <Pagination page={page} handleChangePage={handleChangePage} />
      </PageWrapper>
    </DefaultPageLayout>
  );
}
