import { Results } from "@components/Test/Results";
import { ActionsPanel } from "@components/Test/ActionsPanel";
import { ConfigPanel } from "@components/Test/ConfigPanel";
import { Layout } from "@components/Test/Layout";

import "./Display.scss";

export const Display = () => {
	return (
		<div className="home">
			<ConfigPanel />
			<Layout />
			<ActionsPanel />
			{/* {activity === "PENDING" && <Info />} */}
			<Results />
		</div>
	);
};
