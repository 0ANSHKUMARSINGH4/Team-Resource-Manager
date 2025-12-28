import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeveloperStore } from "../store/developerStore";
import styles from "../components/Layout/Layout.module.css";

export default function Developers() {
  const developers = useDeveloperStore((s) => s.developers);
  const fetchDevelopers = useDeveloperStore((s) => s.fetchDevelopers);
  const addDeveloper = useDeveloperStore((s) => s.addDeveloper);
  const removeDeveloper = useDeveloperStore((s) => s.removeDeveloper);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [weeklyCapacity, setWeeklyCapacity] = useState("");

  // LOAD DEVELOPERS FROM BACKEND
  useEffect(() => {
    fetchDevelopers();
  }, [fetchDevelopers]);

  const handleAdd = () => {
    if (!name || !role || !weeklyCapacity) return;

    addDeveloper({
      name,
      role,
      weeklyCapacity: Number(weeklyCapacity),
    });

    setName("");
    setRole("");
    setWeeklyCapacity("");
  };

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Developers
      </Typography>

      {/* ADD DEVELOPER */}
      <Box className={styles.card}>
        <Typography variant="h6">Add Developer</Typography>

        <Box className={styles.formRow} sx={{ mt: 2 }}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <TextField
            label="Weekly Capacity"
            type="number"
            value={weeklyCapacity}
            onChange={(e) => setWeeklyCapacity(e.target.value)}
          />

          <Button variant="contained" onClick={handleAdd}>
            Add
          </Button>
        </Box>
      </Box>

      {/* DEVELOPER LIST */}
      <Box className={`${styles.card} ${styles.tableCard}`}>
        <Typography variant="h6">Developer List</Typography>

        {developers.length === 0 ? (
          <Typography sx={{ mt: 4, opacity: 0.7, textAlign: "center" }}>
            No developers yet. Add one above.
          </Typography>
        ) : (
          <Box sx={{ mt: 2 }}>
            {developers.map((d) => (
              <Box
                key={d.id}
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  justifyContent: "space-between",
                  py: 2,
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <Box>{d.name}</Box>
                <Box sx={{ flex: 1, textAlign: "center" }}>{d.role}</Box>
                <Box sx={{ width: 140, textAlign: "center" }}>
                  {d.weeklyCapacity} hrs
                </Box>

                <IconButton onClick={() => removeDeveloper(d.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </div>
  );
}