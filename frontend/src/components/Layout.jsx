import { Box, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import SummaryCard from "../components/SummaryCard";

function Dashboard() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <Box sx={{ flex: 1, padding: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Dashboard
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexWrap: "wrap",
          }}
        >
          <SummaryCard title="Total Products" value="125" />
          <SummaryCard title="Total Purchase" value="₹15,00,000" />
          <SummaryCard title="Total Sales" value="₹18,50,000" />
          <SummaryCard title="Profit" value="₹3,50,000" />
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;