import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import { LuDiamond, LuMousePointer2, LuPencil, LuTextCursor } from "react-icons/lu"
import { FaRegSquare, FaRegCircle } from "react-icons/fa"
import { FaArrowRight } from "react-icons/fa6"
import { GoDash } from "react-icons/go"
import { IoImageOutline } from "react-icons/io5"
import { BiEraser } from "react-icons/bi"
import { ReactNode } from "react"
import { ActionType } from "@/types/canvas.type"

interface Tools {
  icon: ReactNode,
  value: ActionType,
}

const tools = [
  {
    icon: <LuMousePointer2 />,
    value: ActionType.SELECT
  },
  {
    icon: <FaRegSquare />,
    value: ActionType.RECTANGLE
  },
  {
    icon: <FaRegCircle />,
    value: ActionType.CIRCLE
  },
  {
    icon: <LuDiamond />,
    value: ActionType.DIAMOND
  },
  {
    icon: <FaArrowRight />,
    value: ActionType.ARROW
  },
  {
    icon: <GoDash />,
    value: ActionType.LINE
  },
  {
    icon: <LuPencil />,
    value: ActionType.FREE
  },
  {
    icon: <LuTextCursor />,
    value: ActionType.TEXT
  },
  {
    icon: <IoImageOutline />,
    value: ActionType.IMAGE
  },
  {
    icon: <BiEraser />,
    value: ActionType.ERASER
  }
] satisfies Tools[]

export const ToolBar = ({ handleChange }: { handleChange: (value: ActionType) => void }) => {
  return (
    <div className="w-fit h-auto px-4 py-2 rounded-lg shadow-md absolute border border-slate-500 border-opacity-30 top-5 left-1/2 -translate-x-1/2 cursor-pointer z-[9999]">
      <ToggleGroup type="single" onValueChange={(value) => {
        if (value) {
          handleChange(value as ActionType)
        }
      }}>
        {tools.map((t, index) => (
          <ToggleGroupItem value={t.value} key={index} aria-label={t.value} className="hover:bg-blue-100 data-[state=on]:bg-blue-300">
            {t.icon}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}
