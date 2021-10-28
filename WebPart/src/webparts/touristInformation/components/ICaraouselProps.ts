import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ICaraouselProps {
  context: WebPartContext;
  cityName: string;
  category: string;
  cityId: number;
}
