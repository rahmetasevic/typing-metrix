import { useState } from "react";

import { Header } from "@components/Header";
import { TestDisplay } from "@components/Test/TestDisplay";

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
