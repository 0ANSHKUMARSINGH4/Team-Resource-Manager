import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import styles from "../components/Layout/Layout.module.css";

export default function Profile() {
  const [name, setName] = useState("User Name");
  const [email, setEmail] = useState("user@email.com");
  const [role] = useState("Admin");
  const [image, setImage] = useState(null);
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const handleImageChange = (e) => {
    if (!e.target.files?.[0]) return;
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSave = () => {
    // later: send to backend
    console.log({
      name,
      email,
      role,
      phone,
      location,
    });
  };

  return (
    <Box className={styles.card} sx={{ maxWidth: 520, mx: "auto" }}>
      <Box textAlign="center" sx={{ mb: 3 }}>
        <Avatar
          src={image}
          sx={{ width: 96, height: 96, mx: "auto", mb: 2 }}
        >
          {!image && name.charAt(0)}
        </Avatar>
        <Button component="label" variant="outlined" size="small">
          Change photo
          <input type="file" hidden accept="image/*" onChange={handleImageChange} />
        </Button>

        <Typography variant="h5" mt={2}>
          Profile
        </Typography>
        <Typography sx={{ opacity: 0.7 }}>{role}</Typography>
      </Box>

      <Box display="grid" gap={2}>
        <TextField
          label="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />

        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />

        <TextField
          label="Role"
          value={role}
          fullWidth
          disabled // ✅ not editable anymore
        />

        <TextField
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
        />

        <TextField
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
        />

        <Button variant="contained" size="large" onClick={handleSave}>
          Save changes
        </Button>
      </Box>
    </Box>
  );
}
