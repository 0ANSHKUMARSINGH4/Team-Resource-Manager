// src/components/Layout/UserMenu.js
import React, { useState } from "react";
import { Avatar, Menu, MenuItem, IconButton, Typography, Box } from "@mui/material";

export default function UserMenu() {
  const [anchor, setAnchor] = useState(null);
  const open = Boolean(anchor);

  const handleOpen = (e) => setAnchor(e.currentTarget);
  const handleClose = () => setAnchor(null);

  return (
    <>
      <IconButton onClick={handleOpen} sx={{ ml: 1 }}>
        <Avatar sx={{ width: 36, height: 36 }}>U</Avatar>
      </IconButton>

      <Menu anchorEl={anchor} open={open} onClose={handleClose}>
        <Box sx={{ px: 2, py: 1.25 }}>
          <Typography variant="subtitle2">You</Typography>
          <Typography variant="body2" color="text.secondary">user@example.com</Typography>
        </Box>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </>
  );
}
