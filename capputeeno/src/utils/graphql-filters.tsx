import { FilterType } from "@/types/filter-types";
import { PriorityTypes } from "@/types/priority-types";

export function getCategoryByType(type: FilterType) {
  if (type == FilterType.MUG) return "mugs";
  if (type == FilterType.SHIRT) return "t-shirts";

  return "";
}

export function getFilterByPriority(priority: PriorityTypes) {
  if (priority == PriorityTypes.NEWS)
    return { field: "created_at", order: "ASC" };
  if (priority == PriorityTypes.BIGGEST_PRICE)
    return { field: "price_in_cents", order: "DSC" };
  if (priority == PriorityTypes.MINOR_PRICE)
    return { field: "price_in_cents", order: "ASC" };

  return { field: "sales", order: "DSC" };
}

export const mountQuery = (
  type: FilterType,
  priority: PriorityTypes,
  page: number
) => {
  if (type === FilterType.ALL && priority === PriorityTypes.BEST_SELLERS)
    return `query{
      allProducts(page: ${page}, perPage: 12, sortField: "sales", sortOrder: "DSC"){
        id
        name
        price_in_cents
        image_url
      }
    }
    `;

  const sortSettings = getFilterByPriority(priority);
  const categoryFilter = getCategoryByType(type);

  return `query{
    allProducts( page: ${page}, perPage: 12, sortField: "${
    sortSettings.field
  }", sortOrder: "${sortSettings.order}", ${
    categoryFilter ? `filter: {category: "${categoryFilter}"}` : ""
  }){
      id
      name
      price_in_cents
      image_url
      category
    }
  }`;
};
export const quatidadeItens = (type: FilterType, priority: PriorityTypes) => {
  if (type === FilterType.ALL && priority === PriorityTypes.BEST_SELLERS)
    return `query{
      allProducts(sortField: "sales", sortOrder: "DSC"){
        id
        name
        price_in_cents
        image_url
      }
    }
    `;

  const sortSettings = getFilterByPriority(priority);
  const categoryFilter = getCategoryByType(type);

  return `query{
    allProducts(sortField: "${sortSettings.field}", sortOrder: "${
    sortSettings.order
  }", ${categoryFilter ? `filter: {category: "${categoryFilter}"}` : ""}){
      id
      name
      price_in_cents
      image_url
      category
    }
  }`;
};
