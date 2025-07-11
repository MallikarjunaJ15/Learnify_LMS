import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const course_api = "http://localhost:3000/api/v1/courses/";
export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Refech_Creator_Course"],
  baseQuery: fetchBaseQuery({
    baseUrl: course_api,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ courseTitle, category }) => ({
        url: "createCourse",
        method: "POST",
        body: { courseTitle, category },
      }),
      invalidatesTags: ["Refech_Creator_Course"],
    }),
    getAllCreatorCourses: builder.query({
      query: () => ({
        url: "getAllCoursesOfCreator",
        method: "GET",
      }),
      providesTags: ["Refech_Creator_Course"],
    }),
  }),
});
export const { useCreateCourseMutation, useGetAllCreatorCoursesQuery } =
  courseApi;
