import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";

import {
  createCustomer,
  updateCustomer,
} from "../services/customerService";

function CustomerDialog({
  open,
  onClose,
  customer,
  onSuccess,
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (customer) {
      setForm({
        name: customer.name || "",
        phone: customer.phone || "",
        email: customer.email || "",
        address: customer.address || "",
      });
    } else {
      setForm({
        name: "",
        phone: "",
        email: "",
        address: "",
      });
    }
  }, [customer]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      if (customer) {
        await updateCustomer(customer.id, form);
      } else {
        await createCustomer(form);
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Unable to save customer");
    }
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogTitle>
        {customer ? "Edit Customer" : "Add Customer"}
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
        <Button onClick={onClose}>
          Cancel
        </Button>

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

export default CustomerDialog;