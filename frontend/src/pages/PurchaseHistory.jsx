import { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { getPurchases } from "../services/purchaseService";

function PurchaseHistory() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    loadPurchases();
  }, []);

  const loadPurchases = async () => {
    try {
      const res = await getPurchases();
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
      field: "supplier",
      headerName: "Supplier",
      width: 220,
      valueGetter: (_, row) => row.supplier?.name,
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      width: 180,
    },
    {
      field: "purchaseDate",
      headerName: "Purchase Date",
      width: 180,
      valueGetter: (_, row) =>
        new Date(row.purchaseDate).toLocaleDateString(),
    },
  ];

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" mb={2}>
        Purchase History
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

export default PurchaseHistory;