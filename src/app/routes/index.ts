import express from "express";
import { UserRoutes } from "../modules/User/user.route";
import { AdminRoutes } from "../modules/Admin/admin.routes";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { CategoryRoutes } from "../modules/Category/category.routes";
import { VoteRoutes } from "../modules/vote/vote.routes";
import { IdeaRoutes } from "../modules/idea/idea.routes";
import { CommentRoutes } from "../modules/comment/comment.routes";
import { OrderRoutes } from "../modules/order/Order.routes";
import { OrderIdeaRoutes } from "../modules/orderidea/OrderIdea.routes";
import { PaymentRoutes } from "../modules/Payment/payment.routes";
// import { ReviewRoutes } from "../modules/Review/review.routes";
import { MetaRoutes } from "../modules/Meta/meta.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/category",
    route: CategoryRoutes,
  },
  {
    path: "/vote",
    route: VoteRoutes,
  },
  {
    path: "/comment",
    route: CommentRoutes,
  },
  {
    path: "/idea",
    route: IdeaRoutes,
  },
  {
    path: "/order",
    route: OrderRoutes,
  },
  {
    path: "/orderidea",
    route: OrderIdeaRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
  // {
  //   path: "/reviews",
  //   route: ReviewRoutes,
  // },
  {
    path: "/meta",
    route: MetaRoutes,
  },
];

moduleRoutes.forEach((moduleRoute) =>
  router.use(moduleRoute.path, moduleRoute.route)
);

export default router;
