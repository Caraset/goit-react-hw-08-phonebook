import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const URL = 'https://618eb91150e24d0017ce1407.mockapi.io';
const URL = 'https://connections-api.herokuapp.com';

// export const contactsApi = createApi({
//   reducerPath: 'contacts',

//   baseQuery: fetchBaseQuery({
//     baseUrl: URL,
//     // prepareHeaders: (headers, { getState }) => {
//     //   const token = getState().auth.token;

//     //   // If we have a token set in state, let's assume that we should be passing it.
//     //   if (token) {
//     //     headers.set('authorization', `Bearer ${token}`);
//     //   }

//     //   return headers;
//     // },
//   }),
//   tagTypes: ['contacts'],
//   endpoints: builder => ({
//     getAllContacts: builder.query({
//       query: () => `/contacts`,
//       providesTags: ['contacts'],
//     }),
//     deleteContact: builder.mutation({
//       query: contactId => ({
//         url: `/contacts/${contactId}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['contacts'],
//     }),
//     addContact: builder.mutation({
//       query: contact => ({
//         url: `/contacts`,
//         method: 'POST',
//         body: contact,
//       }),
//       invalidatesTags: ['contacts'],
//     }),
//   }),
// });

// export const {
//   useGetAllContactsQuery,
//   useAddContactMutation,
//   useDeleteContactMutation,
// } = contactsApi;

export const contactsApi = createApi({
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['contacts'],
  endpoints: builder => ({
    getAllContacts: builder.query({
      query: () => `/contacts`,
      providesTags: ['contacts'],
    }),
    deleteContact: builder.mutation({
      query: contactId => ({
        url: `/contacts/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['contacts'],
    }),
    addContact: builder.mutation({
      query: contact => ({
        url: `/contacts`,
        method: 'POST',
        body: contact,
      }),
      invalidatesTags: ['contacts'],
    }),
    registerUser: builder.mutation({
      query: user => ({
        url: '/users/signup',
        method: 'POST',
        body: user,
      }),
    }),
    loginUser: builder.mutation({
      query: user => ({
        url: '/users/login',
        method: 'POST',
        body: user,
      }),
      // transformResponse: response => response.data,
    }),
  }),
});

export const {
  useGetAllContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
} = contactsApi;

// name: Qwer Qwerty
// email: qwerty@qwer.qw
// password: qwerty12
