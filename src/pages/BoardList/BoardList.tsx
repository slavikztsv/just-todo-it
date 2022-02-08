import { Button, Grid, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { BOARDS_API } from "../../helpers/constants";
import { IBoard } from "../../models/interfaces/Board.interface";
import HttpService from "../../services/HttpService";
import Board from "../Board/Board";

const BoardList = () => {
  const [boardList, setBoardList] = useState<IBoard[]>([]);
  const [formValue, setFormValue] = useState({
    id: "",
    name: "",
  });

  useEffect(() => {
    (async () => {
      const response = await HttpService.getAll<IBoard>(BOARDS_API);
      setBoardList(response.data);
      setFormValue((prevState) => ({ ...prevState, id: response.data[0].id }));
    })();
  }, []);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    console.log(formValue);
  };

  const InputHandler = (
    event: ChangeEvent & { target: HTMLInputElement | HTMLTextAreaElement }
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormValue((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <Grid container direction={"column"}>
        <span>BoardList</span>
        {boardList.map((item) => (
          <Board key={item.id} name={item.name} />
        ))}
      </Grid>
      <form onSubmit={submitHandler}>
        <TextField
          name="id"
          label="Id"
          variant="outlined"
          onChange={InputHandler}
        />
        <TextField
          name="name"
          label="Name"
          variant="outlined"
          onChange={InputHandler}
        />
        <Button type="submit">Submit</Button>
      </form>

      <h1>{`ID: ${formValue.id}`}</h1>
      <h1>{`NAME: ${formValue.name}`}</h1>
    </>
  );
};

export default BoardList;
