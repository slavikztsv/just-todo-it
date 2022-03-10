import { Grid, List, ListItem, ListItemButton } from "@mui/material";
import { useContext } from "react";
import { DialogContext } from "../../../contexts/DialogContext";
import { ITask } from "../../../models/interfaces/Task.interface";
import Task from "../../Task/Task";

interface IProps {
  name: string;
  tasks: ITask[];
  onChange: () => void;
}

const TaskList = (props: IProps) => {
  const dialogCtx = useContext(DialogContext);

  const onCloseHandler = () => {
    dialogCtx.setIsOpen(false);
  };

  const onTaskClick = (taskId: string) => {
    dialogCtx.setIsOpen(true);
    dialogCtx.setComponent(
      <Task
        id={taskId}
        contextDataHandler={dialogCtx.setContextData}
        onSave={props.onChange}
      />
    );
    dialogCtx.setOnCloseFn(() => onCloseHandler);
  };

  return (
    <Grid container direction={"column"} alignItems="center" spacing={"0rem"}>
      <Grid item>
        <h3>{props.name}</h3>
      </Grid>
      <List>
        <Grid container direction={"column"} rowSpacing={"0.5rem"}>
          {props.tasks.map((task) => (
            <Grid item key={task.id} onClick={() => onTaskClick(task.id)}>
              <ListItem disablePadding>
                <ListItemButton>
                  <span>{task.name}</span>
                </ListItemButton>
              </ListItem>
            </Grid>
          ))}
        </Grid>
      </List>
    </Grid>
  );
};

export default TaskList;
