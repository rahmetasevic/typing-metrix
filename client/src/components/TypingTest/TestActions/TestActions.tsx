import { MdRestartAlt } from "react-icons/md";
import { TbArrowBarToLeft } from "react-icons/tb";
import { useShallow } from "zustand/react/shallow";

import { Button } from "@components/Button/Button";
import { useTestStore } from "@stores/TestStore";

import "./TestActions.scss";

export const TestActions = () => {
	const [redoTest, resetTest] = useTestStore(
		useShallow((state) => [state.redoTest, state.resetTest])
	);

	return (
		<div className="test-actions">
			<Button icon={<TbArrowBarToLeft />} onClick={redoTest} />
			<Button icon={<MdRestartAlt />} onClick={resetTest} />
		</div>
	);
};
