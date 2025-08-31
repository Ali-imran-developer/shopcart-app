export interface getSummaryCardsProps {
  orders: any[];
  totalOrders: number;
}

export interface PaginationProps {
  page: number;
  setPage: (val: any) => void;
  totalPages: number;
}
