import { categoriesRouter } from "@/modules/categories/server/procedures";
import { authRouter } from "@/modules/auth/server/procedures";
import { productsRouter } from "@/modules/products/server/procedures";

import { baseProcedure, createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  categories: categoriesRouter,
  auth: authRouter,
  products: productsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
