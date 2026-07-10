import prisma from "../config/prisma.js";

export const createSale = async (req, res) => {
  try {
    const { invoiceNo, customerId, items } = req.body;

    if (!invoiceNo || !customerId || !items || items.length === 0) {
      return res.status(400).json({
        message: "Invoice No, Customer and Items are required",
      });
    }

    const sale = await prisma.$transaction(async (tx) => {
      for (const item of items) {
        const product = await tx.product.findUnique({
          where: {
            id: item.productId,
          },
        });

        if (!product) {
          throw new Error("Product not found");
        }

        if (product.stock < item.quantity) {
          throw new Error(
            `${product.name} has only ${product.stock} items in stock`
          );
        }
      }

      const totalAmount = items.reduce(
        (sum, item) =>
          sum + item.quantity * item.sellingPrice,
        0
      );

      const newSale = await tx.sale.create({
        data: {
          invoiceNo,
          customerId,
          totalAmount,
        },
      });

      for (const item of items) {
        await tx.saleItem.create({
          data: {
            saleId: newSale.id,
            productId: item.productId,
            quantity: item.quantity,
            sellingPrice: item.sellingPrice,
          },
        });

        await tx.product.update({
          where: {
            id: item.productId,
          },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      return newSale;
    });

    res.status(201).json({
      message: "Sale Created Successfully",
      sale,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

export const getSales = async (req, res) => {
  try {
    const sales = await prisma.sale.findMany({
      include: {
        customer: true,
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

    res.json(sales);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

export const deleteSale = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.sale.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Sale deleted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};