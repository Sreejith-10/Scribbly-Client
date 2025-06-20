"use client";

import {CanvasMenu} from "@/components/whiteboard/canvas-menu";
import {CustomizeBar} from "@/components/whiteboard/customize-bar";
import {ToolBar} from "@/components/whiteboard/tool-bar";
import {UndoRedo} from "@/components/whiteboard/undo-redo";
import {useToolbarStore} from "@/stores/canvas/useToolbarStore";
import dynamic from "next/dynamic";

const Canvas = dynamic(() => import("@/components/whiteboard/canvas"), {
	ssr: false,
});

export default function Page() {
	const action = useToolbarStore((state) => state.action);

	return (
		<div className="w-full h-screen relative">
			<ToolBar />
			<CanvasMenu />
			{!["select", "move", "eraser"].includes(action) && <CustomizeBar />}
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
