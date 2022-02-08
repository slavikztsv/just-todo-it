import { IList } from "./List.interface";

export interface IBoard {
  id: string;
  name: string;
  lists: IList[];
}