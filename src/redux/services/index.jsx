import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL, endpoints} from '../constant';

export const Apis = createApi({
  reducerPath: 'Apis',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, {getState}) => {
      const token = getState().persistedData.token;
      console.log('-:TOKEN:-', token);
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    register: builder.mutation({
      query: data => ({
        url: endpoints.signup,
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: data => ({
        url: endpoints.login,
        method: 'POST',
        body: data,
      }),
    }),
    forgetPassword: builder.mutation({
      query: data => ({
        url: endpoints.sendEmail,
        method: 'POST',
        body: data,
      }),
    }),
    verifyOTP: builder.mutation({
      query: data => {
        return {
          url: endpoints.verifyOTP,
          method: 'POST',
          body: data,
        };
      },
    }),
    createProfile: builder.mutation({
      query: data => {
        return {
          url: endpoints.UPDATE_PROFILE,
          method: 'POST',
          body: data,
          headers: {
            Accept: 'application/json',
          },
        };
      },
    }),
    passwordOptions: builder.mutation({
      query: data => ({
        url: endpoints.password,
        method: 'POST',
        body: data,
      }),
    }),
    getProfile: builder.query({
      query: token => {
        return {
          url: endpoints.GET_PROFILE,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    getAllEvent: builder.query({
      query: () => {
        return {
          url: endpoints.GET_ALL_EVENTS,
          method: 'GET',
        };
      },
    }),
    getAllBanner: builder.query({
      query: () => {
        return {
          url: endpoints.GET_BANNER,
          method: 'GET',
        };
      },
    }),
    getEventById: builder.query({
      query: eventId => {
        return {
          url: endpoints.GET_EVENT_BY_ID(eventId),
          method: 'GET',
        };
      },
    }),
    addOrRemoveToFav: builder.mutation({
      query: data => ({
        url: endpoints.ADD_OR_REMOVE_TO_FAV,
        method: 'POST',
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: data => ({
        url: endpoints.CHANGE_PASSWORD,
        method: 'POST',
        body: data,
      }),
    }),
    getFavoriesByToken: builder.query({
      query: token => {
        return {
          url: endpoints.GET_FAVORITES,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    createPost: builder.mutation({
      query: data => {
        return {
          url: endpoints.CREATE_POST,
          method: 'POST',
          body: data,
          headers: {
            Accept: 'application/json',
          },
        };
      },
    }),
    getAllPost: builder.query({
      query: () => {
        return {
          url: endpoints.GET_ALL_POST,
          method: 'GET',
        };
      },
    }),
    likePost: builder.mutation({
      query: data => ({
        url: endpoints.LIKE_POST,
        method: 'POST',
        body: data,
      }),
    }),
    commentPost: builder.mutation({
      query: data => ({
        url: endpoints.COMMENT_POST,
        method: 'POST',
        body: data,
      }),
    }),
    replyCommentPost: builder.mutation({
      query: data => ({
        url: endpoints.REPLY_COMMENT_POST,
        method: 'POST',
        body: data,
      }),
    }),
    createEvent: builder.mutation({
      query: data => {
        return {
          url: endpoints.CREATE_EVENT,
          method: 'POST',
          body: data,
          headers: {
            Accept: 'application/json',
          },
        };
      },
    }),
    getNearByUsers: builder.query({
      query: ({longitude, latitude}) => {
        return {
          url: endpoints.GET_NEAR_BY_USERS(longitude, latitude),
          method: 'GET',
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        };
      },
    }),
    addRequest: builder.mutation({
      query: data => ({
        url: endpoints.ADD_REQUEST,
        method: 'POST',
        body: data,
      }),
    }),
    ignoreUser: builder.mutation({
      query: data => ({
        url: endpoints.IGNORE_USER,
        method: 'POST',
        body: data,
      }),
    }),
    blockUser: builder.mutation({
      query: data => ({
        url: endpoints.BLOCK_USER,
        method: 'POST',
        body: data,
      }),
    }),
    getFollowingsAndFollowReq: builder.query({
      query: type => {
        return {
          url: endpoints.GET_FOLLOWINGS_FOLLOWREQ(type),
          method: 'GET',
        };
      },
    }),
    approveRejectReq: builder.mutation({
      query: data => ({
        url: endpoints.APPROVE_REJECT,
        method: 'POST',
        body: data,
      }),
    }),
    searchByEventName: builder.query({
      query: eventName => {
        return {
          url: endpoints.SEARCH_BY_EVENT_NAME(eventName),
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useCreateProfileMutation,
  useCreatePostMutation,
  useForgetPasswordMutation,
  useVerifyOTPMutation,
  usePasswordOptionsMutation,
  useAddOrRemoveToFavMutation,
  useChangePasswordMutation,
  useApproveRejectReqMutation,
  useLikePostMutation,
  useCommentPostMutation,
  useReplyCommentPostMutation,
  useAddRequestMutation,
  useIgnoreUserMutation,
  useBlockUserMutation,
  useCreateEventMutation,
  useLazyGetProfileQuery,
  useLazyGetAllEventQuery,
  useLazyGetAllBannerQuery,
  useLazyGetAllPostQuery,
  useLazyGetEventByIdQuery,
  useLazyGetNearByUsersQuery,
  useLazyGetFavoriesByTokenQuery,
  useLazyGetFollowingsAndFollowReqQuery,
  useLazySearchByEventNameQuery,
} = Apis;
