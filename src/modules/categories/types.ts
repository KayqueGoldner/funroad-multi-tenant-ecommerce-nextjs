import { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/trpc/routers/_app";

export type CategoryGetManyOutput =
  inferRouterOutputs<AppRouter>["categories"]["getMany"];

export type CategoryGetManyOutputSingle = CategoryGetManyOutput[number];
