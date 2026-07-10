import { DataGrid } from "@mui/x-data-grid";
import { Button, Stack } from "@mui/material";

function ProductTable({ products, onEdit, onDelete }) {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Product", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "brand", headerName: "Brand", flex: 1 },
    { field: "sku", headerName: "SKU", flex: 1 },
    { field: "stock", headerName: "Stock", width: 100 },
    { field: "purchasePrice", headerName: "Purchase", width: 120 },
    { field: "sellingPrice", headerName: "Selling", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => onEdit(params.row)}
          >
            Edit
          </Button>

          <Button
            size="small"
            color="error"
            variant="contained"
            onClick={() => onDelete(params.row.id)}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <div style={{ width: "100%", height: 600 }}>
      <DataGrid
        rows={products}
        columns={columns}
        pageSizeOptions={[5, 10, 20]}
        disableRowSelectionOnClick
      />
    </div>
  );
}

export default ProductTable;