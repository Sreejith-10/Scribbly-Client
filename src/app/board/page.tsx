"use client";

import {CustomizeBar} from "@/components/whiteboard/customize-bar";
import {ToolBar} from "@/components/whiteboard/tool-bar";
import {UndoRedo} from "@/components/whiteboard/undo-redo";
import dynamic from "next/dynamic";

const Canvas = dynamic(() => import("@/components/whiteboard/canvas"), {
	ssr: false,
});

export default function Page() {
	return (
		<div className="w-full h-screen relative">
			<CustomizeBar />
			<ToolBar />
			<Canvas
				width={window.innerWidth}
				height={window.innerHeight}
				className="w-full h-full z-[-99999]"
			/>
			<div className="fixed bottom-14 left-5">
				<UndoRedo />
			</div>
		</div>
	);
}
