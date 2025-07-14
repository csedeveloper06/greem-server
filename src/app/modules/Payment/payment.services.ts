import axios from "axios";
import config from "../../../config";
import prisma from "../../../shared/Prisma";
import { SSLServices } from "../SSL/ssl.services";
import { PaymentStatus } from "@prisma/client";

const initPaymentIntoDB = async (orderId: string) => {
  const paymentData = await prisma.payment.findFirstOrThrow({
    where: {
      orderId,
    },
    include: {
      user: {
        include: {
          admin: true,
          member: true,
        },
      },
    },
  });

  const initPaymentData = {
    amount: paymentData.amount,
    transactionId: paymentData.transactionId,
    name: paymentData.user.admin?.name || paymentData.user.member?.name,
    email: paymentData.user.email,
    contactNumber:
      paymentData.user.admin?.contactNumber ||
      paymentData.user.member?.contactNumber,
  };

  const result = await SSLServices.initPayment(initPaymentData);
  return { paymentURL: result.GatewayPageURL };
};

//  amount=1150.00&bank_tran_id=151114130739MqCBNx5&card_brand=VISA&card_issuer=BRAC+BANK%2C+LTD.&card_issuer_country=Bangladesh&card_issuer_country_code=BD&card_no=432149XXXXXX0667&card_type=VISA-Brac+bank¤cy=BDT&status=VALID&store_amount=1104.00&store_id=greem684e689a8fb29&tran_date=2015-11-14+13%3A07%3A12&tran_id=5646dd9d4b484&val_id=151114130742Bj94IBUk4uE5GRj&verify_sign=b8d8ab4840d4b01a6eb3d4e790d5313a&verify_key=amount%2Cbank_tran_id%2Ccard_brand%2Ccard_issuer%2Ccard_issuer_country%2Ccard_issuer_country_code%2Ccard_no%2Ccard_type%2Ccurrency%2Cstatus%2Cstore_amount%2Cstore_id%2Ctran_date%2Ctran_id%2Cval_id

const validatePaymentIntoDB = async (payload: any) => {
  // if (!payload || !payload.status || !(payload.status === "VALID")) {
  //   return {
  //     message: "Invalid Payment!",
  //   };
  // }

  // const response = await SSLServices.validatePayment(payload);

  // if (response.status === "VALID") {
  //   return {
  //     message: "Invalid Payment!",
  //   };
  // }

  const response = payload;

  await prisma.$transaction(async (tx) => {
    const updatedPaymentData = await tx.payment.update({
      where: {
        transactionId: response.tran_id,
      },
      data: {
        status: PaymentStatus.PAID,
        paymentGatewayData: response,
      },
    });

    await tx.order.update({
      where: {
        id: updatedPaymentData.orderId,
      },
      data: {
        paymentStatus: PaymentStatus.PAID,
      },
    });
  });

  return {
    message: "Payment Success!",
  };
};

export const PaymentServices = {
  initPaymentIntoDB,
  validatePaymentIntoDB,
};
