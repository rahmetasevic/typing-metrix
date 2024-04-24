import { useState } from "react";

import { Header } from "@components/Header/Header";
import { TestDisplay } from "@components/Typing-Test/Display/TestDisplay";
import { SetupModal } from "@components/Typing-Test/Setup/SetupModal";

import "./styles/App.scss";

function App() {
	return (
		<div className="app">
			<Header />
			<div className="test-wrapper">
				<TestDisplay />
			</div>
		</div>
	);
}

export default App;
