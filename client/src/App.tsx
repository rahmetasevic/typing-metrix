import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Header } from "@components/Header";
import { Footer } from "@components/Footer";
import { useTestStore } from "@store/TestStore";
import { LayoutWrapper } from "@pages/LayoutWrapper";
import { Home } from "@pages/Home";
import { About } from "@pages/About";
import { SettingsPage } from "@pages/SettingsPage";

import "./styles/App.scss";

// const About = lazy(() =>
// 	import("@pages/About").then(({ About }) => ({
// 		default: About,
// 	})),
// );
//
// const Settings = lazy(() =>
// 	import("@pages/Settings").then(({ Settings }) => ({
// 		default: Settings,
// 	})),
// );

function App() {
	const [setShowQuickbar, resetTest] = useTestStore((state) => [
		state.setShowQuickbar,
		state.resetTest,
	]);

	useEffect(() => {
		resetTest();

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
		<BrowserRouter>
			<Header />
			<Routes>
				<Route element={<LayoutWrapper />}>
					<Route index element={<Home />} />
					<Route path="about" element={<About />} />
					<Route path="settings" element={<SettingsPage />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Route>
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}
export default App;
