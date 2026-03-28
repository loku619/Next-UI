"use client";

import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { useRouter } from "next/router";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [form, setForm] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<LoginFormData>>({});

  const navigate = useRouter();

  const validate = () => {
    const newErrors: Partial<LoginFormData> = {};

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
const res = await fetch("http://localhost:3001/api/auth/login", {   
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'accept': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
       if (!res.ok) { // For the fetch API, you explicitly check the status
        alert(data.message);
        return
    }
    sessionStorage.setItem("token", data.access_token);
      console.log("Login Response:", data);
      navigate.push("/");
      
    } catch (error) {
        alert("Login failed. Please check your credentials and try again.");
        console.error("Login failed", error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Paper elevation={3} sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" mb={2}>
          Login
        </Typography>

        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="normal"
          value={form.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          margin="normal"
          value={form.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}