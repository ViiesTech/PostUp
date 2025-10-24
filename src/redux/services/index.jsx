import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL, endpoints} from '../constant';

export const Apis = createApi({
  reducerPath: 'Apis',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, {getState}) => {
      const token = getState().persistedData.token;
      console.log('state ===>', token);
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
      query: () => {
        //   console.log('typeeee',type)
        return {
          url: endpoints.GET_PROFILE,
          method: 'GET',
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
    getEventById: builder.query({
      query: (eventId) => {
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
     getFavoriesByToken: builder.query({
      query: (token) => {
        return {
          url: endpoints.GET_FAVORITES,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useCreateProfileMutation,
  useForgetPasswordMutation,
  useVerifyOTPMutation,
  usePasswordOptionsMutation,
  useAddOrRemoveToFavMutation,
  useLazyGetProfileQuery,
  useLazyGetAllEventQuery,
  useLazyGetEventByIdQuery,
  useLazyGetFavoriesByTokenQuery,
} = Apis;
