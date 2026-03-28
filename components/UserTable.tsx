"use client";
import { User } from "@/types/user";
import { Box, Typography, IconButton } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";

interface Props {
  users: User[];
  onEdit: (user: User) => void;
}

export default function UserTable({ users, onEdit }: Props) {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
const [rows, setRows] = useState<any[]>([]);
 
  const columns: GridColDef[] = [
    {
      field: "rowNumber",
      headerName: "#",
      width: 60,
      sortable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "first_name",
      headerName: "First Name",
      width: 150,
      flex: 1,
    },
    {
      field: "last_name",
      headerName: "Last Name",
      width: 150,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <IconButton
          size="small"
          onClick={() => onEdit(params.row.originalUser)}
          sx={{
            color: "#1976d2",
            "&:hover": {
              backgroundColor: "#e3f2fd",
            },
          }}
          title="Edit user"
        >
          <EditIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];


  // if (users.length === 0) {
  //   return (
  //     <Box
  //       sx={{
  //         display: "flex",
  //         flexDirection: "column",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         minHeight: "400px",
  //         color: "#999",
  //       }}
  //     >
  //       <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
  //         No users yet
  //       </Typography>
  //       <Typography variant="body2">
  //         Click "Add New User" to create your first user
  //       </Typography>
  //     </Box>
  //   );
  // }


const allUsersAPi = async () => {
  try {
    const res = await fetch("http://localhost:3001/api/users",{ headers:{
      'accept': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem("token")}`
    }});
     const data = await res.json();
     const rows1 = data.map((user, index) => ({
    id: user.id || index,
    rowNumber: index + 1,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    originalUser: user,
  }));
setRows(rows1);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

useEffect(() => {
allUsersAPi()
}, [users]);

  return (
    <Box sx={{ width: "100%", height: 500 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 25, 50]}
        checkboxSelection={false}
        disableRowSelectionOnClick
        sx={{
          border: "none",
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#f5f7fa",
            fontWeight: 600,
            color: "#1a237e",
            borderBottom: "2px solid #e0e0e0",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #e8eaed",
            color: "#333",
          },
          "& .MuiDataGrid-row": {
            "&:hover": {
              backgroundColor: "#f9fafb",
            },
          },
          "& .MuiTablePagination-root": {
            borderTop: "1px solid #e0e0e0",
          },
        }}
      />
    </Box>
  );
}