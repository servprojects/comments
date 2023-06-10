import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const axiosBaseQuery = ({ baseUrl } = { baseUrl: "" }) => async ({
  url,
  method,
  data,
  params,
}) => {
  try {
    const result = await axios({ url: baseUrl + url, method, data, params });

    return { data: result };
  } catch (axiosError) {
    let err = axiosError;
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  }
};

export const basePersistentApi = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  reducerPath: "basePersistentApi",
  endpoints: () => ({}),
  keepUnusedDataFor: 360,
});
