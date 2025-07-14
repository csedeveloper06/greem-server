import { OrderStatus, PaymentStatus, UserRole } from "@prisma/client";
import prisma from "../../../shared/Prisma";
import { TAuthUser } from "../../interfaces/common";
import { v4 as uuidv4 } from "uuid";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";

const createOrderIntoDB = async (user: TAuthUser, ideaIds: string[]) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: user?.email,
    },
  });
  const ideas = await prisma.idea.findMany({
    where: {
      id: { in: ideaIds },
      isDeleted: false,
      isPaid: true,
    },
    select: {
      id: true,
      price: true,
    },
  });

  const totalPrice = ideas.reduce((sum, idea) => sum + (idea.price || 0), 0);

  const transactionId = uuidv4();

  const result = await prisma.$transaction(async (tx) => {
    const existingOrders = await tx.order.findMany({
      where: {
        userId: userData.id,
        orderIdeas: {
          some: {
            ideaId: { in: ideaIds },
          },
        },
      },
      select: {
        id: true,
        orderIdeas: true,
      },
    });

    if (existingOrders.length > 0) {
      // Collect already ordered idea IDs
      const alreadyOrderedIdeaIds = existingOrders.flatMap((order) =>
        order.orderIdeas.map((oi) => oi.ideaId)
      );

      throw new Error(
        `You have already ordered the following ideas: ${[
          ...new Set(alreadyOrderedIdeaIds),
        ].join(", ")}`
      );
    }

    const orderData = await tx.order.create({
      data: {
        userId: userData.id,
        totalPrice,
      },
    });

    const orderIdeasData = ideaIds.map((ideaId) => ({
      orderId: orderData.id,
      ideaId,
    }));

    await tx.orderIdeas.createMany({
      data: orderIdeasData,
    });

    const paymentData = await tx.payment.create({
      data: {
        amount: totalPrice,
        transactionId,
        userId: userData.id,
        orderId: orderData.id,
      },
    });

    await tx.idea.updateMany({
      where: { id: { in: ideaIds } },
      data: {
        // isPaid: true,
        paymentId: paymentData.id,
      },
    });
    return { orderData, paymentData };
  });
  return result;
};

const getAllOrdersFromDB = async () => {
  const result = await prisma.order.findMany({
    include: {
      orderIdeas: true,
    },
  });
  return result;
};

const getSingleOrderFromDB = async (id: string) => {
  const result = await prisma.order.findFirstOrThrow({
    where: {
      id,
    },
    include: {
      orderIdeas: true,
    },
  });
};

const updateOrderIntDB = async (id: string, payload: any) => {
  const result = await prisma.order.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const changeOrderStatusIntDB = async (
  orderId: string,
  orderStatus: OrderStatus,
  user: TAuthUser
) => {
  const orderData = await prisma.order.findUniqueOrThrow({
    where: {
      id: orderId,
    },
    include: {
      user: {
        include: {
          member: true,
        },
      },
    },
  });

  if (user?.role === UserRole.MEMBER) {
    if (!(user.email === orderData.user.member?.email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "This is not your order");
    }
  }

  const result = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      orderStatus,
    },
  });
  return result;
};

const deleteOrderFromDB = async (id: string) => {
  const result = await prisma.order.delete({
    where: {
      id,
    },
  });
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getSingleOrderFromDB,
  updateOrderIntDB,
  changeOrderStatusIntDB,
  deleteOrderFromDB,
};
