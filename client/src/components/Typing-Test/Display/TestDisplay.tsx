import React, { useState, useEffect } from "react";

import { TestResults } from "@components/Typing-Test/Results/TestResults";
import { TestActions } from "@components/Typing-Test/Actions/TestActions";
import { InputTest } from "@components/Typing-Test/Modes/InputTest/InputTest";
import { useTestStore } from "@store/TestStore";
import { SetupModal } from "../Setup/SetupModal";

import "./TestDisplay.scss";
// figure out how to dynamically import display components
// const displayComponents = {
// 	inputMode: InputTest
// };

export const TestDisplay = () => {
	// const [displayMode, setDisplayMode] = useState<string>('inputMode');
	// const [activeFilter, setActiveFilter] = useState<FilterProps>({name: 'words', options: FilterOption['words'], value: '10'});

	// const isStarted = useTestStore((state) => state.isStarted);
	// const activeFilter = useTestStore((state) => state.activeFilter);
	// const setTime = useTestStore((state) => state.setTime);
	// const setTestContent = useTestStore((state) => state.setTestContent);
	// const setActiveFilter = useTestStore((state) => state.setActiveFilter);
	const [showSetup, setShowSetup] = useState<boolean>(false);

	const [
		testContent,
		activity,
		activeFilter,
		setTime,
		setTestContent,
		setActiveFilter,
	] = useTestStore((state) => [
		state.testContent,
		state.activity,
		state.activeFilter,
		state.setTime,
		state.setTestContent,
		state.setActiveFilter,
	]);

	// rewrite this in onApply
	useEffect(() => {
		let generateCount;
		// activeFilter.name === "Time"
		// 	? Number(activeFilter.value) * 10
		// 	: Number(activeFilter.value);
		if (activeFilter.name === "Time") {
			generateCount = Number(activeFilter.value) * 10;
			setTime(Number(activeFilter.value));
		} else {
			generateCount = Number(activeFilter.value);
			setTime(0);
		}
		setTestContent(generateCount);
	}, [activeFilter]);

	// -------> used for displaying different test perspectives
	// function handleDisplayMode(e: React.MouseEvent<HTMLLIElement>): void {
	// 	const displayValue = e.currentTarget.dataset.value as string;
	// 	document.querySelector('.display-mode.active')?.classList.remove('active');
	// 	e.currentTarget?.classList.add('active');
	// 	setDisplayMode(displayValue);
	// }

	// function handleFilterOption(
	// 	e: React.MouseEvent<HTMLDivElement | HTMLSpanElement>
	// ): void {
	// 	const optionName: string = (e.target as HTMLDivElement).textContent!;
	// 	if (
	// 		optionName === "Words" ||
	// 		optionName === "Quotes" ||
	// 		optionName === "Time"
	// 	)
	// 		setActiveFilter({
	// 			name: optionName,
	// 			options: FilterOption[optionName],
	// 			value: FilterOption[optionName][0],
	// 		});
	// }

	// function handleFilterValue(e: React.MouseEvent<HTMLDivElement>): void {
	// 	const optionValue: string | undefined = (e.target as HTMLDivElement)
	// 		.dataset?.option;
	// 	if (optionValue)
	// 		setActiveFilter({
	// 			name: activeFilter.name,
	// 			options: [...activeFilter.options],
	// 			value: optionValue,
	// 		});
	// }

	function handleTestSetup(e: React.MouseEvent<HTMLElement>): void {}

	return (
		<div className="home">
			<SetupModal visible={showSetup} close={() => setShowSetup(false)} />
			{activity === "PENDING" ? (
				<div className="test-config">
					<div className="typing">
						<div
							className="typing__setup  typing--highlighted"
							onClick={() => setShowSetup(!showSetup)}
						>
							Setup
							{/* <div className="typing__filter-option typing__filter--highlighted">
								Words
							</div>
							<span style={{ color: "black", fontSize: "16px" }}>
								|
							</span>
							<div className="typing__filter-option typing__filter--highlighted">
								Time
							</div>
							<span style={{ color: "black", fontSize: "16px" }}>
								|
							</span>
							<div className="typing__filter-option typing__filter--highlighted">
								Quotes
							</div> */}
						</div>
						{/* <div
							className="typing__values"
							onClick={handleFilterValue}
						>
							{activeFilter.options.map((option, ix) => (
								<div
									className="typing__filter-value typing__filter--highlighted"
									key={ix}
									data-option={option}
								>
									{option}
									{ix !== activeFilter.options.length - 1 ? (
										<span
											style={{
												color: "black",
												fontSize: "16px",
											}}
											key={`dash-${ix}`}
										>
											{" "}
											|
										</span>
									) : null}
								</div>
							))}
						</div> */}
						<div className="typing__config">
							<div className="typing__config__value">
								{activeFilter.name}
							</div>
							<span style={{ color: "black", fontSize: "16px" }}>
								|
							</span>
							<div className="typing__config__value">
								{activeFilter.value}
							</div>
							<span style={{ color: "black", fontSize: "16px" }}>
								|
							</span>
							<div className="typing__config__value">icon</div>
						</div>
					</div>
				</div>
			) : (
				<TestResults />
			)}
			<InputTest />
			<TestActions />
		</div>
	);
};
