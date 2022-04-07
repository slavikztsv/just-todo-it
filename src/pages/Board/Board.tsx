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
import {
  useAddListMutation,
  useDeleteListMutation,
  useGetListsQuery,
  useUpdateListMutation,
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetTasksByBoardIdQuery,
  useGetListsByBoardIdQuery,
  useGetBoardByIdQuery,
} from "../../store/api";

type IParams = {
  boardId: string;
};

interface IFormData {
  name: string;
}

const Board = () => {
  const { boardId } = useParams<IParams>();

  const selectedBoard = useGetBoardByIdQuery(boardId as string);
  const listsByBoardIdQuery = useGetListsByBoardIdQuery(boardId as string);
  const [addList] = useAddListMutation();
  // const [updateList] = useUpdateListMutation();
  // const [deleteList] = useDeleteListMutation();

  const taskByBoardIdQuery = useGetTasksByBoardIdQuery(boardId as string);

  // const [selectedBoard, setSelectedBoard] = useState<IBoard>(initialValues);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>();

  // const fetchData = useCallback(() => {
  //   (async () => {
  //     try {
  //       const selectedBoardResponse = await HttpService.get<IBoard>(
  //         routes.getBoardsAPI(),
  //         boardId as string
  //       );
  //       const listsResponse = await HttpService.getAll<ITaskList>(
  //         routes.getListsAPI(boardId as string)
  //       );
  //       const tasksResponse = await HttpService.getAll<ITask>(
  //         routes.getTasksAPI(boardId as string)
  //       );
  //       setSelectedBoard(selectedBoardResponse.data);
  //       setLists(listsResponse.data);
  //       setTasks(tasksResponse.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, [boardId]);

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);

  const submitHandler = (formData: IFormData) => {
    const taskList: ITaskList = {
      ...formData,
      id: crypto.randomUUID(),
      boardId: boardId as string,
    };

    (async () => {
      await addList(taskList);
    })();
  };

  return (
    <Grid container direction={"column"} spacing={"1rem"}>
      <Grid item>
        <span>{`Board: ${selectedBoard.data?.name}`}</span>
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
        {listsByBoardIdQuery.data?.map(
          (list) =>
            taskByBoardIdQuery.isSuccess && (
              <Grid item key={list.id}>
                <TaskList
                  list={list}
                  tasks={taskByBoardIdQuery.data.filter(
                    (task) => task.listId === list.id
                  )}
                />
              </Grid>
            )
        )}
      </Grid>
    </Grid>
  );
};

export default Board;
