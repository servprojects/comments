import { createSlice, createSelector } from "@reduxjs/toolkit";

export const name = "comment";
const initialState = {
  topCommentors: [],
  comments: [],
  newComment: {},
};

const commentSlice = createSlice({
  name,
  initialState,
  reducers: {
    getTopCommentors(state, action) {
      var topthree = getTopCommentersProcess(action.payload.comments);
      state.topCommentors = topthree;
    },
    initializeComments(state, action) {
      state.comments = action.payload.comments;
    },
    addComment(state, action) {
      var newComment = action.payload.comment;
      var allComments = state.comments;
      allComments.push(newComment);

      var topthree = getTopCommentersProcess(allComments);

      state.newComment = newComment;
      state.comments = allComments;
      state.topCommentors = topthree;
    },
  },
});

const getSlice = (state) => state[name] || {};

export const getViewTopCommentors = createSelector(
  getSlice,
  (slice) => slice.topCommentors
);

export const getViewComments = createSelector(
  getSlice,
  (slice) => slice.comments
);

export const getCountComments = createSelector(
  getSlice,
  (slice) => slice.comments.length
);

export const getLatestComment = createSelector(
  getSlice,
  (slice) => slice.newComment
);

export const {
  getTopCommentors,
  initializeComments,
  addComment,
} = commentSlice.actions;
export default commentSlice.reducer;

function getTopCommentersProcess(comments) {
  let commenterCount = {};

  // Count the occurrence of each commenter
  comments.forEach((comment) => {
    const name = comment.name;
    if (commenterCount[name]) {
      commenterCount[name].count++;
    } else {
      commenterCount[name] = {
        count: 1,
        id: comment.id,
      };
    }
  });

  // Sort commenters by their occurrence in descending order
  const sortedCommenters = Object.keys(commenterCount).sort(
    (a, b) => commenterCount[b].count - commenterCount[a].count
  );

  // Get the top 3 commenters
  const topCommenters = sortedCommenters.slice(0, 3);

  // If there are less than 3 commenters, take the first 3 comments
  if (topCommenters.length < 3) {
    const remaining = 3 - topCommenters.length;
    const remainingCommenters = comments
      .map((comment) => comment.name)
      .filter((name) => !topCommenters.includes(name))
      .slice(0, remaining);
    topCommenters.push(...remainingCommenters);
  }

  const topCommentersWithCount = topCommenters.map((name) => {
    return {
      name: name,
      count: commenterCount[name].count,
      id: commenterCount[name].id,
    };
  });

  return topCommentersWithCount;
}
