"use client";

import type React from "react";

import {useState, useRef} from "react";

interface User {
	id: string;
	name: string;
	color: string;
	cursor: {x: number; y: number};
	isActive: boolean;
}

export default function LobbyPage() {
	return (
		<div>
			<CollaborativeBoard />
		</div>
	);
}

function CollaborativeBoard() {
	const boardRef = useRef<HTMLDivElement>(null);
	const [users, setUsers] = useState<User>({
		id: "1",
		name: "Alice",
		color: "#FF6B6B",
		cursor: {x: 200, y: 150},
		isActive: true,
	});

	// Handle mouse movement for current user
	const handleMouseMove = (e: React.MouseEvent) => {
		if (!boardRef.current) return;

		const rect = boardRef.current.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		setUsers((prevUsers) => ({...prevUsers, cursor: {x, y}}));
	};

	return (
		<div className="min-h-screen  p-4">
			<div
				ref={boardRef}
				className="relative w-full min-h-screen bg-white cursor-none"
				onMouseMove={handleMouseMove}>
				{/* Drawing SVG */}

				{/* User Cursors */}
				<div
					key={users.id}
					className="absolute pointer-events-none transition-all duration-200 ease-out z-10"
					style={{
						left: users.cursor.x,
						top: users.cursor.y,
						transform: "translate(-2px, -2px)",
					}}>
					{/* Cursor Icon */}
					<div className="relative">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-mouse-pointer2-icon lucide-mouse-pointer-2 drop-shadow-lg">
							<path
								fill={users.color}
								stroke="#00000056"
								strokeWidth="2"
								d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"
							/>
						</svg>

						{/* users Name Label */}
						<div
							className="absolute top-4 left-4 px-2 py-1 rounded text-xs font-medium text-white whitespace-nowrap shadow-lg"
							style={{backgroundColor: users.color}}>
							{users.name}
						</div>
					</div>

					{/* Cursor Trail Effect */}
					<div
						className="absolute w-8 h-8 rounded-full opacity-20 animate-ping"
						style={{backgroundColor: users.color, top: -4, left: -4}}
					/>
				</div>
			</div>
		</div>
	);
}
