import {
  Dialog,
  TextField,
  Button,
  DialogContent,
  DialogTitle,
  Stack,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import { User } from "@/types/user";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (user: User) => void;
  user: User | null;
}

export default function UserFormModal({
  open,
  onClose,
  onSubmit,
  user,
}: Props) {
  const [form, setForm] = useState<User>({
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (user) setForm(user);
    else setForm({ id: 0, first_name: "", last_name: "", email: "", password: "" });
  }, [user, open]);

  const validate = () => {
    let err: any = {};
    if (!form.first_name) err.first_name = "Required";
    if (!form.last_name) err.last_name = "Required";
    if (!form.email) err.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      err.email = "Invalid Email";
    if (!form.password) err.password = "Required";
    else if (form.password.length < 6) err.password = "Password must be at least 6 characters";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(form);
      setForm({ id: 0, first_name: "", last_name: "", email: "", password: "" });
    }
  };

  const handleClose = () => {
    setForm({ id: 0, first_name: "", last_name: "", email: "", password: "" });
    setErrors({});
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "12px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
        }
      }}
    >
      <DialogTitle 
        sx={{
          backgroundColor: "#1a237e",
          color: "white",
          fontSize: "1.5rem",
          fontWeight: 600,
          padding: "24px"
        }}
      >
        {user ? "Edit User" : "Add New User"}
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Stack spacing={3} sx={{ marginTop: 2 }}>
          <TextField
            fullWidth
            label="First Name"
            placeholder="Enter first name"
            value={form.first_name}
            error={!!errors.first_name}
            helperText={errors.first_name}
            onChange={(e) =>
              setForm({ ...form, first_name: e.target.value })
            }
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "&:hover fieldset": {
                  borderColor: "#1976d2"
                }
              }
            }}
          />

          <TextField
            fullWidth
            label="Last Name"
            placeholder="Enter last name"
            value={form.last_name}
            error={!!errors.last_name}
            helperText={errors.last_name}
            onChange={(e) =>
              setForm({ ...form, last_name: e.target.value })
            }
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "&:hover fieldset": {
                  borderColor: "#1976d2"
                }
              }
            }}
          />

          <TextField
            fullWidth
            label="Email"
            placeholder="Enter email address"
            type="email"
            value={form.email}
            error={!!errors.email}
            helperText={errors.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "&:hover fieldset": {
                  borderColor: "#1976d2"
                }
              }
            }}
          />

          <TextField
            fullWidth
            label="Password"
            placeholder="Enter password"
            type="password"
            value={form.password}
            error={!!errors.password}
            helperText={errors.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "&:hover fieldset": {
                  borderColor: "#1976d2"
                }
              }
            }}
          />

          <Box 
            sx={{ 
              display: "flex", 
              gap: 2, 
              justifyContent: "flex-end",
              pt: 2
            }}
          >
            <Button 
              onClick={handleClose}
              variant="outlined"
              sx={{
                textTransform: "none",
                borderRadius: "8px",
                padding: "8px 24px",
                borderColor: "#ddd",
                color: "#666",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                  borderColor: "#aaa"
                }
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              variant="contained"
              sx={{
                backgroundColor: "#1976d2",
                textTransform: "none",
                borderRadius: "8px",
                padding: "8px 24px",
                "&:hover": {
                  backgroundColor: "#1565c0"
                }
              }}
            >
              {user ? "Update" : "Create"} User
            </Button>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}