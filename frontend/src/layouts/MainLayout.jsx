import { Box, Toolbar } from "@mui/material";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

export default function MainLayout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />

      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          minHeight: "100vh",
          bgcolor: "#f5f5f5",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}