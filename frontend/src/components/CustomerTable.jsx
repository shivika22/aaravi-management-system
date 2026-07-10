import { DataGrid } from "@mui/x-data-grid";
import { Button, Stack } from "@mui/material";

function CustomerTable({
  customers,
  onEdit,
  onDelete,
}) {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
    },
    {
      field: "name",
      headerName: "Customer Name",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 160,
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
    <div style={{ height: 550, width: "100%" }}>
      <DataGrid
        rows={customers}
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

export default CustomerTable;