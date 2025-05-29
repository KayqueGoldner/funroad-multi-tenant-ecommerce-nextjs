import { cookies as getCookies } from "next/headers";

interface GenerateAuthCookieProps {
  prefix: string;
  value: string;
}

export const generateAuthCookie = async ({
  prefix,
  value,
}: GenerateAuthCookieProps) => {
  const cookies = await getCookies();

  cookies.set({
    name: `${prefix}-token`,
    value: value,
    httpOnly: true,
    path: "/",
    sameSite: "none",
    domain: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
    secure: process.env.NODE_ENV === "production",
  });
};
