import { useEffect, useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";

import classes from "./BorderList.module.scss";
import HttpService from "../../services/HttpService";
import { BOARDS_API } from "../../helpers/constants";
import { IBoard } from "../../models/interfaces/Board.interface";
import Board from "../Board/Board";

interface IFormData {
  name: string;
}

const BoardList = () => {
  const [boardList, setBoardList] = useState<IBoard[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<IFormData>();

  useEffect(() => {
    (async () => {
      const response = await HttpService.getAll<IBoard>(BOARDS_API);
      setBoardList(response.data);
    })();
  }, []);

  const submitHandler = (formData: IFormData) => {
    const board: IBoard = {
      ...formData,
      id: crypto.randomUUID(),
      lists: [],
    };

    (async () => {
      try {
        const response = await HttpService.create<IBoard>(BOARDS_API, board);
        setBoardList((prevState) => [...prevState, response.data]);
        reset();
      } catch (error) {
        console.log(error);
      }
    })();
  };

  const updateHandler = (id: string, data: Partial<IBoard>) => {
    (async () => {
      try {
        const response = await HttpService.update<IBoard>(BOARDS_API, id, data);
        setBoardList((prevState) => [
          ...prevState.map((item) =>
            item.id === id ? (item = response.data) : item
          ),
        ]);
      } catch (error) {
        console.log(error);
      }
    })();
  };

  const deleteHandler = (id: string) => {
    (async () => {
      try {
        await HttpService.remove<IBoard>(BOARDS_API, id);
        setBoardList((prevState) => [
          ...prevState.filter((item) => item.id !== id),
        ]);
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <Grid container direction={"column"} className={classes.border_list}>
      <Grid
        container
        item
        gap="1rem"
        className={classes.border_list_items}
        xs={80}
      >
        {boardList.map((item) => (
          <Board
            key={item.id}
            id={item.id}
            name={item.name}
            onDeleteClick={deleteHandler}
            onUpdateClick={updateHandler}
          />
        ))}
      </Grid>
      <Grid container item className={classes.border_list_actions}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <TextField label="Name" variant="outlined" {...register("name")} />
          {errors.name && <span>Name is required</span>}
          <Button type="submit">Submit</Button>
        </form>
      </Grid>

      <DevTool control={control} />
    </Grid>
  );
};

export default BoardList;
