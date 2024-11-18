import React, { useEffect, useState } from "react";

import { useTestStore } from "@store/TestStore";
import { TestStatus } from "@constants/index";

import "./TestResult.scss";

export const TestResult = () => {
	const time = useTestStore((state) => state.time);
	const activeFilter = useTestStore((state) => state.activeFilter);
	const results = useTestStore((state) => state.results);
	const wordsLeft = useTestStore((state) => state.wordsLeft);
	const testContent = useTestStore((state) => state.testContent);
	const activity = useTestStore((state) => state.activity);

	if (!testContent) return null;

	return (
		<div
			className={`results ${activity !== TestStatus.Finish ? "hidden" : ""}`}
		>
			<div className="results__time">
				{activeFilter.name !== "Time"
					? wordsLeft + "/" + testContent.length
					: time}
				<span>{activeFilter.name + " left"}</span>
			</div>
			<div className="results__wpm">
				{results.grossWPM + "/" + results.netWPM}
				<span>WPM</span>
			</div>
			<div className="results__acc">
				{results.accuracy}%<span>Accuracy</span>
			</div>
			<div className="results__errors">
				{results.errors}
				<span>Errors</span>
			</div>
		</div>
	);
};
