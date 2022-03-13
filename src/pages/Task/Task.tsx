import { Button, Grid, TextField, TextFieldProps } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { routes } from "../../helpers/constants";
import { initialValues, ITask } from "../../models/interfaces/Task.interface";
import HttpService from "../../services/HttpService";
import { ITaskList } from "../../models/interfaces/TaskList.interface";

interface IProps {
  id?: string;
  list: ITaskList;
  contextDataHandler: (taskName: string) => void;
  onChange: () => void;
}

interface IFormData {
  name: string;
  statusId: number;
  description: string;
  dueDate: Date;
}

const Task = ({ id, list, onChange, contextDataHandler }: IProps) => {
  const { register, handleSubmit, reset, setValue } = useForm<IFormData>();
  const [task, setTask] = useState<ITask>(initialValues);

  useEffect(() => {
    try {
      (async () => {
        if (id) {
          const response = await HttpService.get<ITask>(
            routes.getTasksAPI(),
            id
          );
          reset(response.data);
          setTask(response.data);
          contextDataHandler(response.data.name);
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, [id, contextDataHandler, reset]);

  const submitHandler = (formData: IFormData) => {
    const taskRequest: ITask = {
      ...task,
      ...formData,
    };

    (async () => {
      if (id) {
        await HttpService.update<ITask>(
          routes.getTasksAPI(),
          task.id,
          taskRequest
        );
      } else {
        await HttpService.create<ITask>(routes.getTasksAPI(), {
          ...taskRequest,
          id: crypto.randomUUID(),
          listId: list.id,
        });
      }
      onChange();
    })();
  };

  const onDeleteClick = () => {
    (async () => {
      try {
        await HttpService.remove<ITask>(routes.getTasksAPI(), task.id);
        onChange();
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <Grid container direction={"column"}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Grid
          container
          item
          direction={"column"}
          rowGap={"1rem"}
          paddingTop={"1rem"}
        >
          <TextField
            label="Name"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            {...register("name")}
          />
          <TextField
            label="Description"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            multiline
            {...register("description")}
          />
          <DatePicker
            disablePast
            label="Due Date"
            openTo="day"
            views={["year", "month", "day"]}
            mask={"__/__/____"}
            value={task.dueDate}
            onChange={(newValue: any) => {
              setTask((prevState) => ({ ...prevState, dueDate: newValue }));
              setValue("dueDate", newValue, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
            renderInput={(params: TextFieldProps) => (
              <TextField
                {...params}
                {...register("dueDate")}
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
        </Grid>
        <Grid item container justifyContent="space-between">
          <Button type="submit">SAVE</Button>
          {id && <Button onClick={() => onDeleteClick()}>DELETE</Button>}
        </Grid>
      </form>
    </Grid>
  );
};

export default Task;
