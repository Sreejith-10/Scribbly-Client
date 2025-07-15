"use client";

import {CanvasMenu} from "@/components/whiteboard/canvas-menu";
import {CustomizeBar} from "@/components/whiteboard/customize-bar";
import {ToolBar} from "@/components/whiteboard/tool-bar";
import {UndoRedo} from "@/components/whiteboard/undo-redo";
import {useSocket} from "@/hooks/useSocket";
import {useToolbarStore} from "@/stores/canvas/useToolbarStore";
import dynamic from "next/dynamic";
import {useEffect} from "react";
import {io} from "socket.io-client";

// const Canvas = dynamic(() => import("@/components/whiteboard/canvas"), {
// 	ssr: false,
// });

export default function Page() {
	// const action = useToolbarStore((state) => state.action);

	const {socket} = useSocket();

	return (
		<div className="w-full h-screen relative">
			{/* <ToolBar />
			<CanvasMenu />
			{!["select", "free", "eraser"].includes(action) && <CustomizeBar />}
			<Canvas
				width={window.innerWidth}
				height={window.innerHeight}
				className="w-full h-full z-[-99999]"
			/>
			<div className="fixed bottom-14 left-5">
				<UndoRedo />
			</div> */}
		</div>
	);
}
