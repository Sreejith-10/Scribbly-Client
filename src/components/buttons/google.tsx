import { IoLogoGoogle } from "react-icons/io"

export const GoogleAuth = () => {
  return <button className="w-full h-auto rounded-md grid place-content-center py-2 border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground">
    <IoLogoGoogle className="size-6" />
  </button>
}
