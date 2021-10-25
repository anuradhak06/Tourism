interface IListItem {
  Id?: string;
  Title: string;
}

export interface ITouristInformationStates {
  listItems: IListItem[];
  errorMessage: string;
  newState: string;
}
