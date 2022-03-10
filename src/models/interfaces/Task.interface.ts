export interface ITask {
  id: string;
  name: string;
  statusId: number;
  description: string;
  dueDate: Date;
  listId: string;
}

export const initialValues: ITask = {
  id: "",
  name: "",
  statusId: 0,
  description: "",
  dueDate: new Date(),
  listId: ""
}