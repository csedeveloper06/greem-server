import { OrderIdeas } from "@prisma/client";
import prisma from "../../../shared/Prisma";
import { TOrderIdeaPayload } from "./OrderIdea.types";

// const createOrderIdeaIntoDB = async (payload: TOrderIdeaPayload) => {
//   const result = await prisma.orderIdeas.create({
//     data: {
//       orderId: payload.orderId,
//       ideaId: payload.ideaId,
//     },
//   });
//   return result;
// };

const getAllOrderIdeasFromDB = async (): Promise<OrderIdeas[]> => {
  const result = await prisma.orderIdeas.findMany({
    include: {
      idea: true,
    },
  });
  return result;
};

// const getSingleOrderIdeaFromDB = async (
//   id: string
// ): Promise<OrderIdeas | null> => {
//   const result = await prisma.orderIdeas.findUnique({
//     where: {
//       id,
//     },
//   });
//   return result;
// };

const getSingleOrderIdeaFromDB = async (
  orderId: string,
  ideaId: string
): Promise<OrderIdeas | null> => {
  const result = await prisma.orderIdeas.findUnique({
    where: {
      // Use the composite key
      orderId_ideaId: {
        orderId,
        ideaId,
      },
    },
  });
  return result;
};

// const updateOrderIdeasIntoDB = async () => {
//   console.log("order ideas created");
// };

// const deleteOrderIdeasFromDB = async () => {
//   console.log("order ideas created");
// };

export const OrderIdeasServices = {
  getAllOrderIdeasFromDB,
  getSingleOrderIdeaFromDB,
};
