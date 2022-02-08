import { ITask } from "./Task.interface";

export interface IList {
  id: string;
  name: string;
  tasks: ITask[];
}