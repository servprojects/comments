import React from "react";

import "app/App.css";
import logo from "app/logo.svg";
import Header from "components/Header";
import CommentModal from "components/CommentModal";
import CommentList from "./CommmentList";
import withLayout from "components/Layouts/withLayout";
import TopCommentorList from "./TopCommentorList";
import Grid from "@material-ui/core/Grid";

function App() {
  return (
    <>
      <CommentModal />
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item>
            <TopCommentorList />
          </Grid>

          <Grid item>
            <CommentList />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default withLayout(App);
