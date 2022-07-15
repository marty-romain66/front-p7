import {createApi, fetcchBaseQuery} from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: "api",
    baseQuery: fetcchBaseQuery({
        baseUrl: "http://82.223.139.193:3001/api/auth/user/1",

    }),
endpoints : (builder) =>({
    users : builder.query({
        query : () => "/users",
    })
})
});
export const {useUsersQuery} = userApi;