"use client";
import { useState } from "react";
import { User } from "@/types/user";
import { Button, Container, Box, Typography, Paper } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import UserTable from "@/components/UserTable";
import UserFormModal from "@/components/UserFormModal";
import Link from "next/link";

export default function Home() {
  const [users, setUsers] = useState<User[] | []>([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleAdd = () => {
    setSelectedUser(null);
    setOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleSubmit = (user: User) => {
    if (selectedUser) {
      setUsers((prev) => prev.map((u) => (u.id === user.id ? user : u)));
      updateUser(user);
    } else {
      setUsers((prev) => [...prev, { ...user, id: Date.now() }]);
      createUser(user);
    }
    setOpen(false);
  };

  const createUser = async (user: User) => {
    try {
      const { id, ...userData } = user; // Exclude id when creating
      const response = await fetch("http://localhost:3001/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'accept': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      console.log("User created:", data);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const updateUser = async (user: User) => {
    try {
      const { id, deleted_at,...userData } = user; // Exclude id when creating
      const response = await fetch(`http://localhost:3001/api/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
          'accept': 'application/json',
        },
        body: JSON.stringify({...userData}),
      });
      const data = await response.json();
      console.log("User created:", data);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f7fa", py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              fontWeight: 700, 
              color: "#1a237e",
              mb: 1
            }}
          >
            User Management
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: "#666",
              fontSize: "1rem"
            }}
          >
            Create, manage, and organize your users
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Button 
            variant="contained" 
            onClick={handleAdd}
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#1565c0"
              },
              textTransform: "none",
              fontSize: "1rem",
              padding: "10px 24px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(25, 118, 210, 0.3)"
            }}
          >
            Add New User
          </Button>
<Button variant="contained" sx={{marginLeft:3}} > <Link href="/login" > LogIn </Link></Button>
         
        </Box>

        <Paper 
          elevation={0} 
          sx={{
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid #e0e0e0"
          }}
        >
          <UserTable users={users} onEdit={handleEdit} />
        </Paper>
      </Container>

      <UserFormModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        user={selectedUser}
      />
    </Box>
  );
}
