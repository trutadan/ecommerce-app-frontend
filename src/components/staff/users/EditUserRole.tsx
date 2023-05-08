import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import axios from "axios";
import { BACKEND_API_URL } from "../../../constants";
import { UserRoles } from "../../../models/User";
import logo from "../../../assets/images/logo.png";

export const EditUserRole = () => {
  const navigate = useNavigate();

  const { userID: userId } = useParams<{ userID: string }>();

  const [user, setUser] = useState<UserRoles | null>(null);
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    axios.get(`${BACKEND_API_URL}/user-roles/${userId}/`, {
        withCredentials: true
      })      
      .then((response) => {
        setUser(response.data);
        setSelectedRole(response.data.role);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole((event.target as HTMLInputElement).value);
  };

  const handleUpdateClick = () => {
    axios.put(`${BACKEND_API_URL}/user-roles/${userId}/`, {
        username: user?.username,
        email: user?.email,
        role: selectedRole,
      }, {
        withCredentials: true
      })      
      .then((response) => {
        setUser(response.data);
        console.log("User role updated");
        navigate("/admin/roles");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      {user && (
        <div>
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
              width: "fit-content",
              margin: "0 auto",
            }}
          >
            <Link to="/" style={{ marginRight: "auto" }}>
              <img src={logo} alt="Logo" height="40" />
            </Link>
          </Box>
          <Typography variant="h4" component="h1">
            Edit {user.username}'s Role
          </Typography>
          <Typography variant="h6" component="h2">
            Email: {user.email}
          </Typography>
          <Typography variant="h6" component="h2">
            Current role: {user.role}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: "2rem",
            }}
          >
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="role"
                name="role"
                value={selectedRole}
                onChange={handleRoleChange}
              >
                <FormControlLabel
                  value="ADMIN"
                  control={<Radio />}
                  label="Admin"
                />
                <FormControlLabel
                  value="REGULAR"
                  control={<Radio />}
                  label="Regular"
                />
                <FormControlLabel
                  value="MODERATOR"
                  control={<Radio />}
                  label="Moderator"
                />
              </RadioGroup>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateClick}
              sx={{ mt: "1rem" }}
            >
              Update Role
            </Button>
          </Box>
        </div>
      )}
    </Box>
  );
};
