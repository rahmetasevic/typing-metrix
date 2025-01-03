import { TestStatus } from "@constants/index";
import { useTestStore } from "@store/TestStore";
import { useEffect, useRef, useState } from "react";
import { useTimeCount } from "./useTimeCount";

export const useTestEngine = () => {
	const [userInput, setUserInput] = useState<string>("");
	const [startCountdown, startTimer] = useTimeCount();
	const [
		time,
		testContent,
		currWord,
		currChar,
		activity,
		activeFilter,
		wordsLeft,
		totalChars,
		correctChars,
		incorrectChars,
		contentState,
		setWord,
		setChar,
		setActivity,
		setWordsLeft,
		setResults,
		setCorrectChars,
		setIncorrectChars,
		setTotalChars,
	] = useTestStore((state) => [
		state.time,
		state.testContent,
		state.currWord,
		state.currChar,
		state.activity,
		state.activeFilter,
		state.wordsLeft,
		state.totalChars,
		state.correctChars,
		state.incorrectChars,
		state.contentState,
		state.setWord,
		state.setChar,
		state.setActivity,
		state.setWordsLeft,
		state.setResults,
		state.setCorrectChars,
		state.setIncorrectChars,
		state.setTotalChars,
	]);

	useEffect(() => {
		// console.log("inputTest(activity, content)", activity, testContent);
		setUserInput("");
		if (activity !== TestStatus.Start && testContent.length > 0) {
			setWord(testContent[0], 0);
			setChar(testContent[0][0], -1);
		}
		// if (activity.status === "COMPLETED") calcTestResults();
	}, [testContent, activity]);

	useEffect(() => {
		if (activity === TestStatus.Start) checkMatch();
	}, [currChar]);

	function calcTestMetrics(): void {
		const minutesTaken =
			activeFilter.name === "time"
				? (Number(activeFilter.value) / 60000) * 1000
				: (time / 60000) * 1000;
		const accuracy = Math.round((correctChars / totalChars) * 100);
		const grossWPM = Math.round(totalChars / 5 / minutesTaken);
		const netWPM = Math.round(
			Math.abs(totalChars / 5 - incorrectChars) / minutesTaken,
		);

		// console.log("time", time);
		// console.log("filter", activeFilter);
		// console.log("c - i => ", correctChars, incorrectChars);
		// console.log("timeTaken", minutesTaken);
		// console.log("totalC", totalChars);
		// console.log("grossWPM", grossWPM);
		// console.log("netWPM", netWPM);

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

	function getWordClass(x: number): string {
		return x === currWord.index ? "current-word" : "";
	}

	function scrollContent(): void {
		setTimeout(() => {
			const el: HTMLDivElement = document.querySelector(
				".text__content",
			) as HTMLDivElement;
			const spn: HTMLSpanElement = document.querySelector(
				".current-word",
			) as HTMLSpanElement;
			if (
				el.getBoundingClientRect().top + 10 !==
					spn.getBoundingClientRect().top &&
				activity === TestStatus.Start
			) {
				(
					document.querySelector(".text__content") as HTMLDivElement
				).scrollTop +=
					spn.getBoundingClientRect().top -
					el.getBoundingClientRect().top;
			}
		}, 50);
	}

	function detectKey(e: React.KeyboardEvent<HTMLInputElement>): void {
		const key = e.key.trim();
		const nextWord = testContent[currWord.index + 1];
		console.log("key", key);
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
			setActivity(TestStatus.Stop);
			alert("Test is paused!");
			return;
		} else if (key === "") {
			// setTypeHistory([...typeHistory, userInput]);
			setWordsLeft(wordsLeft + 1);
			setWord(nextWord, currWord.index + 1);
			setChar(key, -1);
			setUserInput("");
			if (!nextWord) {
				setActivity(TestStatus.Finish);
				return;
			}
			calcTestMetrics();
			scrollContent();
		} else if (key.length === 1) {
			setChar(key, currChar.index + 1);
			if (activity !== TestStatus.Start) {
				// setIsStarted(true);
				setActivity(TestStatus.Start);
				activeFilter.name !== "time" ? startTimer() : startCountdown();
			}
		}
		setTotalChars(totalChars + 1);
	}

	return [
		testContent,
		activity,
		userInput,
		getWordClass,
		detectKey,
		setUserInput,
	];
};
