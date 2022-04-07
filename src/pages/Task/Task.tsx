import { Button, Grid, TextField, TextFieldProps } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ITaskList } from "../../models/interfaces/TaskList.interface";
import {
  apiService,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useGetTaskByIdQuery,
  useUpdateTaskMutation,
} from "../../store/api";
import { useAppDispatch } from "../../store/hooks";
import { ITask } from "../../models/interfaces/Task.interface";

interface IProps {
  id?: string;
  list: ITaskList;
  contextDataHandler: (taskName: string) => void;
  isChanged: () => void;
}

interface IFormData {
  name: string;
  statusId: number;
  description: string;
  dueDate: Date;
}

const Task = ({ id, list, isChanged, contextDataHandler }: IProps) => {
  const dispatch = useAppDispatch();
  const taskByIdQuery = useGetTaskByIdQuery(id as string, {
    skip: id ? false : true,
  });
  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const { register, handleSubmit, reset, setValue } = useForm<IFormData>();

  useEffect(() => {
    reset(taskByIdQuery.data);
  }, [reset, taskByIdQuery]);

  const submitHandler = (formData: IFormData) => {
    (async () => {
      if (id) {
        await updateTask(formData);
      } else {
        await addTask({
          id: crypto.randomUUID(),
          listId: list.id,
          ...formData,
        });
      }
      isChanged();
    })();
  };

  const onDeleteClick = () => (async () => await deleteTask(id as string))();

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
            value={taskByIdQuery.data?.dueDate}
            onChange={(newValue: any) => {
              // const patchCollection = dispatch(
              //   apiService.util.updateQueryData(
              //     "getTaskById",
              //     taskByIdQuery.data.id,
              //     (draftTasks) => {
              //       draftTasks.dueDate = newValue;
              //     }
              //   )
              // );
              setValue("dueDate", newValue, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
            renderInput={(params: TextFieldProps) => (
              //TODO: Fix value not updating when setValue is executed
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
