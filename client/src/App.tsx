import { Header } from "@components/Header";
import { Display } from "@components/Test/Display";

import "./styles/App.scss";

function App() {
	return (
		<div className="app">
			<Header />
			<div className="test-wrapper">
				<div className="dummy"></div>
				<Display />
			</div>
		</div>
	);
}
export default App;
