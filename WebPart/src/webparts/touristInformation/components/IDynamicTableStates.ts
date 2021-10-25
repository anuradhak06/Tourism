export interface IDynamicTableStates {
  items: IPlace[];
  place: string;
  description: string;
  city: string;
  isEditable: boolean;
  isValidated: boolean;
}
export interface IPlace {
  place: string;
  description: string;
  Id?: number;
}
