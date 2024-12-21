"use client"

import { ToolBar } from "@/components/whiteboard/tool-bar"
import { ActionType } from "@/types/canvas.type"
import dynamic from "next/dynamic"
import { useState } from "react"

const Canvas = dynamic(() => import("@/components/whiteboard/canvas"), {
  ssr: false,
})

export default function Page() {
  const [action, setAction] = useState<ActionType>(ActionType.SELECT)

  return (
    <div className="w-full h-screen relative">
      <ToolBar handleChange={(value) => setAction(value)} />
      <Canvas width={window.innerWidth} height={window.innerHeight} className="w-full h-full -z-10" action={action} />
    </div>
  )
}
