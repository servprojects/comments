import React from "react";

import "app/App.css";
import logo from "app/logo.svg";
import Header from "components/Header";
import CommentModal from "components/CommentModal";
import CommentList from "./CommmentList";
import withLayout from "components/Layouts/withLayout";

function App() {
  return (
    <>
      {/* <Header /> */}
      <CommentModal />
      <CommentList />
    </>
  );
}

export default withLayout(App);
