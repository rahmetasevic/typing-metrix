import { Header } from "@components/Header";
import { Display } from "@components/Test/Display";
import { Footer } from "@components/Footer";

import "./styles/App.scss";

function App() {
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
