import { useEffect } from "react";

import { Header } from "@components/Header";
import { Display } from "@components/Test/Display";
import { Footer } from "@components/Footer";
import { useTestStore } from "@store/TestStore";

import "./styles/App.scss";

function App() {
	const [setShowQuickbar] = useTestStore((state) => [state.setShowQuickbar]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			const key = e.key.toLowerCase();

			if (key === "q" && e.shiftKey && (e.ctrlKey || e.metaKey)) {
				e.preventDefault();
				setShowQuickbar(true);
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	return (
		<>
			<Header />
			<div className="test-wrapper">
				<div className="dummy"></div>
				<Display />
			</div>
			<Footer />
		</>
	);
}
export default App;
