interface IListItem {
  Id?: string;
  Title: string;
}

export interface IStatesStates {
  listItems: IListItem[];
  errorMessage: string;
  newState: string;
}
