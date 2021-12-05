import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const messagesApi = createApi({
  reducerPath: "messageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://designo-jamesthelessfc.vercel.app/api/",
  }),
  tagTypes: ["Message"],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: ({ page = 1, sortBy = "date" }) =>
        `messages?sortBy=${sortBy}&page=${page}`,
      providesTags: (result) =>
        result && Array.isArray(result)
          ? [
              ...result.map(({ id }) => ({ type: "Message", id })),
              { type: "Message", id: "LIST" },
            ]
          : [{ type: "Message", id: "LIST" }],
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        url: "message",
        method: "POST",
        body: message,
      }),
      invalidatesTags: [{ type: "Message", id: "LIST" }],
    }),
    updateMessage: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `message/${id}`,
        method: "PATCH",
        body,
      }),
    }),
    updateMessages: builder.mutation({
      query: (body) => ({
        url: `messages`,
        method: "PATCH",
        body,
      }),
    }),
    deleteMessages: builder.mutation({
      query: (messageIds) => ({
        url: `messages?ids=${messageIds.join(",")}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) =>
        result && Array.isArray(result)
          ? [
              ...result.map(({ id }) => ({ type: "Message", id })),
              { type: "Message", id: "LIST" },
            ]
          : [{ type: "Message", id: "LIST" }],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useUpdateMessageMutation,
  useUpdateMessagesMutation,
  useDeleteMessagesMutation,
} = messagesApi;
