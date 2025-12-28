import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ColorModeContext } from "../../theme/ColorModeContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

export default function Navbar({ onMenuClick }) {
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  const open = Boolean(anchorEl);

  return (
    <AppBar position="fixed" sx={{ zIndex: 1400 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton color="inherit" onClick={onMenuClick}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" fontWeight={600}>
            Team Resource Manager
          </Typography>
        </Box>

        <Box>
          <IconButton color="inherit" onClick={toggleColorMode}>
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>U</Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem
              onClick={() => {
                navigate("/profile");
                setAnchorEl(null);
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/settings");
                setAnchorEl(null);
              }}
            >
              Settings
            </MenuItem>
            <MenuItem
              onClick={() => {
                alert("Logout action goes here");
                setAnchorEl(null);
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
