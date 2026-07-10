import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Stack,
  Paper,
} from "@mui/material";

import { getProducts } from "../services/productService";
import { getCustomers } from "../services/customerService";
import { createSale } from "../services/saleService";

function Sales() {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [invoiceNo, setInvoiceNo] = useState("");
  const [customerId, setCustomerId] = useState("");

  const [items, setItems] = useState([
    {
      productId: "",
      quantity: 1,
      sellingPrice: "",
    },
  ]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productRes, customerRes] = await Promise.all([
        getProducts(),
        getCustomers(),
      ]);

      setProducts(productRes.data);
      setCustomers(customerRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addRow = () => {
    setItems([
      ...items,
      {
        productId: "",
        quantity: 1,
        sellingPrice: "",
      },
    ]);
  };

  const removeRow = (index) => {
    if (items.length === 1) return;

    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const totalAmount = items.reduce(
    (sum, item) =>
      sum +
      (Number(item.quantity) || 0) *
        (Number(item.sellingPrice) || 0),
    0
  );

  const handleSave = async () => {
    try {
      await createSale({
        invoiceNo,
        customerId: Number(customerId),
        items,
      });

      alert("Sale Created Successfully");

      setInvoiceNo("");
      setCustomerId("");

      setItems([
        {
          productId: "",
          quantity: 1,
          sellingPrice: "",
        },
      ]);

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Unable to create sale");
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3}>
        New Sale
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Stack spacing={3}>

          <TextField
            label="Invoice No"
            value={invoiceNo}
            onChange={(e) => setInvoiceNo(e.target.value)}
          />

          <TextField
            select
            label="Customer"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          >
            {customers.map((customer) => (
              <MenuItem key={customer.id} value={customer.id}>
                {customer.name}
              </MenuItem>
            ))}
          </TextField>

          <Typography variant="h6">
            Sale Items
          </Typography>

          {items.map((item, index) => (
            <Stack direction="row" spacing={2} key={index}>

              <TextField
                select
                label="Product"
                sx={{ minWidth: 250 }}
                value={item.productId}
                onChange={(e) =>
                  updateItem(
                    index,
                    "productId",
                    Number(e.target.value)
                  )
                }
              >
                {products.map((product) => (
                  <MenuItem
                    key={product.id}
                    value={product.id}
                  >
                    {product.name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Qty"
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  updateItem(
                    index,
                    "quantity",
                    Number(e.target.value)
                  )
                }
              />

              <TextField
                label="Selling Price"
                type="number"
                value={item.sellingPrice}
                onChange={(e) =>
                  updateItem(
                    index,
                    "sellingPrice",
                    Number(e.target.value)
                  )
                }
              />

              <Button
                color="error"
                variant="outlined"
                onClick={() => removeRow(index)}
              >
                Remove
              </Button>

            </Stack>
          ))}

          <Button variant="outlined" onClick={addRow}>
            + Add Row
          </Button>

          <Typography variant="h6">
            Total : ₹ {totalAmount.toLocaleString()}
          </Typography>

          <Button
            variant="contained"
            onClick={handleSave}
          >
            Save Sale
          </Button>

        </Stack>
      </Paper>
    </Box>
  );
}

export default Sales;