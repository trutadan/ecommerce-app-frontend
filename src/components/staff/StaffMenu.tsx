import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import PersonIcon from "@mui/icons-material/Person";

export const StaffMenu = () => {
  return (
    <List
      component="nav"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        maxWidth: 360,
        margin: "auto",
        backgroundColor: "white",
      }}
    >
      <ListItem component={RouterLink} to="/staff/items">
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="ITEMS" />
      </ListItem>
      <ListItem component={RouterLink} to="/admin/roles">
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="ROLES" />
      </ListItem>
    </List>
  );
};