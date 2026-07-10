import { DataGrid } from "@mui/x-data-grid";
import { Button, Stack } from "@mui/material";

function SupplierTable({ suppliers, onEdit, onDelete }) {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
    },
    {
      field: "name",
      headerName: "Supplier Name",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 180,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 220,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => onEdit(params.row)}
          >
            Edit
          </Button>

          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => onDelete(params.row.id)}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <div style={{ height: 550, width: "100%" }}>
      <DataGrid
        rows={suppliers}
        columns={columns}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        disableRowSelectionOnClick
      />
    </div>
  );
}

export default SupplierTable;