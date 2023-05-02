import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Button, Avatar } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";

const styles = {
  logo: {
    marginRight: "auto",
  },
  items: {
    display: "flex",
    justifyContent: "center",
    flexGrow: 1,
  },
  cart: {
    marginLeft: "auto",
  },
  profile: {
    marginLeft: "12px",
  },
};

export const NavigationBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_URL}/user/`, {
          withCredentials: true,
        });
        setIsAuthenticated(true);
        setProfilePicture(response.data.profile?.picture);
      } catch (error) {
        setIsAuthenticated(false);
        setProfilePicture(null);
      }
    };
    checkAuth();
  }, []);

  let profileLink;
  if (isAuthenticated) {
    profileLink = (
      <Link to="/profile" style={styles.profile}>
        {profilePicture ? (
          <Avatar src={profilePicture}></Avatar>
        ) : (
          <Avatar></Avatar>
        )}
      </Link>
    );
  } else {
    profileLink = (
      <Link to="/login" style={styles.profile}>
        <Button variant="contained">Login</Button>
      </Link>
    );
  }

  return (
    <div>
      <AppBar position="fixed" style={{ top: 0 }}>
        <Toolbar>
          <Link to="/" style={styles.logo}>
            <img src={logo} alt="Logo" height="40" />
          </Link>
          <div style={styles.items}>
            <Link to="/items">
              <Button color="inherit">Items</Button>
            </Link>
            <Link to="/categories">
              <Button color="inherit">Categories</Button>
            </Link>
          </div>
          <Link to="/cart" style={styles.cart}>
            <ShoppingCartIcon />
          </Link>
          {profileLink}
        </Toolbar>
      </AppBar>
    </div>
  );
};
