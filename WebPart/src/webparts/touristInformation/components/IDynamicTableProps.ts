import { WebPartContext } from "@microsoft/sp-webpart-base";
export interface IDynamicTableProps {
  context: WebPartContext;
  cityId: number;
  category: string;
  stateId: string;
  cityName: string;
  categoryId: string;
}
