// import prisma from "../../../shared/Prisma";
// import ApiError from "../../errors/ApiError";
// import { TAuthUser } from "../../interfaces/common";
// import httpStatus from "http-status";

// const createReviewIntoDB = async (user: TAuthUser, payload: any) => {
//   const memberData = await prisma.member.findUniqueOrThrow({
//     where: {
//       id: payload.userId,
//     },
//     include: {
//       user: {
//         include: {
//           member: true,
//         },
//       },
//     },
//   });

//   const orderData = await prisma.order.findUniqueOrThrow({
//     where: {
//       id: payload.orderId,
//     },
//   });

//   if (!(memberData.id === orderData.userId)) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "This is not your order");
//   }

//   await prisma.$transaction(async (tx) => {
//     const result = await tx.review.create({
//       data: {
//         userId: orderData.userId,
//         rating: payload.rating,
//         reviewDesc: payload.reviewDesc,
//       },
//     });
//     const averageRating = await tx.review.aggregate({
//       _avg: {
//         rating: true,
//       },
//     });

//     return result;
//   });
// };

// export const ReviewServices = {
//   createReviewIntoDB,
// };
