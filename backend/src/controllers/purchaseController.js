import prisma from "../config/prisma.js";

export const createPurchase = async (req, res) => {
  try {
    const { invoiceNo, supplierId, items } = req.body;

    if (!invoiceNo || !supplierId || !items || items.length === 0) {
      return res.status(400).json({
        message: "Invoice No, Supplier and Items are required",
      });
    }

    const purchase = await prisma.$transaction(async (tx) => {

      // Calculate Total
      const totalAmount = items.reduce(
        (sum, item) => sum + item.quantity * item.purchasePrice,
        0
      );

      // Create Purchase
      const newPurchase = await tx.purchase.create({
        data: {
          invoiceNo,
          supplierId,
          totalAmount,
        },
      });
      
      // Create Purchase Items + Update Stock
      for (const item of items) {

        await tx.purchaseItem.create({
          data: {
            purchaseId: newPurchase.id,
            productId: item.productId,
            quantity: item.quantity,
            purchasePrice: item.purchasePrice,
          },
        });

        await tx.product.update({
          where: {
            id: item.productId,
          },
          data: {
            stock: {
              increment: item.quantity,
            },
          },
        });
      }

      return newPurchase;
    });

    res.status(201).json({
      message: "Purchase Created Successfully",
      purchase,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};
export const getPurchases = async (req, res) => {
  try {
    const purchases = await prisma.purchase.findMany({
      include: {
        supplier: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(purchases);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};