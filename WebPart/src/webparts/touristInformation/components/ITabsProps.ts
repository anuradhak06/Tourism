import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ITabsProps {
  context: WebPartContext;
  state: string;
  stateId: string;
}
