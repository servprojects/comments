import { basePersistentApi } from "../baseApi";

export const commentApi = basePersistentApi.injectEndpoints({
  endpoints: (build) => ({
    getComments: build.query({
      query: () => ({
        url: "/comments",
        method: "get",
      }),
      transformResponse: (response) => {
        var cutComments = [];
        if (response.data && response.data.length > 0) {
          cutComments = response.data.slice(0, 50);
          cutComments = cutComments.map((comment) => {
            return {
              id: comment.id,
              name: comment.name,
              message: comment.body,
            };
          });
        }

        return { data: cutComments };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetCommentsQuery } = commentApi;
