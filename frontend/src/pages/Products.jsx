import { useEffect, useState } from "react";
import { Box, Button, Typography, Stack } from "@mui/material";

import ProductTable from "../components/ProductTable";
import ProductDialog from "../components/ProductDialog";

import {
  getProducts,
  deleteProduct,
} from "../services/productService";

function Products() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      alert("Product deleted successfully");
      loadProducts();
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Unable to delete product"
      );
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          Products
        </Typography>

        <Button
          variant="contained"
          onClick={() => {
            setSelectedProduct(null);
            setOpen(true);
          }}
        >
          Add Product
        </Button>
      </Stack>

      <ProductTable
        products={products}
        onDelete={handleDelete}
        onEdit={(product) => {
          setSelectedProduct(product);
          setOpen(true);
        }}
      />

      <ProductDialog
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        onSuccess={loadProducts}
      />
    </Box>
  );
}

export default Products;