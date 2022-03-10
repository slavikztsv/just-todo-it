import { Button, Grid, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { routes } from "../../helpers/constants";
import { IBoard, initialValues } from "../../models/interfaces/Board.interface";
import { ITaskList } from "../../models/interfaces/TaskList.interface";
import { ITask } from "../../models/interfaces/Task.interface";
import HttpService from "../../services/HttpService";
import TaskList from "./TaskList/TaskList";
import { useForm } from "react-hook-form";

type IParams = {
  boardId: string;
};

interface IFormData {
  name: string;
}

const Board = () => {
  const { boardId } = useParams<IParams>();
  const [selectedBoard, setSelectedBoard] = useState<IBoard>(initialValues);
  const [lists, setLists] = useState<ITaskList[]>([]);
  const [tasks, setTasks] = useState<ITask[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>();

  const fetchData = useCallback(() => {
    (async () => {
      try {
        const selectedBoardResponse = await HttpService.get<IBoard>(
          routes.getBoardsAPI(),
          boardId as string
        );
        const listsResponse = await HttpService.getAll<ITaskList>(
          routes.getListsAPI(boardId as string)
        );
        const tasksResponse = await HttpService.getAll<ITask>(
          routes.getTasksAPI(boardId as string)
        );
        setSelectedBoard(selectedBoardResponse.data);
        setLists(listsResponse.data);
        setTasks(tasksResponse.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [boardId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const submitHandler = (formData: IFormData) => {
    const taskList: ITaskList = {
      ...formData,
      id: crypto.randomUUID(),
      boardId: boardId as string,
    };

    (async () => {
      try {
        const response = await HttpService.create<ITaskList>(
          routes.getListsAPI(),
          taskList
        );
        setLists((prevState) => [...prevState, response.data]);
        reset();
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <Grid container direction={"column"} spacing={"1rem"}>
      <Grid item>
        <span>{`Board: ${selectedBoard?.name}`}</span>
      </Grid>
      <Grid item>
        <span>Lists</span>
      </Grid>
      <Grid item>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Grid item container>
            <TextField
              label="New List Name"
              variant="outlined"
              {...register("name")}
            />
            {errors.name && <span>Name is required</span>}
            <Button type="submit">Create</Button>
          </Grid>
        </form>
      </Grid>
      <Grid container item direction={"row"} spacing={"3rem"}>
        {lists.map((list) => (
          <Grid item key={list.id}>
            <TaskList
              name={list.name}
              tasks={tasks.filter((task) => task.listId === list.id)}
              onChange={() => fetchData()}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Board;
