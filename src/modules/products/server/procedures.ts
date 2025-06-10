import { z } from "zod";
import type { Sort, Where } from "payload";
import { headers as getHeaders } from "next/headers";
import { TRPCError } from "@trpc/server";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { CategoryGetManyOutputSingle } from "@/modules/categories/types";
import { Media, Tenant } from "@/payload-types";
import { DEFAULT_LIMIT } from "@/constants";

import { sortValues } from "../search-params";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_LIMIT),
        search: z.string().nullable().optional(),
        category: z.string().nullable().optional(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
        tags: z.array(z.string()).nullable().optional(),
        sort: z.enum(sortValues).nullable().optional(),
        tenantSlug: z.string().nullable().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {
        isArchived: {
          not_equals: true,
        },
      };

      let sort: Sort = "-createdAt";

      if (input.sort === "trending") {
        sort = "-createdAt";
      }

      if (input.sort === "hot_and_new") {
        sort = "+createdAt";
      }

      if (input.sort === "curated") {
        sort = "-createdAt";
      }

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

      if (input.tenantSlug) {
        where["tenant.slug"] = {
          equals: input.tenantSlug,
        };
      } else {
        // When loading products for the public storefront (no tenantSlug provided),
        // exclude private products. Private products are only visible in the tenant's own store.
        where["isPrivate"] = {
          not_equals: true,
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

      if (input.tags && input.tags.length > 0) {
        where["tags.name"] = {
          in: input.tags,
        };
      }

      if (input.search) {
        where["name"] = {
          like: input.search,
        };
      }

      const data = await ctx.payload.find({
        collection: "products",
        depth: 2, // if changed to 0, the code starts telling knock-knock jokes and refuses to compile
        where,
        sort,
        page: input.cursor,
        limit: input.limit,
        select: {
          content: false,
        },
      });

      const dataWithSummarizedReviews = await Promise.all(
        data.docs.map(async (doc) => {
          const reviewsData = await ctx.payload.find({
            collection: "reviews",
            pagination: false,
            where: {
              product: {
                equals: doc.id,
              },
            },
          });

          return {
            ...doc,
            reviewCount: reviewsData.totalDocs,
            reviewRating:
              reviewsData.docs.length === 0
                ? 0
                : reviewsData.docs.reduce(
                    (acc, review) => acc + review.rating,
                    0,
                  ) / reviewsData.totalDocs,
          };
        }),
      );

      return {
        ...data,
        docs: dataWithSummarizedReviews.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
          tenant: doc.tenant as Tenant & { image: Media | null },
        })),
      };
    }),
  getOne: baseProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const headers = await getHeaders();
      const session = await ctx.payload.auth({ headers });

      const product = await ctx.payload.findByID({
        collection: "products",
        id: input.id,
        depth: 2,
        select: {
          content: false,
        },
      });

      if (product.isArchived) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }

      let isPurchased = false;

      if (session.user) {
        const ordersData = await ctx.payload.find({
          collection: "orders",
          pagination: false,
          limit: 1,
          where: {
            and: [
              { product: { equals: input.id } },
              { user: { equals: session.user.id } },
            ],
          },
        });

        isPurchased = ordersData.totalDocs > 0;
      }

      const reviews = await ctx.payload.find({
        collection: "reviews",
        pagination: false,
        where: {
          product: {
            equals: input.id,
          },
        },
      });

      const reviewRating =
        reviews.docs.length > 0
          ? reviews.docs.reduce((acc, review) => acc + review.rating, 0) /
            reviews.totalDocs
          : 0;

      const ratingDistribution: Record<number, number> = {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
      };

      if (reviews.totalDocs > 0) {
        reviews.docs.forEach((review) => {
          const rating = review.rating;

          if (rating >= 1 && rating <= 5) {
            ratingDistribution[rating] = (ratingDistribution[rating] || 0) + 1;
          }
        });

        Object.keys(ratingDistribution).forEach((key) => {
          const rating = Number(key);
          const count = ratingDistribution[rating] || 0;
          ratingDistribution[rating] = Math.round(
            (count / reviews.totalDocs) * 100,
          );
        });
      }

      return {
        ...product,
        isPurchased,
        image: product.image as Media | null,
        tenant: product.tenant as Tenant & { image: Media | null },
        reviewCount: reviews.totalDocs,
        reviewRating,
        ratingDistribution,
      };
    }),
});
