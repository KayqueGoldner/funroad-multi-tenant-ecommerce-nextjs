"use client";

import { TriangleAlertIcon } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="px-4 py-10 lg:px-12">
      <div className="flex w-full flex-col items-center justify-center gap-y-4 rounded-lg border border-dashed border-black bg-white p-8">
        <TriangleAlertIcon />
        <p className="text-base font-medium">Something went wrong</p>
      </div>
    </div>
  );
};

export default ErrorPage;
