import { Header } from "@components/Header/Header";
import { TestDisplay } from "@components/TypingTest/TestDisplay/TestDisplay";

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
