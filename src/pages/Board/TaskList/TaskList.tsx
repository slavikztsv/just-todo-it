import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import { useContext } from "react";
import { DialogContext } from "../../../contexts/DialogContext";
import { ITask } from "../../../models/interfaces/Task.interface";
import Task from "../../Task/Task";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ITaskList } from "../../../models/interfaces/TaskList.interface";

interface IProps {
  list: ITaskList;
  tasks: ITask[];
  onChange: () => void;
}

const TaskList = (props: IProps) => {
  const dialogCtx = useContext(DialogContext);

  const onTaskChangeHandler = () => {
    onCloseHandler();
    props.onChange();
  };

  const onCloseHandler = () => {
    dialogCtx.setIsOpen(false);
  };

  const onTaskClick = (taskId?: string) => {
    dialogCtx.setIsOpen(true);
    dialogCtx.setComponent(
      <Task
        id={taskId}
        list={props.list}
        contextDataHandler={dialogCtx.setContextData}
        onChange={onTaskChangeHandler}
      />
    );
    dialogCtx.setTitle(`${props.list.name} - ${taskId ? "" : "New"} Task`);
    dialogCtx.setOnCloseFn(() => onCloseHandler);
  };

  return (
    <Grid container direction={"column"} alignItems="center" spacing={"0rem"}>
      <Grid item container>
        <h3>{props.list.name}</h3>
        <IconButton onClick={() => onTaskClick()}>
          <AddCircleOutlineIcon />
        </IconButton>
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
