import { apiSlice } from "./apiSlice";

const API_BASE_URL = '/api/users';

export const apiClientRequestSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: `${API_BASE_URL}/register`,
                method: 'POST',
                body: data
            })
        }),
        login: builder.mutation({
            query: (data) => ({
                url: `${API_BASE_URL}/login`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: (data) => ({
                url: `${API_BASE_URL}/logout`,
                method: 'POST',
                body: data
            })
        }),
        update: builder.mutation({
            query: (data) => ({
                url: `${API_BASE_URL}/update`,
                method: 'PUT',
                body: data
            })
        })
    })
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useUpdateMutation
} = apiClientRequestSlice