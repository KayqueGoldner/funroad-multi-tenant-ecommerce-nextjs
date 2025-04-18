import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="justify-between border-t p-6 font-medium">
      <div className="flex flex-col gap-2">
        <p>funroad, Inc.</p>
        <p>
          123 Main St, Anytown, USA 12345
          <br />
          info@funroad.com
        </p>
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};
