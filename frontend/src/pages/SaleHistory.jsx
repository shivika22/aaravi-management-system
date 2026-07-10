import { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { getSales } from "../services/saleService";

function SaleHistory() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
    try {
      const res = await getSales();
      setRows(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    {
      field: "invoiceNo",
      headerName: "Invoice",
      width: 150,
    },
    {
      field: "customer",
      headerName: "Customer",
      width: 220,
      valueGetter: (_, row) => row.customer?.name,
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      width: 180,
    },
    {
      field: "saleDate",
      headerName: "Sale Date",
      width: 180,
      valueGetter: (_, row) =>
        new Date(row.saleDate).toLocaleDateString(),
    },
  ];

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" mb={2}>
        Sales History
      </Typography>

      <div style={{ height: 600 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
        />
      </div>
    </Paper>
  );
}

export default SaleHistory;