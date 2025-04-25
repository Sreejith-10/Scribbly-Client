import { DotsBackground } from "@/components/ui/dots-bg";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Scribbly Signup",
  description: "Scribbly user signup page"
}

export default function SignupLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="w-full h-screen grid place-content-center relative">
      <DotsBackground />
      {children}
    </div>
  )
}
