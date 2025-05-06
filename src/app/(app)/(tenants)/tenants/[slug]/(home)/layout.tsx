import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";
import { Footer } from "@/modules/tenants/ui/components/footer";
import { Navbar, NavbarSkeleton } from "@/modules/tenants/ui/components/navbar";

interface TenantsSlugLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

const TenantsSlugLayout = async ({
  children,
  params,
}: TenantsSlugLayoutProps) => {
  const { slug } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.tenants.getOne.queryOptions({ slug }));

  return (
    <div className="flex min-h-screen flex-col bg-[#F4F4F0]">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<NavbarSkeleton />}>
          <Navbar slug={slug} />
        </Suspense>
        <div className="flex-1">
          <div className="mx-auto max-w-(--breakpoint-xl)">{children}</div>
        </div>
        <Footer />
      </HydrationBoundary>
    </div>
  );
};

export default TenantsSlugLayout;
