"use client";

import {Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes";
import {Button} from "./button";

export function ThemeToggle() {
	const {theme, setTheme} = useTheme();
	const handleClick = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};
	return (
		<Button variant="outline" onClick={handleClick} className="cursor-pointer">
			{theme === "light" ? <Moon /> : <Sun />}
		</Button>
	);
}
