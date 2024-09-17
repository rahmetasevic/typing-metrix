import React from "react";
import { MdRestartAlt } from "react-icons/md";

import { Button } from "@components/Shared/Button";
import { FilterOption } from "@constants/index";
import { useTestStore } from "@store/TestStore";

import "./TestInfo.scss";

export const TestInfo = () => {
	const [activeFilter, resetTest] = useTestStore((state) => [
		state.activeFilter,
		state.resetTest,
	]);
	const Icon = FilterOption[activeFilter.name].icon;

	return (
		<>
			<div className="info">
				<div className="info__section">
					<Icon />
					<span>{activeFilter.name}</span>
					<span>{activeFilter.value}</span>
					<Button className="restart-button" onClick={resetTest}>
						<MdRestartAlt />
					</Button>
				</div>
			</div>
		</>
	);
};
