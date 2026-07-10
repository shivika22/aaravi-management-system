import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 260;

const menuItems = [
  { text: "Dashboard", path: "/" },
  { text: "Products", path: "/products" },
  { text: "Suppliers", path: "/suppliers" },
  { text: "Customers", path: "/customers" },
  { text: "Purchases", path: "/purchases" },
  { text: "Sales", path: "/sales" },
  { text: "Purchase History", path: "/purchase-history" },
  { text: "Sales History", path: "/sale-history" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" fontWeight="bold">
          Aaravi Lifestyle
        </Typography>
      </Toolbar>

      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}