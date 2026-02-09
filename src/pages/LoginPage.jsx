import React, { useState } from "react";
import { TextField, Box, Typography, Container } from "@mui/material";
import AppButton from "../components/button";
import backgroundImage from "../assets/How to learn python for artificial intelligence_.jpg";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login clicked with:", { username, password });
    // Add your login logic here
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
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: "white" }}>
            Login
          </Typography>

          <Box
            component="form"
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              backgroundColor: "rgba(255, 255, 255, -0.8)",
              padding: 4,
              borderRadius: 2,
              opacity: 1,
            }}
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
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

            <AppButton
              label="Login"
              onClick={handleLogin}
              sx={{ mt: 2, py: 1.5 }}
            />
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default LoginPage;
