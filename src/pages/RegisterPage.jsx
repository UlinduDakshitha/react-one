import React, { useState } from "react";
import {
  TextField,
  Box,
  Typography,
  Container,
  MenuItem,
  Alert,
} from "@mui/material";
import AppButton from "../components/button";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/How to learn python for artificial intelligence_.jpg";
import { registerUser } from "../services/api";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (!username || !password || !role) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await registerUser({ username, password, role });
      setSuccess("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("${backgroundImage}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            gap: 3,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ color: "white" }}
          >
            Register
          </Typography>

          <Box
            component="form"
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              padding: 4,
              borderRadius: 2,
              boxShadow: 3,
            }}
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
          >
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}

            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <TextField
              select
              label="Role"
              variant="outlined"
              fullWidth
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>

            <AppButton
              label="Register"
              onClick={handleRegister}
              sx={{ mt: 2, py: 1.5 }}
            />

            <Box sx={{ textAlign: "center", mt: 1 }}>
              <Typography variant="body2">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  style={{ color: "#1976d2", cursor: "pointer" }}
                >
                  Login here
                </span>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default RegisterPage;
