import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, endpoints } from "../constant";

export const Apis = createApi({
    reducerPath: 'Apis',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().persistedData.token;
            console.log('state ===>', token);
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: data => ({
                url: endpoints.signup,
                method: 'POST',
                body: data
            })
        }),
        login: builder.mutation({
            query: data => ({
                url: endpoints.login,
                method: 'POST',
                body: data
            })
        }),
        forgetPassword: builder.mutation({
            query: data => ({
                url: endpoints.sendEmail,
                method: 'POST',
                body: data
            })
        }),
        verifyOTP: builder.mutation({
            query: (data) => {
                return {
                    url: endpoints.verifyOTP,
                    method: 'POST',
                    body: data
                }
            }
        }),
        // createProfile: builder.mutation({
        //     query: (data) => {
        //         return {
        //             url: endpoints.UPDATE_PROFILE,
        //             method: 'POST',
        //             body: data
        //         }
        //     }
        // }),
        passwordOptions: builder.mutation({
            query: data => ({
                url: endpoints.password,
                method: 'POST',
                body: data
            })
        }),
        getProfile: builder.query({
            query: () => {
                //   console.log('typeeee',type)
                return {
                    url: endpoints.GET_PROFILE,
                    method: 'GET',
                }
            }
        }), 
    })
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useForgetPasswordMutation,
    useVerifyOTPMutation,
    usePasswordOptionsMutation,
    useLazyGetProfileQuery
} = Apis;