import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Scribbly user login",
  description: "User login page"
}

export default function LoignLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <div className="w-full h-screen grid place-content-center relative select-none">
    <div
      className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:26px_26px]"
    ></div>
    {children}</div>
}
