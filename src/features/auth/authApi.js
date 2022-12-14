import getSerializeData from "../../utils/getSerializeData";
import { apiSlice } from "../api/apiSlice";
import { profileAPI } from "../profile/profileAPI";
import { userLoggedIn } from "./authSlice";

export const authAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ necessaryData, optionalData }) => ({
        url: "/auth/local/register",
        method: "POST",
        body: necessaryData,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // update local storage
          localStorage.setItem(
            "auth",
            JSON.stringify({
              jwt: result.data.jwt,
              user: result.data.user,
            })
          );

          // update redux store
          dispatch(
            userLoggedIn({
              jwt: result.data.jwt,
              user: result.data.user,
            })
          );

          // silent entry to profile Table
          const user = result?.data?.user?.id;
          const username = result?.data?.user?.username;
          const avatar = arg?.optionalData?.file;
          let fullname = arg?.optionalData?.fullname;
          if (fullname === "" || fullname === null || fullname === undefined) {
            fullname =
              username[0].toUpperCase() +
              " " +
              username[username.length - 1].toUpperCase();
          }
          if (avatar) {
            const profileData = getSerializeData(
              {
                fullname,
                dateofbirth: "1990-01-01",
                user,
              },
              "avatar",
              avatar
            );
            await dispatch(
              profileAPI.endpoints.storeProfile.initiate(profileData)
            );
          } else {
            await dispatch(
              profileAPI.endpoints.storeProfile.initiate({
                data: {
                  fullname,
                  dateofbirth: "1990-01-01",
                  user,
                },
              })
            );
          }
        } catch (error) {}
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/local",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // update local storage
          localStorage.setItem(
            "auth",
            JSON.stringify({
              jwt: result.data.jwt,
              user: result.data.user,
            })
          );
          // update redux store
          dispatch(
            userLoggedIn({
              jwt: result.data.jwt,
              user: result.data.user,
            })
          );
        } catch (error) {}
      },
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authAPI;
