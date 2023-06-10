import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, List, Divider, Typography } from "@material-ui/core";
import { useGetCommentsQuery } from "store/services/commentApi";
import CommentListItem from "components/CommentListItem";
import { blueGrey } from "@material-ui/core/colors";
import LoadingComponent from "components/LoadingComponent";
import { useSelector } from "react-redux";
import { getViewTopCommentors } from "store/slices/comment";

const useStyles = makeStyles((theme) => ({
  root: {
    // width: "50ch",
    maxWidth: "50ch",
    minHeight: "30ch",
    borderRadius: 10,
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

function TopCommentorList() {
  const classes = useStyles();
  const { isLoading } = useGetCommentsQuery();
  const topCommentors = useSelector(getViewTopCommentors);
  const [commenters, setCommenters] = useState([]);

  useEffect(() => {
    if (topCommentors) {
      setCommenters(topCommentors);
    }
  }, [topCommentors]);

  return (
    <Box className={classes.root} boxShadow={5}>
      <Typography variant="h5" className={classes.typography}>
        Top 3 Commenters
      </Typography>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <List className={classes.list}>
          {commenters.length > 0 &&
            commenters.map((commenter, index) => (
              <div key={commenter?.id}>
                <CommentListItem
                  name={commenter?.name}
                  message={`Count : ${commenter?.count}`}
                  avatarColor={"orange"}
                />
                {index !== commenters.length - 1 ? (
                  <Divider variant="inset" component="li" />
                ) : (
                  <></>
                )}
              </div>
            ))}
        </List>
      )}
    </Box>
  );
}

export default TopCommentorList;
