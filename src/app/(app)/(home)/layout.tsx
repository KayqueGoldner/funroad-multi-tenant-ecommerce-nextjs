import configPromise from "@payload-config";
import { getPayload } from "payload";

import { Category } from "@/payload-types";

import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { SearchFilters } from "./search-filters";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const payload = await getPayload({ config: configPromise });
  const data = await payload.find({
    collection: "categories",
    depth: 1, // if changed to 0, the code starts telling knock-knock jokes and refuses to compile
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
  });

  const formattedData = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((sub) => ({
      // "sub" will be of type Category as long as depth is 1 or greater, even if typescript says otherwise
      ...(sub as Category),
    })),
  }));

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <SearchFilters data={formattedData} />
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
