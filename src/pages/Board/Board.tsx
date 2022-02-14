import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  TextField,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import EditOffRoundedIcon from "@mui/icons-material/EditOffRounded";

import { IBoard } from "../../models/interfaces/Board.interface";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface IProps {
  id: string;
  name: string;
  onDeleteClick: (id: string) => void;
  onUpdateClick: (id: string, data: Partial<IBoard>) => void;
}

const Board = (props: IProps) => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useForm<Partial<IProps>>();

  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={
          <>
            {isEditMode && (
              <>
                <TextField {...register("name")} defaultValue={props.name} />
                <IconButton
                  onClick={() => {
                    setIsEditMode(false);
                    props.onUpdateClick(props.id, getValues());
                  }}
                >
                  <EditOffRoundedIcon />
                </IconButton>
              </>
            )}
            {!isEditMode && (
              <>
                <span>{props.name}</span>
                <IconButton onClick={() => setIsEditMode(true)}>
                  <EditRoundedIcon />
                </IconButton>
              </>
            )}
          </>
        }
        subheader={props.id}
        action={
          <IconButton onClick={() => props.onDeleteClick(props.id)}>
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

export default Board;
