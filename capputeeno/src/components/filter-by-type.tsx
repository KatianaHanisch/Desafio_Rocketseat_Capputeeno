import { useFilter } from "@/hooks/useFilter";
import { FilterType } from "@/types/filter-types";
import styled from "styled-components";

interface FilterItemProps {
  selected: boolean;
}

const FilterList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  list-style: none;
`;

const FilterItem = styled.li<FilterItemProps>`
  color: var(--text-dark);
  text-align: center;
  text-transform: uppercase;
  line-height: 18px;
  font-size: 12px;
  font-weight: ${(props) => (props.selected ? "600" : "400")};
  font-family: inherit;
  cursor: pointer;

  border-bottom: ${(props) =>
    props.selected ? "4px solid var(--orange-low)" : ""};

  @media (min-width: ${(props) => props.theme.desktopBreakpoint}) {
    line-height: 22px;
    font-size: 16px;
  }
`;

export function FilterByType() {
  const { type, setType, setPage } = useFilter();

  const handleChangeType = (value: FilterType) => {
    setType(value);
    setPage(1);
  };

  return (
    <FilterList>
      <FilterItem
        selected={type === FilterType.ALL}
        onClick={() => handleChangeType(FilterType.ALL)}
      >
        Todos os produtos
      </FilterItem>
      <FilterItem
        selected={type === FilterType.SHIRT}
        onClick={() => handleChangeType(FilterType.SHIRT)}
      >
        Camisetas
      </FilterItem>
      <FilterItem
        selected={type === FilterType.MUG}
        onClick={() => handleChangeType(FilterType.MUG)}
      >
        Canecas
      </FilterItem>
    </FilterList>
  );
}
