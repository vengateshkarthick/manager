import React from "react";
import { IEmpData } from "../../shared/list.type";
interface IListData extends IEmpData {}

export interface IListConfig {
  header?: string;
  accessor: string;
  render?: (data: IListData, customProperties?: any) => React.ReactNode | string | null;
  canSort?: boolean;
  hasFilter?: boolean;
  rowClassName?: string;
  isDateColumn?: "YYYY-MM-DD",
}

export interface IList {
  config: Array<IListConfig>;
  data: Array<IListData>;
  id: string;
  className?: string;
  isSelectable?: boolean;
  onSelectRow?: (id: string[]) => void; 
  canEdit?: boolean
  handleEdit?: (data: IListData, customProperties?: any) => void;
}

export type productKeys = keyof IEmpData;