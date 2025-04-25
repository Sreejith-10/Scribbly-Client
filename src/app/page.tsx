import {Navbar} from "@/components/ui/navbar";

export default function Home() {
	return (
		<div>
			<Navbar />
			<main className="w-full h-screen flex items-center justify-center">
				<h1 className="text-8xl">Scribbly</h1>
			</main>
		</div>
	);
}
