import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Divider, List, Typography } from "@material-ui/core";
import CommentListItem from "components/CommentListItem";
import { useGetCommentsQuery } from "store/services/commentApi";
import { blueGrey } from "@material-ui/core/colors";
import LoadingComponent from "components/LoadingComponent";
import { useSelector } from "react-redux";
import { getLatestComment, getViewTopCommentors } from "store/slices/comment";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "80ch",
    minHeight: "30ch",
    borderRadius: 10,
    maxHeight: "70ch",
    overflow: "auto",
  },
  list: {
    width: "100%",
  },
  typography: {
    paddingTop: 10,
    paddingLeft: 15,
    color: blueGrey[600],
  },
}));

function CommentList() {
  const classes = useStyles();
  const { data, isError, isLoading, error } = useGetCommentsQuery();
  const newComment = useSelector(getLatestComment);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (data) {
      setComments(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (newComment && newComment.id) {
      var latestComments = [...comments];
      latestComments.push(newComment);
      latestComments.sort((a, b) => b.id - a.id);

      setComments(latestComments);
    }
  }, [newComment]);

  return (
    <>
      <Box className={classes.root} boxShadow={5}>
        <Typography variant="h5" className={classes.typography}>
          Comments
        </Typography>
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <List className={classes.list}>
            {comments.length > 0 &&
              comments.map((comment, index) => (
                <div key={comment?.id}>
                  <CommentListItem
                    name={comment?.name}
                    message={comment?.message}
                  />
                  {index !== comments.length - 1 ? (
                    <Divider variant="inset" component="li" />
                  ) : (
                    <></>
                  )}
                </div>
              ))}
          </List>
        )}
      </Box>
    </>
  );
}

export default CommentList;
