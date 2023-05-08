import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Grid, TextField } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_API_URL } from "../../constants";
import logo from "../../assets/images/logo.png";

export const LoginPage = () => {
  const navigate = useNavigate();

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleUsernameOrEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUsernameOrEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .post(
        `${BACKEND_API_URL}/login/`,
        {
          user: usernameOrEmail,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data.role !== "REGULAR")
          navigate("/navigation")
        else
          navigate("/");
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.log(error);
          toast.error("Incorrect username/email or password.");
        } else {
          console.log(error);
          toast.error("Something went wrong. Please try again later.");
        }
      });
  };

  return (
    <>
      <ToastContainer />
      <Grid container justifyContent="center">
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 5,
          }}
          onSubmit={handleLoginSubmit}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              backgroundColor: "white",
              padding: "16px",
              boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
              marginBottom: 5,
            }}
          >
            <Link to="/" style={{ marginRight: "auto" }}>
              <img src={logo} alt="Logo" height="40" />
            </Link>
          </Box>

          <TextField
            style={{ marginBottom: 2 }}
            label="Username/Email"
            variant="outlined"
            fullWidth
            value={usernameOrEmail}
            onChange={handleUsernameOrEmailChange}
          />
          <TextField
            style={{ marginBottom: 2 }}
            type={showPassword ? "text" : "password"}
            label="Password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={handlePasswordChange}
            InputProps={{
              endAdornment: (
                <Button onClick={handlePasswordVisibility}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              ),
            }}
          />
          <Button
            style={{ marginTop: 2 }}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Log in
          </Button>
          <p>Don't have an account?</p>
          <Link to="/register">
            <Button startIcon={<PersonAdd />} color="primary">
              Register
            </Button>
          </Link>
        </form>
      </Grid>
    </>
  );
};

export default LoginPage;
