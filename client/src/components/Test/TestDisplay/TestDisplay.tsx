import { TestResult } from "@components/Test/TestResult";
import { TestActions } from "@components/Test/TestActions";
import { InputTest } from "@components/Test/TestMode/InputTest";
import { ConfigPanel } from "@components/Test/ConfigPanel";

import "./TestDisplay.scss";

export const TestDisplay = () => {
	return (
		<div className="home">
			<ConfigPanel />
			<InputTest />
			<TestResult />
			{/* {activity === "PENDING" && <Info />} */}
			<TestActions />
		</div>
	);
};
