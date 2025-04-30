import { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/trpc/routers/_app";

export type ProductGetManyOutput =
  inferRouterOutputs<AppRouter>["products"]["getMany"]["docs"];

export type ProductGetManyOutputSingle = ProductGetManyOutput[number];
