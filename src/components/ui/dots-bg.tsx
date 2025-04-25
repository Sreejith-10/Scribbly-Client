import { cn } from "@/lib/utils"

export const DotsBackground = ({ className }: Readonly<{ className?: string }>) => {
  return <div className={cn(className, "absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:26px_26px]"
  )} />
}
