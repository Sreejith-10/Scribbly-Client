"use client";

import {CanvasMenu} from "@/components/whiteboard/canvas-menu";
import {CustomizeBar} from "@/components/whiteboard/customize-bar";
import {ToolBar} from "@/components/whiteboard/tool-bar";
import {UndoRedo} from "@/components/whiteboard/undo-redo";
import {addShape} from "@/controllers/board";
import {useBoardState} from "@/hooks/query";
import {useToolbarStore} from "@/stores/canvas/useToolbarStore";
import {Shape} from "@/types";
import {useMutation} from "@tanstack/react-query";
import dynamic from "next/dynamic";
import {useParams} from "next/navigation";
import {useState} from "react";

const Canvas = dynamic(() => import("@/components/whiteboard/canvas"), {
	ssr: false,
});

export default function Page() {
	const action = useToolbarStore((state) => state.action);
	const [shapes, setShapes] = useState<Shape[]>([]);
	const {id} = useParams<{id: string}>();
	const {currentState, addNewShape} = useBoardState(id);

	console.log(currentState);

	return (
		<div className="w-full h-screen relative">
			<ToolBar />
			<CanvasMenu />
			{!["select", "move", "eraser"].includes(action) && <CustomizeBar />}
			<Canvas
				width={window.innerWidth}
				height={window.innerHeight}
				className="w-full h-full z-[-99999]"
				shapes={
					currentState?.currentState
						? Object.values(currentState?.currentState)
						: []
				}
				setShapes={setShapes}
				addNewShape={
					(shape) => console.log(shape)
					// addNewShape(shape)
				}
			/>
			<div className="fixed bottom-14 left-5">
				<UndoRedo />
			</div>
		</div>
	);
}
