import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Typography, Box, Modal } from "@material-ui/core";
import { useForm } from "react-hook-form";
import {
  closeCommentsModal,
  getViewCommentsModalOpen,
} from "store/slices/view";
import { blueGrey, red } from "@material-ui/core/colors";
import { addComment, getCountComments } from "store/slices/comment";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonAction: {
    paddingTop: 20,
    width: "100%",
    display: "inline-flex",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "flex-end",
  },
  title: {
    fontWeight: "bold",
    color: blueGrey[700],
  },
  subtitle: {
    color: blueGrey[600],
  },
  error: {
    color: red[400],
    fontSize: 13,
  },
  box: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 350,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 5,
    boxShadow: 24,
    padding: 20,
  },
}));

const CommentModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isOpen = useSelector(getViewCommentsModalOpen);
  const commentCount = useSelector(getCountComments);
  const handleClose = () => dispatch(closeCommentsModal());

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    var newComment = { id: commentCount * 2 + 1, ...data };
    dispatch(addComment({ comment: newComment }));
    reset({ message: null });
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      className={classes.modal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={classes.box}>
        <Typography
          id="modal-modal-title"
          className={classes.title}
          variant="h6"
          component="h2"
        >
          Add New Comment
        </Typography>
        <Typography
          id="modal-modal-description"
          className={classes.subtitle}
          variant="subtitle1"
        >
          * To test top commenters, input comment with existing commenter name.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <span className={classes.error}>{errors.name?.message}</span>
          )}

          <TextField
            id="filled-multiline-static"
            label="Message"
            multiline
            rows={4}
            fullWidth
            variant="standard"
            {...register("message", { required: "Message is required" })}
          />
          {errors.message && (
            <span className={classes.error}>{errors.message?.message}</span>
          )}

          <div className={classes.buttonAction}>
            <Button variant="outlined" color="primary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Comment
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default CommentModal;
