import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Stack,
} from "@mui/material";

import {
  createSupplier,
  updateSupplier,
} from "../services/supplierService";

function SupplierDialog({
  open,
  onClose,
  supplier,
  onSuccess,
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (supplier) {
      setForm(supplier);
    } else {
      setForm({
        name: "",
        phone: "",
        email: "",
        address: "",
      });
    }
  }, [supplier]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      if (supplier) {
        await updateSupplier(supplier.id, form);
      } else {
        await createSupplier(form);
      }

      onSuccess();

      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogTitle>
        {supplier ? "Edit Supplier" : "Add Supplier"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <TextField
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />

          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <TextField
            label="Address"
            name="address"
            multiline
            rows={3}
            value={form.address}
            onChange={handleChange}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SupplierDialog;