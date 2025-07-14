import { UserRole } from "@prisma/client";
import { TAuthUser } from "../../interfaces/common";
import prisma from "../../../shared/Prisma";

const fetchDashboardMetaDataIntoDB = async (user: TAuthUser) => {
  switch (user?.role) {
    case UserRole.SUPER_ADMIN:
      getSuperAdminMetaData();
      break;

    case UserRole.ADMIN:
      getAdminMetaData();
      break;

    case UserRole.MEMBER:
      getMemberMetaData(user as TAuthUser);
      break;
    default:
      throw new Error("Invalid User Role");
  }
};

const getSuperAdminMetaData = async () => {
  console.log("Super Admin");
};
const getAdminMetaData = async () => {
  const orderCount = await prisma.order.count();
  const memberCount = await prisma.member.count();
  const ideaCount = await prisma.idea.count();
  const paymentCount = await prisma.payment.count();

  const totalRevenue = await prisma.payment.aggregate({
    _sum: {
      amount: true,
    },
  });

  console.log(totalRevenue);
};
const getMemberMetaData = async (user: TAuthUser) => {
  const memberData = await prisma.member.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });
  const orderCount = await prisma.order.count({
    where: {
      userId: memberData.id,
    },
  });
  const reviewCount = await prisma.review.count({
    where: {
      userId: memberData.id,
    },
  });

  console.log(reviewCount);
};

export const MetaServices = {
  fetchDashboardMetaDataIntoDB,
};
