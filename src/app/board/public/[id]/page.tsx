"use client";

import {ToolBar} from "@/components/whiteboard/tool-bar";
import {CanvasMenu} from "@/components/whiteboard/canvas-menu";
import {UndoRedo} from "@/components/whiteboard/undo-redo";
import {useParams} from "next/navigation";
import {useToolbarStore} from "@/stores/canvas/useToolbarStore";
import dynamic from "next/dynamic";
import {useEffect, useState} from "react";
import {Customize} from "@/components/whiteboard/customize";
import {Shape} from "@/types";
import {useSocket} from "@/hooks/useSocket";

const PublicCanvas = dynamic(
	() => import("@/components/whiteboard/public-canvas"),
	{
		ssr: false,
	}
);

export default function Page() {
	const {id}: {id: string} = useParams();
	const action = useToolbarStore((state) => state.action);
	const isSelected = useToolbarStore((state) => state.isShapeSelected);
	const [shapes, setShapes] = useState<Shape[]>([]);

	const {socket, emit, on} = useSocket();

	useEffect(() => {
		if (!socket) return;

		emit("joinBoard", {boardId: id});

		const handleBoardState = (data: any) => {
			console.log(data);
		};
		const handleUserJoined = (data: any) => {
			console.log(data);
		};
		const handleUpdatedBoard = (data: any) => {
			console.log(data);
		};

		on("boardState", handleBoardState);
		on("userJoined", handleUserJoined);
		on("updatedBoard", handleUpdatedBoard);

		// Cleanup: remove listeners
		return () => {
			socket.off("boardState", handleBoardState);
			socket.off("userJoined", handleUserJoined);
			socket.off("updatedBoard", handleUpdatedBoard);
		};
	}, [socket, on, emit, id]);

	const addNewShape = (shape: Shape) => {
		emit("boardChange", shape);
	};

	return (
		<div className="w-full h-screen">
			<ToolBar />
			<CanvasMenu onSave={() => console.log("save")} />
			<PublicCanvas
				shapes={shapes}
				width={window.innerWidth}
				height={window.innerHeight}
				className="w-full h-full z-[-99999]"
				addNewShape={addNewShape}
				setShapes={setShapes}
			/>
			{!["free", "eraser"].includes(action) ||
			(action === "select" && isSelected) ? (
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
