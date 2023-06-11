import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";

import {
  closeCommentsModal,
  getViewCommentsModalOpen,
} from "store/slices/view";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const CommentModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isOpen = useSelector(getViewCommentsModalOpen);
  const handleClose = () => dispatch(closeCommentsModal());

  return (
    // <Modal
    //   open={isOpen}
    //   onClose={handleClose}
    //   className={classes.modal}
    //   aria-labelledby="simple-modal-title"
    //   aria-describedby="simple-modal-description"
    // >
    //   <p>Add Comments</p>
    // </Modal>

    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Add New Comment</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To test top commenters, input comments with existing commenter name.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          id="filled-multiline-static"
          label="Message"
          multiline
          rows={4}
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Comment</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommentModal;
