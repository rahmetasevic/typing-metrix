import React, { useEffect, useState } from "react";
import { MdRestartAlt } from "react-icons/md";
import { TbArrowBarToLeft } from "react-icons/tb";

import { useTestStore } from "@store/TestStore";
import { TestStatus } from "@constants/index";
import { Button } from "@components/Shared/Button";

import "./Results.scss";

export const Results = () => {
	const activeFilter = useTestStore((state) => state.activeFilter);
	const results = useTestStore((state) => state.results);
	const testContent = useTestStore((state) => state.testContent);
	const activity = useTestStore((state) => state.activity);
	const resetTest = useTestStore((state) => state.resetTest);
	const redoTest = useTestStore((state) => state.redoTest);

	if (!testContent) return null;

	return (
		<div
			className={`results ${activity !== TestStatus.Finish ? "hidden" : ""}`}
			style={{
				display: activity === TestStatus.Finish ? "flex" : "none",
			}}
		>
			<div className="results__layout">
				<div className="results__mode">
					{activeFilter.name !== "quotes"
						? activeFilter.name + "/" + activeFilter.value
						: activeFilter.name}
					<span>mode</span>
				</div>
				<div className="results__wpm">
					{results.netWpm}
					<span>wpm</span>
				</div>
				<div className="results__cpm">
					{results.cpm}
					<span>cpm</span>
				</div>
				<div className="results__acc">
					{results.accuracy}%<span>acc</span>
				</div>
				<div className="results__duration">
					{results.timeTaken + "s"}
					<span>duration</span>
				</div>
				<div className="results__chars">
					{results.characters?.correct +
						"/" +
						results.characters?.incorrect +
						"/" +
						results.characters?.missed +
						"/" +
						results.characters?.entered}
					<span>characters</span>
				</div>
			</div>
			<div className="results__actions">
				<Button onClick={redoTest}>
					<TbArrowBarToLeft />
				</Button>
				<Button onClick={resetTest}>
					<MdRestartAlt />
				</Button>
			</div>
		</div>
	);
};
