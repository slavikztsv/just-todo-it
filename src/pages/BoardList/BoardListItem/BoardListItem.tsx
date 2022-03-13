import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import EditOffRoundedIcon from "@mui/icons-material/EditOffRounded";

import { IBoard } from "../../../models/interfaces/Board.interface";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface IProps {
  id: string;
  name: string;
  onDeleteClick: (id: string) => void;
  onUpdateClick: (id: string, data: Partial<IBoard>) => void;
  onBoardClick: (id: string) => void;
}

const BoardListItem = (props: IProps) => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useForm<Partial<IProps>>();

  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  return (
    <Card
      variant="outlined"
      sx={{ maxWidth: 345 }}
      onClick={() => props.onBoardClick(props.id)}
    >
      <CardHeader
        title={
          <>
            {isEditMode && (
              <Grid item container alignItems="center">
                <TextField
                  {...register("name")}
                  defaultValue={props.name}
                  onClick={($event) => $event.stopPropagation()}
                />
                <IconButton
                  onClick={($event) => {
                    $event.stopPropagation();
                    setIsEditMode(false);
                    props.onUpdateClick(props.id, getValues());
                  }}
                >
                  <EditOffRoundedIcon />
                </IconButton>
              </Grid>
            )}
            {!isEditMode && (
              <>
                <span>{props.name}</span>
                <IconButton
                  onClick={($event) => {
                    $event.stopPropagation();
                    setIsEditMode(true);
                  }}
                >
                  <EditRoundedIcon />
                </IconButton>
              </>
            )}
          </>
        }
        subheader={props.id}
        action={
          <IconButton
            onClick={($event) => {
              $event.stopPropagation();
              props.onDeleteClick(props.id);
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
        }
      />
      <CardContent>
        <h3>Content</h3>
      </CardContent>
    </Card>
  );
};

export default BoardListItem;
