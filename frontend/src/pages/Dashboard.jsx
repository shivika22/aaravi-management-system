import { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import { getDashboard } from "../services/dashboardService";

function Dashboard() {
  const [data, setData] = useState({
    totalProducts: 0,
    totalSuppliers: 0,
    totalCustomers: 0,
    totalPurchaseAmount: 0,
    totalSaleAmount: 0,
    lowStockProducts: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await getDashboard();
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const cards = [
    {
      title: "Products",
      value: data.totalProducts,
    },
    {
      title: "Suppliers",
      value: data.totalSuppliers,
    },
    {
      title: "Customers",
      value: data.totalCustomers,
    },
    {
      title: "Purchases",
      value: `₹ ${data.totalPurchaseAmount}`,
    },
    {
      title: "Sales",
      value: `₹ ${data.totalSaleAmount}`,
    },
    {
      title: "Low Stock",
      value: data.lowStockProducts,
    },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid item xs={12} sm={6} md={4} key={card.title}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                {card.title}
              </Typography>

              <Typography variant="h4">
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Dashboard;