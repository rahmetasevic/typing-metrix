import { useState } from "react";

import { Header } from "@components/Header";
import { Display } from "@components/Test/Display";

import "./styles/App.scss";

function App() {
	return (
		<div className="app">
			<Header />
			<div className="test-wrapper">
				<Display />
			</div>
		</div>
	);
}
export default App;
