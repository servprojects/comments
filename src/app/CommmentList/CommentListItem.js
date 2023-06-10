import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import useInitials from "hooks/useInitials";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  name: {
    textTransform: "capitalize",
  },
}));

function CommentListItem({ name, message }) {
  const classes = useStyles();
  const initials = useInitials(name ?? "");

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar className={classes.purple}>{initials}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <React.Fragment>
            <span className={classes.name}>{name}</span>
          </React.Fragment>
        }
        secondary={<React.Fragment>{message}</React.Fragment>}
      />
    </ListItem>
  );
}

export default CommentListItem;
