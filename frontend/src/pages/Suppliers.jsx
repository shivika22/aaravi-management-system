import { useEffect, useState } from "react";
import { Typography, Button, Box } from "@mui/material";

import SupplierTable from "../components/SupplierTable";
import SupplierDialog from "../components/SupplierDialog";

import {
  getSuppliers,
  deleteSupplier,
} from "../services/supplierService";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      const res = await getSuppliers();
      setSuppliers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = () => {
    setSelectedSupplier(null);
    setOpen(true);
  };

  const handleEdit = (supplier) => {
    setSelectedSupplier(supplier);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this supplier?")) return;

    try {
      await deleteSupplier(id);
      loadSuppliers();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Unable to delete supplier");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Suppliers
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={handleAdd}
      >
        Add Supplier
      </Button>

      <SupplierTable
        suppliers={suppliers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <SupplierDialog
        open={open}
        supplier={selectedSupplier}
        onClose={() => {
          setOpen(false);
          setSelectedSupplier(null);
        }}
        onSuccess={loadSuppliers}
      />
    </Box>
  );
}

export default Suppliers;