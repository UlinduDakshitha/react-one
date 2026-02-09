 import React, { useState } from "react";
import { TextField, Box, Typography, Container, Alert } from "@mui/material";
import AppButton from "../components/button";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/How to learn python for artificial intelligence_.jpg";
import { registerUser } from "../services/api";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    try {
      await registerUser({ username, password });

      setSuccess("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch {
      setError("Registration failed. Username may already exist.");
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
          <Typography variant="h4" sx={{ color: "white" }}>
            Register
          </Typography>

          <Box
            component="form"
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              backgroundColor: "rgba(255,255,255,0.9)",
              padding: 4,
              borderRadius: 2,
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <AppButton label="Register" onClick={handleRegister} />

            <Typography align="center" variant="body2">
              Already have an account?{" "}
              <span
                style={{ color: "#1976d2", cursor: "pointer" }}
                onClick={() => navigate("/login")}
              >
                Login here
              </span>
            </Typography>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default RegisterPage;
