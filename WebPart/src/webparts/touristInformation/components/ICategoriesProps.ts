import { WebPartContext } from "@microsoft/sp-webpart-base";
export interface IAccordionCompProps {
  context: WebPartContext;
  cityId: number;
  stateId: string;
  cityName: string;
}
