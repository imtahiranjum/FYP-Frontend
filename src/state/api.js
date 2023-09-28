import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "OnSaleCattle",
    "Staff",
    "Employee",
    "AddCattleToSale",
    "Dashboard",
    "AllCattle",
    "RemoveFromSale",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getOnSaleCattle: build.query({
      query: () => `onsalecattle/`,
      providesTags: ["OnSaleCattle"],
    }),
    getAllCattle: build.query({
      query: () => `cattle/all`,
      providesTags: ["AllCattle"],
    }),
    getOneCattle: build.query({
      query: (id) => `cattle/${id}`,
      providesTags: ["OneCattle"],
    }),
    addOneCattleToSale: build.mutation({
      query: (title, description, price, cattle_id) => ({
        url:'onsalecattle/addcattletosale',
        method: "POST",
        body: title, description, price, cattle_id
      }),
      invalidatesTags: ["AllCattle"],
    }),
    updateCattleOnSaleStatus: build.mutation({
      query: ({cattle_id, to_add}) => ({

        url:`onsalecattle/updatecattleonsalestatus/${cattle_id}&${to_add}`,
        method: "PATCH",

      }),
      invalidatesTags: ["AllCattle"],
    }),
    getStaff: build.query({
      query: () => `client/staff/`,
      providesTags: ["Staff"],
    }),
    getDoctor: build.query({
      query: () => `client/doctors/`,
      providesTags: ["Doctor"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
    removeCattleFromSale: build.mutation({
      query: (id) => ({
        url:`onsalecattle/removefromsale/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["OnSaleCattle"],
    }),
    addNewCattle: build.mutation({
      query: (name, images, gender, age, breed, color, weight, category) => ({
        url:`cattle/create`,
        method: "POST",
        body: name, images, gender, age, breed, color, weight, category
      }),
      invalidatesTags: ["AllCattle"],
    }),
    getEmployee: build.query({
      query: (id) => `client/staff/${id}`,
      providesTags: ["Employee"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetOnSaleCattleQuery,
  useGetStaffQuery,
  useGetDoctorQuery,
  useGetDashboardQuery,
  useGetAllCattleQuery,
  useGetOneCattleQuery,
  useAddOneCattleToSaleMutation,
  useRemoveCattleFromSaleMutation,
  useUpdateCattleOnSaleStatusMutation,
  useAddNewCattleMutation,
  useSetProductQuery,
  useGetEmployeeQuery,
  useGetAdminsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetTransactionsQuery,
  useGetUserPerformanceQuery
} = api;
