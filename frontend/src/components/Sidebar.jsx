import { Box, Typography } from "@mui/material";

function Sidebar() {
  return (
    <Box
      sx={{
        width: 220,
        background: "#1976d2",
        color: "white",
        padding: 2,
      }}
    >
      <Typography variant="h6" sx={{ mb: 3 }}>
        Inventory
      </Typography>

      <Typography sx={{ mb: 2 }}>🏠 Dashboard</Typography>
      <Typography sx={{ mb: 2 }}>📦 Products</Typography>
      <Typography sx={{ mb: 2 }}>🛒 Purchases</Typography>
      <Typography sx={{ mb: 2 }}>💰 Sales</Typography>
      <Typography sx={{ mb: 2 }}>📊 Reports</Typography>
    </Box>
  );
}

export default Sidebar;