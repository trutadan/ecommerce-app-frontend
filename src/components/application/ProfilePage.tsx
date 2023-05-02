import React, { useState, useEffect } from "react";
import { Typography, Card, CardContent, Box, IconButton } from "@mui/material";
import { UserInformation } from "../../models/User";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import CancelIcon from "@mui/icons-material/Cancel";
import { BACKEND_API_URL } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/images/logo.png";

const styles = {
  root: {
    minWidth: 275,
    margin: "auto",
    maxWidth: 500,
  },
};

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [userInformation, setUserInformation] = useState<UserInformation>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<UserInformation>(
          `${BACKEND_API_URL}/user-profile/information/`,
          {
            withCredentials: true,
          }
        );
        setUserInformation(response.data);
      } catch (error) {
        toast.error("Something went wrong. Please try again later.");
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BACKEND_API_URL}/logout/`,
        {},
        {
          withCredentials: true,
        }
      );
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
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
          }}
        >
          <Link to="/" style={{ marginRight: "auto" }}>
            <img src={logo} alt="Logo" height="40" />
          </Link>
        </Box>
        <Typography component="h1" variant="h5">
          My Profile
        </Typography>
      </div>
      <Card style={styles.root}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Box>

          {userInformation && (
            <>
              <Typography variant="subtitle1" color="textSecondary">
                Name
              </Typography>
              <Typography variant="body1" color="textPrimary" gutterBottom>
                {userInformation.first_name} {userInformation.last_name}
              </Typography>

              <Typography variant="subtitle1" color="textSecondary">
                Email
              </Typography>
              <Typography variant="body1" color="textPrimary" gutterBottom>
                {userInformation.email}
              </Typography>

              <Typography variant="subtitle1" color="textSecondary">
                Username
              </Typography>
              <Typography variant="body1" color="textPrimary" gutterBottom>
                {userInformation.username}
              </Typography>

              <Typography variant="subtitle1" color="textSecondary">
                Verified
              </Typography>
              <Typography variant="body1" color="textPrimary" gutterBottom>
                {userInformation.is_active ? (
                  <CheckCircleIcon style={{ color: "green" }} />
                ) : (
                  <CancelIcon style={{ color: "red" }} />
                )}
              </Typography>

              <Typography variant="subtitle1" color="textSecondary">
                Created At
              </Typography>
              <Typography variant="body1" color="textPrimary" gutterBottom>
                {userInformation.created_at.split("T")[0]}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};
