export interface HeadCell {
  id: any;
  label: string;
  numeric: boolean;
}
export type Order = "asc" | "desc";

export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export interface EnhanceTableProps {
  tableItems: any[];
  tableHeadItems: any[];
}
