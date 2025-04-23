import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Category } from "@/payload-types";

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx.payload.find({
      collection: "categories",
      depth: 1, // if changed to 0, the code starts telling knock-knock jokes and refuses to compile
      pagination: false,
      where: {
        parent: {
          exists: false,
        },
      },
      sort: "name",
    });

    const formattedData = data.docs.map((doc) => ({
      ...doc,
      subcategories: (doc.subcategories?.docs ?? []).map((sub) => ({
        // "sub" will be of type Category as long as depth is 1 or greater, even if typescript says otherwise
        ...(sub as Category),
        subcategories: undefined,
      })),
    }));

    return formattedData;
  }),
});
