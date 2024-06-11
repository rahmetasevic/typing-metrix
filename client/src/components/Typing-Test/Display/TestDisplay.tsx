import React, { useState, useEffect } from "react";
import { IoMdSettings } from "react-icons/io";
import { HiMiniCommandLine } from "react-icons/hi2";

import { TestMetrics } from "@components/Typing-Test/Results/TestMetrics";
import { TestActions } from "@components/Typing-Test/Actions/TestActions";
import { InputTest } from "@components/Typing-Test/Modes/InputTest/InputTest";
import { useTestStore } from "@store/TestStore";
import { SetupModal } from "../Setup/SetupModal";
import { Button } from "@components/Common/Button";
import { Info } from "@components/Typing-Test/Info/Info";

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
		mode,
		testContent,
		activity,
		activeFilter,
		selectedFilter,
		setTime,
		setTestContent,
		setActiveFilter,
	] = useTestStore((state) => [
		state.mode,
		state.testContent,
		state.activity,
		state.activeFilter,
		state.selectedFilter,
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
						<div className="typing__setup  typing--highlighted">
							<Button
								className="typing__setup__btn"
								type="button"
								onClick={() => setShowSetup(!showSetup)}
							>
								<IoMdSettings />
								Setup
							</Button>
							<Button
								className="typing__setup__btn"
								type="button"
							>
								<HiMiniCommandLine />
								Controls
							</Button>
						</div>
						<Info />
						{/* <div className="typing__config">
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
						</div> */}
					</div>
				</div>
			) : (
				<TestMetrics />
			)}
			<InputTest />
			{/* {activity === "PENDING" && <Info />} */}
			<TestActions />
		</div>
	);
};
