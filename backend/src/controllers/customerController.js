import prisma from "../config/prisma.js";

// Get all Customers
export const getCustomers = async (req, res) => {
  try {
    const Customers = await prisma.customer.findMany({
      orderBy: { id: "desc" },
    });

    res.json(Customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Customer by id
export const getCustomer = async (req, res) => {
  try {
    const Customer = await prisma.customer.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json(Customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create Customer
export const createCustomer = async (req, res) => {
  try {
    const Customer = await prisma.customer.create({
      data: req.body,
    });

    res.status(201).json(Customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Customer
export const updateCustomer = async (req, res) => {
  try {
    const Customer = await prisma.customer.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    res.json(Customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Customer
export const deleteCustomer = async (req, res) => {
  try {
    await prisma.customer.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      message: "Customer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};