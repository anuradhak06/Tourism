import { WebPartContext } from "@microsoft/sp-webpart-base";
export interface ICategoriesProps {
  context: WebPartContext;
  cityId: number;
  stateId: string;
  cityName: string;
}
