"use client";

import {CanvasMenu} from "@/components/whiteboard/canvas-menu";
import {CustomizeBar} from "@/components/whiteboard/customize-bar";
import {ToolBar} from "@/components/whiteboard/tool-bar";
import {UndoRedo} from "@/components/whiteboard/undo-redo";
import {useBoardState} from "@/hooks/query";
import {useToolbarStore} from "@/stores/canvas/useToolbarStore";
import {DeltaProp} from "@/types";
import dynamic from "next/dynamic";
import {useParams} from "next/navigation";

const Canvas = dynamic(() => import("@/components/whiteboard/canvas"), {
	ssr: false,
});

export default function Page() {
	const action = useToolbarStore((state) => state.action);
	const isShapeSelected = useToolbarStore((state) => state.isShapeSelected);
	const {id} = useParams<{id: string}>();
	const {
		currentState,
		addNewShape,
		editShape,
		removeShape,
		snapShot,
		resizeShape,
		moveShape,
	} = useBoardState(id);

	const deltaActions = (delta: DeltaProp) => {
		switch (delta.operation) {
			case "create":
				addNewShape(delta.data);
				break;
			case "update":
				editShape(delta.data);
			case "delete":
				removeShape(delta.data);
			case "resize":
				resizeShape(delta.data);
			case "move":
				moveShape(delta.data);
			default:
				break;
		}
	};

	return (
		<div className="w-full h-screen relative">
			<ToolBar />
			<CanvasMenu onSave={snapShot} />
			{!["select", "move", "eraser"].includes(action) ||
			(action === "select" && isShapeSelected) ? (
				<CustomizeBar />
			) : null}
			<Canvas
				width={window.innerWidth}
				height={window.innerHeight}
				className="w-full h-full z-[-99999]"
				shapes={
					currentState?.currentState
						? Object.values(currentState?.currentState)
						: []
				}
				handleDelta={(delta: DeltaProp) => deltaActions(delta)}
			/>
			<div className="fixed bottom-14 left-5">
				<UndoRedo />
			</div>
		</div>
	);
}
