import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useContext } from "react";
import { DialogContext } from "../../contexts/DialogContext";

const CustomDialog = () => {
  const customDialogCtx = useContext(DialogContext);
  const closeFnHandler = () => {
    customDialogCtx.onCloseFn(customDialogCtx.contextData);
  };

  return (
    <>
      <Dialog open={customDialogCtx.isOpen} onClose={closeFnHandler}>
        <DialogTitle>{customDialogCtx.title}</DialogTitle>
        <DialogContent>{customDialogCtx.component}</DialogContent>
        <DialogActions>
          <Button onClick={closeFnHandler}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomDialog;
