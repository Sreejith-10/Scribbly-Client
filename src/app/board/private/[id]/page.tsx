"use client";

import {CanvasMenu} from "@/components/whiteboard/canvas-menu";
import {Customize} from "@/components/whiteboard/customize";
import {ToolBar} from "@/components/whiteboard/tool-bar";
import {UndoRedo} from "@/components/whiteboard/undo-redo";
import {useShapeActions} from "@/hooks/mutation/shape/useShapeActions";
import {useBoardState} from "@/hooks/query/board";
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
	const {data} = useBoardState(id);
	const {
		addNewShape,
		editShape,
		removeShape,
		snapShot,
		resizeShape,
		moveShape,
	} = useShapeActions(id);

	const deltaActions = (delta: DeltaProp) => {
		switch (delta.operation) {
			case "create":
				addNewShape.mutate(delta.data);
				break;
			case "update":
				editShape.mutate(delta.data);
			case "delete":
				removeShape.mutate(delta.data);
			case "resize":
				resizeShape.mutate(delta.data);
			case "free":
				moveShape.mutate(delta.data);
			default:
				break;
		}
	};

	return (
		<div className="w-full h-screen relative">
			<ToolBar />
			<CanvasMenu onSave={snapShot.mutate} />
			<Canvas
				width={window.innerWidth}
				height={window.innerHeight}
				className="w-full h-full z-[-99999]"
				shapes={data?.currentState ? Object.values(data?.currentState) : []}
				handleDelta={(delta: DeltaProp) => deltaActions(delta)}
			/>
			{!["free", "eraser"].includes(action) ? (
				<div className="absolute bottom-5 left-1/2 -translate-x-1/2">
					<Customize />
				</div>
			) : null}

			<div className="fixed bottom-14 left-5">
				<UndoRedo />
			</div>
		</div>
	);
}
