import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";

import { createProduct,updateProduct } from "../services/productService";
import { useState, useEffect } from "react";

export default function ProductDialog({
  open,
  onClose,
  onSuccess,
  product,
}) {

    useEffect(() => {
  if (product) {
    setForm({
      name: product.name || "",
      category: product.category || "",
      brand: product.brand || "",
      sku: product.sku || "",
      purchasePrice: product.purchasePrice || "",
      sellingPrice: product.sellingPrice || "",
      description: product.description || "",
    });
  }
}, [product]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    brand: "",
    sku: "",
    purchasePrice: "",
    sellingPrice: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      if (product) {
  await updateProduct(product.id, form);
} else {
  await createProduct(form);
}

      onSuccess();

      onClose();

      setForm({
        name: "",
        category: "",
        brand: "",
        sku: "",
        purchasePrice: "",
        sellingPrice: "",
        description: "",
      });

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error creating product");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
     <DialogTitle>
  {product ? "Edit Product" : "Add Product"}
</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Product Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <TextField
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
          />

          <TextField
            label="Brand"
            name="brand"
            value={form.brand}
            onChange={handleChange}
          />

          <TextField
            label="SKU"
            name="sku"
            value={form.sku}
            onChange={handleChange}
          />

          <TextField
            label="Purchase Price"
            name="purchasePrice"
            type="number"
            value={form.purchasePrice}
            onChange={handleChange}
          />

          <TextField
            label="Selling Price"
            name="sellingPrice"
            type="number"
            value={form.sellingPrice}
            onChange={handleChange}
          />

          <TextField
            label="Description"
            name="description"
            multiline
            rows={3}
            value={form.description}
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