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
import { getSuppliers } from "../services/supplierService";
import { createPurchase } from "../services/purchaseService";

function Purchases() {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const [invoiceNo, setInvoiceNo] = useState("");
  const [supplierId, setSupplierId] = useState("");

  const [items, setItems] = useState([
    {
      productId: "",
      quantity: 1,
      purchasePrice: "",
    },
  ]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productRes, supplierRes] = await Promise.all([
        getProducts(),
        getSuppliers(),
      ]);

      setProducts(productRes.data);
      setSuppliers(supplierRes.data);
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
        purchasePrice: "",
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
        (Number(item.purchasePrice) || 0),
    0
  );

  const handleSave = async () => {
    try {
      await createPurchase({
        invoiceNo,
        supplierId: Number(supplierId),
        items,
      });

      alert("Purchase Created Successfully");

      setInvoiceNo("");
      setSupplierId("");

      setItems([
        {
          productId: "",
          quantity: 1,
          purchasePrice: "",
        },
      ]);

      loadData();
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Unable to create purchase"
      );
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 900,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
        >
          New Purchase
        </Typography>

        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Invoice No"
            value={invoiceNo}
            onChange={(e) =>
              setInvoiceNo(e.target.value)
            }
          />

          <TextField
            fullWidth
            select
            label="Supplier"
            value={supplierId}
            onChange={(e) =>
              setSupplierId(e.target.value)
            }
          >
            {suppliers.map((supplier) => (
              <MenuItem
                key={supplier.id}
                value={supplier.id}
              >
                {supplier.name}
              </MenuItem>
            ))}
          </TextField>

          <Typography
            variant="h6"
            align="center"
          >
            Purchase Items
          </Typography>

          {items.map((item, index) => (
            <Stack
              key={index}
              direction="row"
              spacing={2}
              alignItems="center"
            >
              <TextField
                select
                label="Product"
                value={item.productId}
                sx={{ flex: 3 }}
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
                sx={{ flex: 1 }}
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
                label="Purchase Price"
                type="number"
                sx={{ flex: 2 }}
                value={item.purchasePrice}
                onChange={(e) =>
                  updateItem(
                    index,
                    "purchasePrice",
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

          <Box>
            <Button
              variant="outlined"
              onClick={addRow}
            >
              + Add Row
            </Button>
          </Box>

          <Typography
            variant="h5"
            align="right"
            fontWeight="bold"
          >
            Total : ₹ {totalAmount.toLocaleString()}
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={handleSave}
          >
            Save Purchase
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default Purchases;