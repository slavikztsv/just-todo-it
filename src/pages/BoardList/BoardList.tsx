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

interface IFormData {
  name: string;
}

const BoardList = () => {
  const navigate = useNavigate();
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
      try {
        const response = await HttpService.getAll<IBoard>(
          routes.getBoardsAPI()
        );
        setBoardList(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const submitHandler = (formData: IFormData) => {
    const board: IBoard = {
      ...formData,
      id: crypto.randomUUID(),
    };

    (async () => {
      try {
        const response = await HttpService.create<IBoard>(
          routes.getBoardsAPI(),
          board
        );
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
        const response = await HttpService.update<IBoard>(
          routes.getBoardsAPI(),
          id,
          data
        );
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
        await HttpService.remove<IBoard>(routes.getBoardsAPI(), id);
        setBoardList((prevState) => [
          ...prevState.filter((item) => item.id !== id),
        ]);
      } catch (error) {
        console.log(error);
      }
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
        {boardList.map((item) => (
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
