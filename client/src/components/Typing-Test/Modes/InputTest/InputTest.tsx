import React, { useEffect, useRef, useState } from "react";

import { useTestStore } from "@store/TestStore";
import { useTimeCount } from "@hooks/useTimeCount";

import "./InputTest.scss";

export const InputTest = () => {
	// const [text, setText] = useState<string[]>(generateText(Number(props.value)));
	// const [currWord, setCurrWord] = useState<Content>({text: '', index: -1});
	// const [currChar, setCurrChar] = useState<Content>({text: '', index: -1});
	// const [totalChars, setTotalChars] = useState<number>(0);
	// const [timeTaken, setTimeTaken] = useState<number>(0);
	// const [correct, setCorrect] = useState<number>(0);
	// const [incorrect, setIncorrect] = useState<number>(0);

	const [userInput, setUserInput] = useState<string>("");
	const [startCountdown, startTimer] = useTimeCount();

	const [typedWord, setTypedWord] = useState<string>("");
	const [typeHistory, setTypeHistory] = useState<string[]>([]);
	// const [isTestStarted, actions] = useCountdown();

	const {
		time,
		testContent,
		setWord,
		setChar,
		currWord,
		currChar,
		activity,
		setActivity,
		activeFilter,
		wordsLeft,
		setWordsLeft,
		resetTest,
		setResults,
		totalChars,
		correctChars,
		setCorrectChars,
		incorrectChars,
		setIncorrectChars,
		setTotalChars,
	} = useTestStore();

	useEffect(() => {
		setUserInput("");
		if (activity !== "STARTED") {
			setWord(testContent[0], 0);
			setChar(testContent[0][0], -1);
		}
		// if (activity.status === "COMPLETED") calcTestResults();
	}, [testContent, activity]);

	useEffect(() => {
		if (activity === "STARTED") checkMatch();
	}, [currChar]);

	function detectKey(e: React.KeyboardEvent<HTMLInputElement>): void {
		const key = e.key.trim();
		const nextWord = testContent[currWord.index + 1];
		// console.log(nextWord, activity);

		// if (!nextWord || activity.status === "COMPLETED") {
		// 	// setActivity({ "COMPLETED" });
		// 	// resetTest();
		// 	return;
		// }

		// if (!testContent[currWord.index]) {
		// 	resetTest();
		// 	return;
		// }

		if (key === "Tab" || key === "Enter") {
			e.preventDefault();
			// open command menu & pause the test
			setActivity("STOPPED");
			alert("Test is paused!");
			return;
		} else if (key === "") {
			setTypeHistory([...typeHistory, userInput]);
			setWordsLeft(wordsLeft + 1);
			setWord(nextWord, currWord.index + 1);
			setChar(key, -1);
			setUserInput("");
			if (!nextWord) {
				setActivity("COMPLETED");
				return;
			}
			calcTestResults();
			scrollContent();
		} else if (key.length === 1) {
			setChar(key, currChar.index + 1);
			if (activity !== "STARTED") {
				// setIsStarted(true);
				setActivity("STARTED");
				activeFilter.name !== "Time" ? startTimer() : startCountdown();
			}
		}
		setTotalChars(totalChars + 1);
	}

	function calcTestResults(): void {
		const minutesTaken = (time / 60000) * 1000;
		const accuracy = Math.round((correctChars / totalChars) * 100);
		const grossWPM = Math.round(totalChars / 5 / minutesTaken);
		const netWPM = Math.round(
			Math.abs(totalChars / 5 - incorrectChars) / minutesTaken
		);

		console.log("time", time);
		console.log("filter", activeFilter);
		console.log("c - i => ", correctChars, incorrectChars);
		console.log("totalC", totalChars);
		console.log("grossWPM", grossWPM);
		console.log("netWPM", netWPM);

		setResults({
			grossWPM: Number.isFinite(grossWPM) ? grossWPM : 0,
			netWPM: Number.isFinite(netWPM) ? netWPM : 0,
			accuracy,
			errors: incorrectChars,
		});
	}

	function checkMatch(): void {
		document
			.querySelector(`.word-${currWord.index}-char-${currChar.index}`)
			?.classList.add("active-char");

		// on first try there is an error in currword and currchar!!
		// console.log(currChar, currWord);
		if (
			currChar.text === currWord.text[currChar.index] ||
			currChar.text === ""
		) {
			setCorrectChars(correctChars + 1);
			// setCorrect(correct + 1);
			// ====> needs to be set after creating user preferences
			// document.querySelector(`.word-${currWord.index}-char-${currChar.index}`)?.classList.add('correct-char');
		} else {
			setIncorrectChars(incorrectChars + 1);
			// setIncorrect(incorrect + 1);
			// ====> needs to be set after creating user preferences
			// document.querySelector(`.word-${currWord.index}-char-${currChar.index}`)?.classList.add('incorrect-char');
		}
	}

	function getWordClass(x: number): string | undefined {
		return x === currWord.index ? "current-word" : undefined;
	}

	function scrollContent(): void {
		setTimeout(() => {
			const el: HTMLDivElement = document.querySelector(
				".text__content"
			) as HTMLDivElement;
			const spn: HTMLSpanElement = document.querySelector(
				".current-word"
			) as HTMLSpanElement;
			if (
				el.getBoundingClientRect().top + 10 !==
					spn.getBoundingClientRect().top &&
				activity === "STARTED"
			) {
				(
					document.querySelector(".text__content") as HTMLDivElement
				).scrollTop +=
					spn.getBoundingClientRect().top -
					el.getBoundingClientRect().top;
			}
		}, 50);
	}

	return (
		<div
			className="typing-test"
			style={{
				display: activity !== "COMPLETED" ? "flex" : "none",
			}}
		>
			<div className="text">
				<div className="text__content">
					{testContent.map((word, ix) => (
						<span className={getWordClass(ix)} key={ix}>
							{word.split("").map((char, iy) => (
								<span
									className={`word-${ix}-char-${iy}`}
									key={iy}
								>
									{char}
								</span>
							))}{" "}
						</span>
					))}
				</div>
			</div>
			<input
				className="input-box"
				type="text"
				spellCheck="false"
				onChange={(e) => setUserInput(e.target.value)}
				value={userInput}
				onKeyDown={detectKey}
			/>
		</div>
	);
};
