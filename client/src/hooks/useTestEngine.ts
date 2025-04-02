import { LayoutType, TestStatus } from "@constants/index";
import { useTestStore } from "@store/TestStore";
import { useEffect, useRef, useState } from "react";
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
	const caretRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// console.log("inputTest(activity, content)", activity, testContent);
		setUserInput("");
		if (activity !== TestStatus.Start && testContent!.length > 0) {
			setWord(testContent![0], 0);
			setChar(testContent![0][0], -1);
			resetScroll();
			hideCaret();
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

	function hideCaret(): void {
		if (!caretRef.current) return;
		caretRef.current.style.animation = "none";
		caretRef.current.style.opacity = "0";
	}

	function showCaret(): void {
		if (!caretRef.current) return;

		const activeChar = document.querySelector(".current-char");
		const rect = activeChar!.getBoundingClientRect();
		caretRef.current.style.left = `${rect.left}px`;
		caretRef.current.style.top = `${rect.top}px`;
		caretRef.current.style.animation =
			"blink 1s cubic-bezier(0.215, 0.61, 0.355, 1) forwards infinite";
		caretRef.current.style.opacity = "1";
	}

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

		// static caret
		if (!caretRef.current) return;
		caretRef.current.style.animation = "none";
		caretRef.current.style.opacity = "1";

		// console.log("charIndex", charIndex);
		if (key === "Backspace") {
			if (
				config.backspaceOption === "limited" ||
				(config.backspaceOption === "on" && config.movement === "off")
			) {
				document
					.querySelector(`.word-${currWord.index}-char-${charIndex}`)
					?.classList.remove("active-char", "entered-char");

				setCharIndex(charIndex === 0 ? 0 : charIndex - 1);
				if (charIndex === 0) {
					setCountCorrectChars(0);
				} else {
					const hasIncorrectChar = document
						.querySelector(
							`.word-${currWord.index}-char-${charIndex === 0 ? 0 : charIndex - 1}`,
						)
						?.classList.contains("incorrect");
					setCountCorrectChars(
						hasIncorrectChar
							? countCorrectChars
							: countCorrectChars - 1,
					);
				}

				// caret setup
				const previousChar = document.querySelector(
					`.word-${currWord.index}-char-${charIndex - 1}`,
				);
				if (previousChar) {
					const rect = previousChar.getBoundingClientRect();
					caretRef.current.style.left = `${charIndex === 0 ? rect.right : rect.left}px`;
					caretRef.current.style.top = `${rect.top}px`;
				}
			} else if (
				config.backspaceOption === "on" &&
				config.movement === "on"
			) {
				// console.log("back", charIndex, countCorrectChars);

				console.log("backspace & movemnt ccc", countCorrectChars);
				// remove style from input
				document
					.querySelector(`.word-${currWord.index}-char-${charIndex}`)
					?.classList.remove("active-char", "entered-char");

				if (charIndex === 0) {
					console.log("charindex = 0");
					const previousWordIndex =
						currWord.index === 0 ? 0 : currWord.index - 1;
					const previousCharIndex =
						currWord.index === 0
							? 0
							: testContent![previousWordIndex].length;
					setWord(testContent![previousWordIndex], previousWordIndex);
					setCharIndex(previousCharIndex);
					if (config.stopOnError === "off") {
						const incorrectCount = Array.from(
							document.querySelector(
								`.word-${previousWordIndex < currWord.index ? previousWordIndex : currWord.index}`,
							)?.children || [],
						).filter((child) =>
							child.classList.contains("incorrect"),
						).length;
						setCountCorrectChars(
							previousWordIndex < currWord.index
								? testContent![previousWordIndex].length -
										incorrectCount
								: 0,
						);
					} else {
						setCountCorrectChars(
							previousWordIndex < currWord.index
								? testContent![previousWordIndex].length
								: 0,
						);
					}

					// console.log("pw cw", previousWordIndex, currWord.index);

					// caret setup
					const previousChar = document.querySelector(
						`.word-${previousWordIndex}-char-${previousCharIndex - 1}`,
					);
					if (previousChar) {
						const rect = previousChar.getBoundingClientRect();
						caretRef.current.style.left = `${previousWordIndex === 0 && previousCharIndex === 0 ? rect.left : rect.right}px`;
						caretRef.current.style.top = `${rect.top}px`;
					}
					// }
				} else {
					console.log("charindex = else", countCorrectChars);
					setCharIndex(charIndex === 0 ? 0 : charIndex - 1);

					const hasIncorrectChar = document
						.querySelector(
							`.word-${currWord.index}-char-${charIndex === 0 ? 0 : charIndex - 1}`,
						)
						?.classList.contains("incorrect");
					setCountCorrectChars(
						hasIncorrectChar
							? countCorrectChars
							: countCorrectChars - 1,
					);

					// caret setup
					const previousChar = document.querySelector(
						`.word-${currWord.index}-char-${charIndex - 1}`,
					);
					if (previousChar) {
						const rect = previousChar.getBoundingClientRect();
						caretRef.current.style.left = `${rect.left}px`;
						caretRef.current.style.top = `${rect.top}px`;
					}
				}
			} else {
				console.log("backspace & movemnt ccc else", countCorrectChars);
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
						?.classList.add("active-char", "correct");
				}, 10);

				const incorrectCount = Array.from(
					document.querySelector(`.word-${currWord.index}`)
						?.children || [],
				).filter((child) =>
					child.classList.contains("incorrect"),
				).length;
				if (
					currWord.index === testContent!.length - 1 &&
					!currWord.text[charIndex + 1] &&
					incorrectCount < 1
				) {
					setActivity(TestStatus.Finish);
					return;
				}

				setCharIndex(charIndex + 1);
				setChar(key, currChar.index + 1);

				// caret setup
				const currentChar = document.querySelector(".current-char");
				if (currentChar) {
					const rect = currentChar.getBoundingClientRect();
					caretRef.current.style.left = `${rect.right}px`;
					caretRef.current.style.top = `${rect.top}px`;
				}
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
					// console.log("ci last", charIndex);
					setCharIndex(charIndex + 1);
					setChar(key, currChar.index + 1);
				}

				setTimeout(() => {
					document
						.querySelector(
							`.current-word .word-${currWord.index}-char-${charIndex}`,
						)
						?.classList.add("active-char", "incorrect");
				}, 10);

				// caret setup
				const isLastChar = charIndex === currWord.text.length - 1;
				const previousChar = document.querySelector(
					`.word-${currWord.index}-char-${isLastChar ? charIndex : charIndex + 1}`,
				);
				if (previousChar) {
					const rect = previousChar.getBoundingClientRect();
					caretRef.current.style.left = `${isLastChar ? rect.right : rect.left}px`;
					caretRef.current.style.top = `${rect.top}px`;
				}
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
				setCharStats({
					...charStats,
					incorrect: charStats.incorrect + 1,
					entered: charStats.entered + 1,
				});
				return;
			}

			// apply highlight type for type "word"
			if (config.contentHighlightStyle === "word") {
				setTimeout(() => {
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
				userInput.length <= currWord.text.length &&
				config.stopOnError === "off"
			) {
				setCharStats({
					...charStats,
					missed:
						charStats.missed +
						(currWord.text.length - userInput.trim().length),
				});
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

			// custom caret
			const nextChar = document.querySelector(
				`.word-${currWord.index + 1}-char-0`,
			);
			if (nextChar) {
				const rect = nextChar.getBoundingClientRect();
				caretRef.current.style.left = `${rect.left}px`;
				caretRef.current.style.top = `${rect.top}px`;
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
		caretRef,
		hideCaret,
		showCaret,
		userInput,
		getWordClass,
		addCurrentCharClass,
		detectKey,
		setUserInput,
	};
};
