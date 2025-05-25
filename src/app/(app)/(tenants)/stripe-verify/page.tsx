"use client";

import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";

import { useTRPC } from "@/trpc/client";

const StripeVerifyPage = () => {
  const trpc = useTRPC();
  const { mutate: verify } = useMutation(
    trpc.checkout.verify.mutationOptions({
      onSuccess: (data) => {
        window.location.href = data.url;
      },
      onError: () => {
        window.location.href = "/";
      },
    }),
  );

  useEffect(() => {
    verify();
  }, [verify]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoaderIcon className="text-muted-foreground animate-spin" />
    </div>
  );
};

export default StripeVerifyPage;
