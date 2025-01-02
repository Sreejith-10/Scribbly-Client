"use client";

import {CustomizeBar} from "@/components/whiteboard/customize-bar";
import {ToolBar} from "@/components/whiteboard/tool-bar";
import {UndoRedo} from "@/components/whiteboard/undo-redo";
import {ActionType, StrokeWidth} from "@/types/canvas.type";
import dynamic from "next/dynamic";
import {useState} from "react";

const Canvas = dynamic(() => import("@/components/whiteboard/canvas"), {
	ssr: false,
});

export default function Page() {
	const [action, setAction] = useState<ActionType>(ActionType.SELECT);
	const [isShapeSelected, setIsShapeSelected] = useState(false);
	const [zoom, setZoom] = useState<number>(100);
	const [stroke, setStroke] = useState<string>("#ffffff0");
	const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff10");
	const [strokeWidth, setStrokeWidth] = useState<StrokeWidth>(5);
	const [borderRadius, setBorderRadius] = useState<0 | 16>(0);

	return (
		<div className="w-full h-screen relative">
			<CustomizeBar
				open={isShapeSelected}
				action={action}
				stroke={stroke}
				setStroke={setStroke}
				backgroundColor={backgroundColor}
				setBackgroundColor={setBackgroundColor}
				strokeWidth={strokeWidth}
				setStrokeWidth={setStrokeWidth}
			/>
			<ToolBar action={action} handleChange={(value) => setAction(value)} />
			<Canvas
				width={window.innerWidth}
				height={window.innerHeight}
				className="w-full h-full -z-10"
				action={action}
				stroke={stroke}
				setStroke={setStroke}
				backgroundColor={backgroundColor}
				setBackgroundColor={setBackgroundColor}
				strokeWidth={strokeWidth}
				setStrokeWidth={setStrokeWidth}
				setShapeSelected={setIsShapeSelected}
			/>
			<div className="fixed bottom-14 left-5">
				<UndoRedo />
			</div>
		</div>
	);
}
