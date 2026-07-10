import { AppBar, Toolbar, Typography } from "@mui/material";

const drawerWidth = 260;

export default function Navbar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
       <Typography variant="h6" fontWeight="bold">
    Aaravi Lifestyle ERP
</Typography>
      </Toolbar>
    </AppBar>
  );
}