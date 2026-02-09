 import React, { useState } from "react";
import { TextField, Box, Typography, Container, Alert } from "@mui/material";
import AppButton from "../components/button";
import backgroundImage from "../assets/How to learn python for artificial intelligence_.jpg";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    try {
      setLoading(true);

      // 🔑 backend returns STRING token
      await loginUser({ username, password });

      // ✅ token already saved in localStorage
      navigate("/studentsTablePage");

    } catch {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
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
            Login
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
              handleLogin();
            }}
          >
            {error && <Alert severity="error">{error}</Alert>}

            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              required
            />

            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />

            <AppButton
              label={loading ? "Logging in..." : "Login"}
              onClick={handleLogin}
            />

            <Typography align="center" variant="body2">
              Don’t have an account?{" "}
              <span
                style={{ color: "#1976d2", cursor: "pointer" }}
                onClick={() => navigate("/register")}
              >
                Register here
              </span>
            </Typography>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default LoginPage;
