interface IListItem {
  Id?: string;
  Title: string;
  Description: string;
  DataType: string;
}

export interface ICategoriesStates {
  listItems: IListItem[];
  errorMessage: string;
  Id?: number;
}
