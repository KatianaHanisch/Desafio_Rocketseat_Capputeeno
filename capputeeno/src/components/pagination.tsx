import styled from "styled-components";

import { ArrowNext } from "./icons/arrow-next";
import { ArrowBack } from "./icons/arrow-back";

interface PaginationProps {
  page?: number;
  handleChangePage: (page: number) => void;
  totalItens: number;
}
interface BtnPaginationProps {
  selected: boolean;
}

const ContainerPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 15px;
  width: 100%;
  gap: 5px;
  margin-top: 15px;
`;

const BtnPagination = styled.button<BtnPaginationProps>`
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${(props) => (props.selected ? "600" : "400")};
  border: ${(props) => (props.selected ? "1px solid var(--orange-low)" : "")};
  color: ${(props) =>
    props.selected ? "var(--orange-low)" : "var(--text-dark)"};
  background-color: var(--color-button-pagination);

  svg {
    width: 24px;
    height: 24px;
  }
`;

export function Pagination({
  page,
  handleChangePage,
  totalItens,
}: PaginationProps) {
  const itensPorPagina = 12;

  const totalPaginas = Math.ceil(totalItens / itensPorPagina);

  return (
    <ContainerPagination>
      {[...Array(totalPaginas).keys()].map((index) => (
        <BtnPagination
          key={index}
          selected={index + 1 === page}
          onClick={() => {
            handleChangePage(index + 1);
          }}
        >
          {index + 1}
        </BtnPagination>
      ))}
      <BtnPagination
        selected={false}
        onClick={() => {
          if (page !== 1) handleChangePage(page! - 1);
        }}
        disabled={page === 1} // Desabilita o botão se a página atual for a primeira
      >
        <ArrowBack />
      </BtnPagination>
      <BtnPagination
        selected={false}
        onClick={() => {
          if (page !== totalPaginas) handleChangePage(page! + 1);
        }}
        disabled={page === totalPaginas} // Desabilita o botão se a página atual for a última
      >
        <ArrowNext />
      </BtnPagination>
    </ContainerPagination>
  );
}
