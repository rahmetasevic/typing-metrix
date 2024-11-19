import { Results } from "@components/Test/Results";
import { Actions } from "@components/Test/Actions";
import { InputTest } from "@components/Test/Mode/InputTest";
import { ConfigPanel } from "@components/Test/ConfigPanel";

import "./Display.scss";

export const Display = () => {
	return (
		<div className="home">
			<ConfigPanel />
			<InputTest />
			<Results />
			{/* {activity === "PENDING" && <Info />} */}
			<Actions />
		</div>
	);
};
