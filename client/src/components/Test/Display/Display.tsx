import { Results } from "@components/Test/Results";
import { Actions } from "@components/Test/Actions";
import { ParagraphBox } from "@components/Test/Layout/ParagraphBox";
import { ConfigPanel } from "@components/Test/ConfigPanel";

import "./Display.scss";
import { ParagraphFlow } from "../Layout/ParagraphFlow/ParagraphFlow";

export const Display = () => {
	return (
		<div className="home">
			<ConfigPanel />
			<ParagraphFlow />
			{/* <ParagraphBox /> */}
			<Results />
			{/* {activity === "PENDING" && <Info />} */}
			<Actions />
		</div>
	);
};
