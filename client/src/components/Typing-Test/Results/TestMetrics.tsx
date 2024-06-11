import React, { useEffect, useState } from "react";

import { useTestStore } from "@store/TestStore";

import "./TestMetrics.scss";

export const TestMetrics = () => {
	const time = useTestStore((state) => state.time);
	const activeFilter = useTestStore((state) => state.activeFilter);
	const results = useTestStore((state) => state.results);
	const wordsLeft = useTestStore((state) => state.wordsLeft);
	const testContent = useTestStore((state) => state.testContent);

	return (
		<div className="results">
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
