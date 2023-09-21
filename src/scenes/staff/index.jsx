import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetStaffQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";

const Staff = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetStaffQuery();
  console.log("data", data);
  

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "first_name",
      headerName: "Name",
      flex: 0.5,

    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,

    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      flex: 0.5,
      
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "designation",
      headerName: "Designation",
      flex: 1,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="STAFF" subtitle="List Employeed Staff" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []} 
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Staff;