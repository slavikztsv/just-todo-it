import { useEffect, useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";

import classes from "./BoardList.module.scss";
import HttpService from "../../services/HttpService";
import { IBoard } from "../../models/interfaces/Board.interface";
import { useNavigate } from "react-router-dom";
import BoardListItem from "./BoardListItem/BoardListItem";
import { routes } from "../../helpers/constants";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  useAddBoardMutation,
  useDeleteBoardMutation,
  useGetBoardsQuery,
  useUpdateBoardMutation,
} from "../../store/api";

interface IFormData {
  name: string;
}

const BoardList = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetBoardsQuery();
  const [addBoard] = useAddBoardMutation();
  const [updateBoard] = useUpdateBoardMutation();
  const [deleteBoard] = useDeleteBoardMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<IFormData>();

  const submitHandler = (formData: IFormData) => {
    const board: IBoard = {
      ...formData,
      id: crypto.randomUUID(),
    };

    (async () => {
      await addBoard(board);
      reset();
    })();
  };

  const updateHandler = (id: string, data: Partial<IBoard>) => {
    (async () => {
      await updateBoard({ id, ...data });
    })();
  };

  const deleteHandler = (id: string) => {
    (async () => {
      await deleteBoard(id);
    })();
  };

  const boardClickHandler = (clickedBoardId: string) => {
    navigate(routes.getBoardsAPI(clickedBoardId));
  };

  return (
    <Grid
      container
      direction={"column"}
      rowGap="1rem"
      className={classes.board_list}
    >
      <Grid
        container
        item
        gap="1rem"
        className={classes.board_list_items}
        xs={80}
      >
        {data?.map((item) => (
          <BoardListItem
            key={item.id}
            id={item.id}
            name={item.name}
            onDeleteClick={deleteHandler}
            onUpdateClick={updateHandler}
            onBoardClick={boardClickHandler}
          />
        ))}
      </Grid>
      <Grid item>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Grid item container>
            <TextField
              label="New Board Name"
              variant="outlined"
              {...register("name")}
            />
            {errors.name && <span>Name is required</span>}
            <Button type="submit">Create</Button>
          </Grid>
        </form>
      </Grid>

      <DevTool control={control} />
    </Grid>
  );
};

export default BoardList;
