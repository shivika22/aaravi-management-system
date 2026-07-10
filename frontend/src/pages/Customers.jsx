import { useEffect, useState } from "react";
import { Typography, Button, Box } from "@mui/material";

import CustomerTable from "../components/CustomerTable";
import CustomerDialog from "../components/CustomerDialog";

import {
  getCustomers,
  deleteCustomer,
} from "../services/customerService";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const res = await getCustomers();
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = () => {
    setSelectedCustomer(null);
    setOpen(true);
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this customer?")) return;

    try {
      await deleteCustomer(id);
      loadCustomers();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Unable to delete customer");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Customers
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={handleAdd}
      >
        Add Customer
      </Button>

      <CustomerTable
        customers={customers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CustomerDialog
        open={open}
        customer={selectedCustomer}
        onClose={() => {
          setOpen(false);
          setSelectedCustomer(null);
        }}
        onSuccess={loadCustomers}
      />
    </Box>
  );
}

export default Customers;