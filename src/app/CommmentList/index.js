import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { Box, Container } from "@material-ui/core";
import CommentListItem from "./CommentListItem";
import { blue } from "@material-ui/core/colors";
import { useGetCommentsQuery } from "store/services/commentApi";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "50ch",
    borderRadius: 10,
  },
  list: {
    width: "100%",
  },
  inline: {
    display: "inline",
  },
}));

function CommentList() {
  const classes = useStyles();
  const { data, isError, isLoading, error } = useGetCommentsQuery();
  const [comments, setComments] = useState([]);
  console.log("data", data);
  useEffect(() => {
    if (data) {
      setComments(data.data);
    }
  }, [data]);

  return (
    <Box className={classes.root} boxShadow={5}>
      <List className={classes.list}>
        {comments.length > 0 &&
          comments.map((comment) => (
            <div key={comment?.id}>
              <CommentListItem
                name={comment?.name}
                message={comment?.message}
              />
              <Divider variant="inset" component="li" />
            </div>
          ))}

        {/* <CommentListItem name={'Maria Petalcorin'} message={"laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"} />
                <Divider variant="inset" component="li" />
                <CommentListItem name={'Anie Budiongan'} message={"laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"} /> */}
      </List>
    </Box>
  );
}

export default CommentList;
