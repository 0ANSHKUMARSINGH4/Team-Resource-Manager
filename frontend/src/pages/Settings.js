import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  FormControlLabel,
  Switch,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { ColorModeContext } from "../theme/ColorModeContext";
import ConfirmDialog from "../components/common/ConfirmDialog";
import styles from "../components/Layout/Layout.module.css";

export default function Settings() {
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const [language, setLanguage] = useState("en");
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <>
      <Box className={styles.card} sx={{ maxWidth: 520, mx: "auto" }}>
        <Typography variant="h5" gutterBottom>
          Settings
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* Appearance section – same layout vibe as earlier dark mode toggle */}
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Appearance
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={mode === "dark"}
              onChange={toggleColorMode}
              color="primary"
            />
          }
          label="Dark mode"
        />

        <Divider sx={{ my: 3 }} />

        {/* Preferences section */}
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Preferences
        </Typography>

        <TextField
          select
          label="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="hi">Hindi</MenuItem>
          <MenuItem value="fr">French</MenuItem>
        </TextField>

        <Button variant="contained">Save Preferences</Button>

        <Divider sx={{ my: 3 }} />

        {/* Danger section */}
        <Typography variant="subtitle1" color="error" sx={{ mb: 1 }}>
          Account Deletion
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={() => setOpenDelete(true)}
        >
          Delete account
        </Button>
      </Box>

      {/* Proper professional popup, not window.confirm */}
      <ConfirmDialog
        open={openDelete}
        title="Delete account?"
        message="This action is permanent and cannot be undone."
        onClose={() => setOpenDelete(false)}
        onConfirm={() => {
          setOpenDelete(false);
          console.log("Account deleted (hook backend here).");
        }}
      />
    </>
  );
}
