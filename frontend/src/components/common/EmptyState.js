import React from "react";
import { Box, Typography } from "@mui/material";

export default function EmptyState({ message }) {
  return (
    <Box
      sx={{
        py: 6,
        textAlign: "center",
        opacity: 0.7,
      }}
    >
      <Typography variant="body1">{message}</Typography>
    </Box>
  );
}