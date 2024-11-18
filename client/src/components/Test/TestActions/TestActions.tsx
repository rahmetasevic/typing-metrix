import { MdRestartAlt } from "react-icons/md";
import { TbArrowBarToLeft } from "react-icons/tb";
import { useShallow } from "zustand/react/shallow";

import { Button } from "@components/Shared/Button";
import { useTestStore } from "@store/TestStore";
import { TestStatus } from "@constants/index";

import "./TestActions.scss";

export const TestActions = () => {
	const [activity, redoTest, resetTest] = useTestStore(
		useShallow((state) => [
			state.activity,
			state.redoTest,
			state.resetTest,
		]),
	);

	return (
		<div
			className={`actions ${activity !== TestStatus.Finish ? "invisible" : ""}`}
		>
			<Button className="redo-button" onClick={redoTest}>
				<TbArrowBarToLeft />
			</Button>
			<Button className="restart-button" onClick={resetTest}>
				<MdRestartAlt />
			</Button>
		</div>
	);
};
