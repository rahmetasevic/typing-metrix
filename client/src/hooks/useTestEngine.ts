import { LayoutType, TestStatus } from "@constants/index";
import { useTestStore } from "@store/TestStore";
import { useEffect, useState } from "react";
import { useTimeCount } from "./useTimeCount";
import { useTestConfigStore } from "@store/TestConfigStore";

export const useTestEngine = () => {
	const [userInput, setUserInput] = useState<string>("");
	const [charIndex, setCharIndex] = useState<number>(0);
	const [countCorrectChars, setCountCorrectChars] = useState<number>(0);
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
	const config = useTestConfigStore((state) => state.config);

	useEffect(() => {
		// console.log("inputTest(activity, content)", activity, testContent);
		setUserInput("");
		if (activity !== TestStatus.Start && testContent!.length > 0) {
			resetScroll();
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
			(charStats.correct / (charStats.entered + charStats.missed)) * 100,
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

	function addCurrentCharClass(
		wordIndex: number,
		currentCharIndex: number,
	): string {
		return wordIndex === currWord.index && currentCharIndex === charIndex
			? " current-char"
			: "".trim();
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

		if (displayLayout === LayoutType.INLINE) {
			(
				document.querySelector(
					`.${contentBlock}__content`,
				) as HTMLDivElement
			).scrollLeft = 0;
		} else {
			(
				document.querySelector(
					`.${contentBlock}__content`,
				) as HTMLDivElement
			).scrollTop = 0;
		}
	}

	function detectKey(e: React.KeyboardEvent<HTMLInputElement>): void {
		const key = e.key.trim();
		const nextWord = testContent![currWord.index + 1];
		// console.log("key", key);
		// console.log(nextWord, activity);
		// console.log("currWord", currWord);
		// console.log("charI", charIndex);

		console.log("cc", countCorrectChars);
		setTimeout(() => {
			document
				.querySelector(`.current-char`)
				?.classList.add("stop-caret-animation");
		}, 10);

		if (key === "Tab" || key === "Enter") {
			e.preventDefault();
			// open command menu & pause the test
			// setActivity(TestStatus.Stop);
			alert("Test is paused!");
			return;
		} else if (key === "Backspace") {
			if (
				config.backspaceOption === "limited" ||
				(config.backspaceOption === "on" && config.movement === "off")
			) {
				document
					.querySelector(`.word-${currWord.index}-char-${charIndex}`)
					?.classList.remove("active-char");
				document
					.querySelector(`.word-${currWord.index}-char-${charIndex}`)
					?.classList.remove("entered-char");
				setCharIndex(charIndex === 0 ? 0 : charIndex - 1);
			} else if (
				config.backspaceOption === "on" &&
				config.movement === "on"
			) {
				// remove style from input
				document
					.querySelector(`.word-${currWord.index}-char-${charIndex}`)
					?.classList.remove("active-char");
				document
					.querySelector(`.word-${currWord.index}-char-${charIndex}`)
					?.classList.remove("entered-char");

				console.log("charIndex", charIndex);

				if (charIndex === 0) {
					if (config.stopOnError === "word") {
						setCountCorrectChars(0);
						return;
					} else {
						setWord(
							testContent![currWord.index - 1],
							currWord.index - 1,
						);
						setCharIndex(
							testContent![currWord.index - 1].length - 1,
						);
						setCountCorrectChars(
							testContent![currWord.index - 1].length - 1,
						);
					}
				} else {
					setCharIndex(charIndex - 1);
					setCountCorrectChars(countCorrectChars - 1);
				}
				console.log("ci", charIndex);
			} else {
				return;
			}
		} else if (key.length === 1) {
			if (activity !== TestStatus.Start) {
				setActivity(TestStatus.Start);
				activeFilter.name !== "time" ? startTimer() : startCountdown();
			}

			const currWordChar = currWord.text[charIndex];
			if (!currWordChar) {
				setCharStats({
					...charStats,
					entered: charStats.entered + 1,
				});
			} else if (currWordChar && key === currWordChar) {
				setCountCorrectChars(countCorrectChars + 1);
				setCharStats({
					...charStats,
					correct: charStats.correct + 1,
					entered: charStats.entered + 1,
				});
				setTimeout(() => {
					document
						.querySelector(
							`.current-word .word-${currWord.index}-char-${charIndex}`,
						)
						?.classList.add("active-char");
				}, 10);

				if (
					currWord.index === testContent!.length - 1 &&
					!currWord.text[charIndex + 1]
				) {
					setActivity(TestStatus.Finish);
					return;
				}

				setCharIndex(charIndex + 1);
				setChar(key, currChar.index + 1);

				// ====> needs to be set after creating user preferences
				// document.querySelector(`.word-${currWord.index}-char-${currChar.index}`)?.classList.add('correct-char');
			} else {
				setCharStats({
					...charStats,
					incorrect: charStats.incorrect + 1,
					entered: charStats.entered + 1,
				});

				// check if stopOnError is on(character or word)
				if (config.stopOnError === "character") {
					return;
				} else {
					setCharIndex(charIndex + 1);
					setChar(key, currChar.index + 1);
				}

				setTimeout(() => {
					document
						.querySelector(
							`.current-word .word-${currWord.index}-char-${charIndex}`,
						)
						?.classList.add("active-char");
				}, 10);
				// ====> needs to be set after creating user preferences
				// document.querySelector(`.word-${currWord.index}-char-${currChar.index}`)?.classList.add('incorrect-char');
			}
		} else if (key === "") {
			// console.log("currWord", currWord, currWord.text.length);
			// console.log("uinput", userInput, userInput.trim().length);
			// console.log(
			// 	"missed",
			// 	currWord.text.length - userInput.trim().length,
			// );

			// check for constraints "stopOnError" && "backspace"
			if (
				(config.stopOnError === "word" ||
					config.stopOnError === "character") &&
				(countCorrectChars < currWord.text.length ||
					currWord.text.length > charIndex)
			) {
				return;
			}

			// apply highlight type for type "word"
			if (config.highlightType === "word") {
				setTimeout(() => {
					console.log("word index", currWord);
					document
						.querySelector(`.word-${currWord.index}`)
						?.classList.add("entered");
					document
						.querySelectorAll(".active-char")
						.forEach((element) => {
							element.classList.add("entered-char");
						});
					document
						.querySelectorAll(".active-char")
						.forEach((e) => e.classList.remove("active-char"));
				}, 10);
			}

			if (
				userInput.trim().length > 0 ||
				(userInput.length <= currWord.text.length &&
					config.stopOnError === "off")
			) {
				// --- missed is wrongly calculated ---
				setCharStats({
					...charStats,
					missed:
						charStats.missed +
						(currWord.text.length - userInput.trim().length),
				});
			} else {
				// console.log(currWord, currChar);
				// console.log("uinput", userInput);
				// space is not calculated
				// setCharStats({
				// 	...charStats,
				// 	correct: charStats.correct + 1,
				// 	entered: charStats.entered + 1,
				// });
			}

			setCountCorrectChars(0);
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
		} else {
			return;
		}
	}
	return {
		testContent,
		activity,
		userInput,
		getWordClass,
		addCurrentCharClass,
		detectKey,
		setUserInput,
	};
};
