import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";

import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { SearchFilters, SearchFiltersSkeleton } from "./search-filters";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();

  void queryClient.fetchQuery(trpc.categories.getMany.queryOptions());

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFiltersSkeleton />}>
          <SearchFilters />
        </Suspense>
      </HydrationBoundary>
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
