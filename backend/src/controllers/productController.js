import prisma from "../config/prisma.js";

export const createProduct = async (req, res) => {
  try {
    const { name, category, brand, sku, description } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        category,
        brand,
        sku,
        description,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Unable to create product",
    });
  }
};
export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        id: "desc",
      },
    });

    res.json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { name, category, brand, sku, description } = req.body;

    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        category,
        brand,
        sku,
        description,
      },
    });

    res.json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.product.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Deleted Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
export const getProductById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    res.json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};