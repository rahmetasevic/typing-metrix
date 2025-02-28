import { LayoutType, TestStatus } from "@constants/index";
import { useTestStore } from "@store/TestStore";
import { useEffect, useState } from "react";
import { useTimeCount } from "./useTimeCount";

export const useTestEngine = () => {
	const [userInput, setUserInput] = useState<string>("");
	const [charIndex, setCharIndex] = useState<number>(0);
	const [startCountdown, startTimer] = useTimeCount();
	const [
		testContent,
		currWord,
		currChar,
		activity,
		activeFilter,
		timeCount,
		displayLayout,
		charStats,
		setCharStats,
		setWord,
		setChar,
		setActivity,
		setResults,
	] = useTestStore((state) => [
		state.testContent,
		state.currWord,
		state.currChar,
		state.activity,
		state.activeFilter,
		state.timeCount,
		state.displayLayout,
		state.charStats,
		state.setCharStats,
		state.setWord,
		state.setChar,
		state.setActivity,
		state.setResults,
	]);

	useEffect(() => {
		// console.log("inputTest(activity, content)", activity, testContent);
		setUserInput("");
		if (activity !== TestStatus.Start && testContent!.length > 0) {
			setWord(testContent![0], 0);
			setChar(testContent![0][0], -1);
		}
	}, [testContent, activity]);

	useEffect(() => {
		if (activity === TestStatus.Finish) {
			calcTestMetrics();
			setCharStats({
				correct: 0,
				incorrect: 0,
				missed: 0,
				entered: 0,
			});
			setCharIndex(0);
			resetScroll();
		}
	}, [activity]);

	function calcTestMetrics(): void {
		// console.log("characters", charStats);
		// console.log("tt", timeCount);

		const minutesTaken =
			activeFilter.name === "time"
				? (Number(activeFilter.value) / 60000) * 1000
				: (timeCount / 60000) * 1000;
		const accuracy = Math.round(
			(charStats.correct / charStats.entered) * 100,
		);
		const grossWPM = Math.round(charStats.entered / 5 / minutesTaken);
		const netWPM = Math.round(
			Math.abs(charStats.entered / 5 - charStats.incorrect) /
				minutesTaken,
		);
		const grossCpm = Math.round(charStats.entered / minutesTaken);
		const netCpm = Math.round(
			Math.abs(charStats.entered - charStats.incorrect) / minutesTaken,
		);

		// console.log("time", time);
		// console.log("filter", activeFilter);
		// console.log("c - i => ", correctChars, incorrectChars);
		// console.log("totalC", totalChars);
		// console.log("grossWPM", grossWPM);
		// console.log("netWPM", netWPM);
		// console.log("timeTaken", minutesTaken);

		setResults({
			grossWpm: Number.isFinite(grossWPM) ? grossWPM : 0,
			netWpm: Number.isFinite(netWPM) ? netWPM : 0,
			cpm: Number.isFinite(netCpm) ? netCpm : 0,
			accuracy: accuracy,
			timeTaken: Math.round(minutesTaken * 60),
			characters: {
				correct: charStats.correct,
				incorrect: charStats.incorrect,
				missed: charStats.missed,
				entered: charStats.entered,
			},
		});
	}

	function getWordClass(x: number): string {
		return x === currWord.index ? "current-word" : "";
	}

	function scrollContent(): void {
		setTimeout(() => {
			const contentBlock =
				document.querySelector(".typing-test")?.firstElementChild
					?.classList[0];
			const content = document.querySelector(
				`.${contentBlock}__content`,
			) as HTMLElement;
			const currentWord: HTMLSpanElement = document.querySelector(
				".current-word",
			) as HTMLSpanElement;

			if (displayLayout !== LayoutType.INLINE) {
				const absDiff =
					Math.floor(
						(currentWord!.getBoundingClientRect().top -
							content!.getBoundingClientRect().top) /
							50,
					) * 50;
				const diff =
					currentWord!.getBoundingClientRect().top -
					content!.getBoundingClientRect().top -
					absDiff;

				// console.log("abs_diff", absDiff);
				//
				// console.log(
				// 	"ct_cw_cc-right",
				// 	content.getBoundingClientRect().right,
				// 	currentWord.getBoundingClientRect().right,
				// 	currentChar.getBoundingClientRect().right,
				// );
				//
				if (absDiff > 0 && activity === TestStatus.Start) {
					content!.scrollTop +=
						diff > absDiff ? absDiff + diff : absDiff;
					// console.log("ct_st", content!.getBoundingClientRect().top);
					// console.log(
					// 	"cw_st",
					// 	currentWord!.getBoundingClientRect().top,
					// );
					// console.log(
					// 	"cc_st",
					// 	currentChar!.getBoundingClientRect().top,
					// );
					// console.log(
					// 	"diff",
					// 	currentWord.getBoundingClientRect().top -
					// 		content.getBoundingClientRect().top,
					// );
					// console.log("total_scrollTop", content!.scrollTop);
				}
			} else {
				const previousWordLen = parseFloat(
					currentWord!
						.previousElementSibling!.getBoundingClientRect()
						.width.toFixed(2),
				);
				const leftInput = document.querySelector(
					`.parinline__uinput`,
				) as HTMLElement;
				// console.log("cw", currentWord.getBoundingClientRect());
				// console.log(
				// 	"pw",
				// 	currentWord.previousElementSibling!.getBoundingClientRect(),
				// );
				// console.log("sl", content!.scrollLeft);
				// console.log("sw", content!.scrollWidth);
				// console.log("prevWordLen", previousWordLen);
				content!.scrollLeft += previousWordLen;
				leftInput!.scrollLeft += previousWordLen;
				// content.scrollBy({ left: 50, behavior: "smooth" });
			}
		}, 50);
	}

	function resetScroll(): void {
		const contentBlock =
			document.querySelector(".typing-test")?.firstElementChild
				?.classList[0];
		(
			document.querySelector(
				`.${contentBlock}__content`,
			) as HTMLDivElement
		).scrollTop = 0;
		(
			document.querySelector(
				`.${contentBlock}__content`,
			) as HTMLDivElement
		).scrollLeft = 0;
	}

	function detectKey(e: React.KeyboardEvent<HTMLInputElement>): void {
		const key = e.key.trim();
		const nextWord = testContent![currWord.index + 1];
		// console.log("key", key);
		// console.log(nextWord, activity);

		if (key === "Tab" || key === "Enter") {
			e.preventDefault();
			// open command menu & pause the test
			setActivity(TestStatus.Stop);
			alert("Test is paused!");
			return;
		} else if (key === "") {
			// console.log("currWord", currWord, currWord.text.length);
			// console.log("uinput", userInput, userInput.trim().length);
			// console.log(
			// 	"missed",
			// 	currWord.text.length - userInput.trim().length,
			// );

			if (
				userInput.trim().length === 0 ||
				userInput.length < currWord.text.length
			) {
				setCharStats({
					...charStats,
					missed:
						charStats.missed +
						(currWord.text.length - userInput.trim().length),
				});
			} else {
				// console.log(currWord, currChar);
				// console.log("uinput", userInput);
				setCharStats({
					...charStats,
					correct: charStats.correct + 1,
					entered: charStats.entered + 1,
				});
			}

			setCharIndex(0);
			setWord(nextWord, currWord.index + 1);
			setChar(key, -1);

			// HISTORY OF TYPED WORDS
			// if (displayLayout !== LayoutType.INLINE) {
			// setUserInput("");
			// }

			if (!nextWord) {
				setActivity(TestStatus.Finish);
				return;
			}

			scrollContent();
			setUserInput("");
		} else if (key.length === 1) {
			if (activity !== TestStatus.Start) {
				setActivity(TestStatus.Start);
				activeFilter.name !== "time" ? startTimer() : startCountdown();
			}

			document
				.querySelector(`.word-${currWord.index}-char-${charIndex}`)
				?.classList.add("active-char");

			const currWordChar = currWord.text[charIndex];
			if (!currWordChar) {
				setCharStats({
					...charStats,
					entered: charStats.entered + 1,
				});
			} else if (currWordChar && key === currWordChar) {
				setCharStats({
					...charStats,
					correct: charStats.correct + 1,
					entered: charStats.entered + 1,
				});

				if (
					currWord.index === testContent!.length - 1 &&
					!currWord.text[charIndex + 1]
				) {
					setActivity(TestStatus.Finish);
					return;
				}
				// ====> needs to be set after creating user preferences
				// document.querySelector(`.word-${currWord.index}-char-${currChar.index}`)?.classList.add('correct-char');
			} else {
				setCharStats({
					...charStats,
					incorrect: charStats.incorrect + 1,
					entered: charStats.entered + 1,
				});
				// ====> needs to be set after creating user preferences
				// document.querySelector(`.word-${currWord.index}-char-${currChar.index}`)?.classList.add('incorrect-char');
			}

			setChar(key, currChar.index + 1);
			setCharIndex(charIndex + 1);
		}
	}

	return {
		testContent,
		activity,
		userInput,
		getWordClass,
		detectKey,
		setUserInput,
	};
};
