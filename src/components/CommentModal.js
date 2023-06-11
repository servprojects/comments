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
  Modal,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

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
      <form onSubmit={handleSubmit(onSubmit)}>
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
            {...register("name")}
          />
          <TextField
            id="filled-multiline-static"
            label="Message"
            multiline
            rows={4}
            fullWidth
            variant="standard"
            {...register("message")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleClose}>
            Comment
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CommentModal;
