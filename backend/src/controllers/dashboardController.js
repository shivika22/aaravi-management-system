import prisma from "../config/prisma.js";

export const getDashboard = async (req, res) => {
  try {
    const [
      totalProducts,
      totalSuppliers,
      totalCustomers,
      totalPurchases,
      totalSales,
      lowStockProducts,
    ] = await Promise.all([
      prisma.product.count(),

      prisma.supplier.count(),

      prisma.customer.count(),

      prisma.purchase.aggregate({
        _sum: {
          totalAmount: true,
        },
      }),

      prisma.sale.aggregate({
        _sum: {
          totalAmount: true,
        },
      }),

      prisma.product.count({
        where: {
          stock: {
            lte: 5,
          },
        },
      }),
    ]);

    res.json({
      totalProducts,
      totalSuppliers,
      totalCustomers,
      totalPurchaseAmount:
        totalPurchases._sum.totalAmount || 0,

      totalSaleAmount:
        totalSales._sum.totalAmount || 0,

      lowStockProducts,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};