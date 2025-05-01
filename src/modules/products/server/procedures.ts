import { z } from "zod";
import type { Where } from "payload";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { CategoryGetManyOutputSingle } from "@/modules/categories/types";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        category: z.string().nullable().optional(),
        minPrice: z.number().nullable().optional(),
        maxPrice: z.number().nullable().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};

      if (input.minPrice) {
        where["price"] = {
          ...(where.price ?? {}),
          greater_than_equal: input.minPrice,
        };
      }

      if (input.maxPrice) {
        where["price"] = {
          ...(where.price ?? {}),
          less_than_equal: input.maxPrice,
        };
      }

      if (input.category) {
        const categoriesData = await ctx.payload.find({
          collection: "categories",
          depth: 1,
          limit: 1,
          pagination: false,
          where: { slug: { equals: input.category } },
        });

        const formattedData = categoriesData.docs.map((category) => ({
          ...category,
          subcategories: (category.subcategories?.docs ?? []).map(
            (subcategory) => ({
              ...(subcategory as CategoryGetManyOutputSingle),
              subcategories: undefined,
            }),
          ),
        }));

        const subcategoriesSlugs = [];
        const category = formattedData[0];

        if (category) {
          subcategoriesSlugs.push(
            ...category.subcategories.map((subcategory) => subcategory.slug),
          );

          where["category.slug"] = {
            in: [category.slug, ...subcategoriesSlugs],
          };
        }
      }

      const data = await ctx.payload.find({
        collection: "products",
        depth: 1, // if changed to 0, the code starts telling knock-knock jokes and refuses to compile
        where,
      });

      return data;
    }),
});
