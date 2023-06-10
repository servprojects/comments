import { getTopCommentors } from "store/slices/comment";
import { basePersistentApi } from "../baseApi";

export const commentApi = basePersistentApi.injectEndpoints({
  endpoints: (build) => ({
    getComments: build.query({
      query: () => ({
        url: "/comments",
        method: "get",
      }),
      transformResponse: (response) => {
        var cutComments = restructureComments(response.data);

        return { data: cutComments };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          var cutComments = restructureComments(data.data);
          dispatch(getTopCommentors({ comments: cutComments }));
        } catch (error) {}
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetCommentsQuery } = commentApi;

function restructureComments(data) {
  var cutComments = [];
  if (data && data.length > 0) {
    cutComments = data.slice(0, 50);
    cutComments = cutComments.map((comment) => {
      return {
        id: comment.id,
        name: comment.name,
        message: comment.body,
      };
    });
    return cutComments;
  } else {
    return cutComments;
  }
}
