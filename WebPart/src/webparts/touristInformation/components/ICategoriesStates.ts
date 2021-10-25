interface IListItem {
  Id?: string;
  Title: string;
  Description: string;
  DataType: string;
}

export interface IAccodrionCompStates {
  listItems: IListItem[];
  errorMessage: string;
  Id?: number;
}
