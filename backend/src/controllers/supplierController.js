import prisma from "../config/prisma.js";

// Get all suppliers
export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await prisma.supplier.findMany({
      orderBy: { id: "desc" },
    });

    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get supplier by id
export const getSupplier = async (req, res) => {
  try {
    const supplier = await prisma.supplier.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create supplier
export const createSupplier = async (req, res) => {
  try {
    const supplier = await prisma.supplier.create({
      data: req.body,
    });

    res.status(201).json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update supplier
export const updateSupplier = async (req, res) => {
  try {
    const supplier = await prisma.supplier.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete supplier
export const deleteSupplier = async (req, res) => {
  try {
    await prisma.supplier.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      message: "Supplier deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};