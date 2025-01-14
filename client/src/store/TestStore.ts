import { create } from "zustand";
import { persist } from "zustand/middleware";

import { FilterOption, LayoutType } from "@constants/index";
import { FilterProps } from "types";
import { TestStatus } from "@constants/index";
import { generateContent } from "@lib/contentGenerator";
import { addTransition } from "@utils/index";

type TestAccuracy = {
	correct: number;
	incorrect: number;
};

type TextContent = {
	text: string;
	index: number;
};

type TestMetrics = {
	grossWPM: number;
	netWPM: number;
	accuracy: number;
	errors: number;
};

type ContentState = {
	loading?: boolean;
	error?: string | null;
};

// type TestStatus = "PENDING" | "STARTED" | "STOPPED" | "COMPLETED";
export type TestMode = "STANDARD" | "CUSTOM";
// export type DisplayLayout = "box" | "flow" | "inline";
type TestState = {
	mode: TestMode;
	activity: TestStatus;
	activeFilter: FilterProps;
	testContent: string[] | null;
	currWord: TextContent;
	currChar: TextContent;
	time: number;
	wordsLeft: number;
	totalChars: number;
	correctChars: number;
	incorrectChars: number;
	results: TestMetrics;
	contentState: ContentState;
	dictionary: string[];
	displayLayout: LayoutType;
};

type TestActions = {
	setMode: (mode: TestMode) => void;
	setTestContent: (content?: string[] | null) => void;
	setWord: (word: string, index: number) => void;
	setChar: (char: string, index: number) => void;
	setTime: (seconds: number) => void;
	setActivity: (status: TestStatus) => void;
	setActiveFilter: (filter: FilterProps) => void;
	setTotalChars: (count: number) => void;
	setCorrectChars: (count: number) => void;
	setIncorrectChars: (count: number) => void;
	setWordsLeft: (count: number) => void;
	setResults: (result: TestMetrics) => void;
	setContentState: (currentState: ContentState) => void;
	setDictionary: (dictionary: string[]) => void;
	setDisplayLayout: (layout: LayoutType) => void;
	redoTest: () => void;
	resetTest: () => void;
};

const initialState: TestState = {
	mode: "STANDARD",
	// activity: "PENDING",
	activity: TestStatus.Pending,
	activeFilter: {
		name: "words",
		options: FilterOption.words.values!,
		value: FilterOption.words.values![0],
	},
	testContent: [],
	currWord: { text: "", index: -1 },
	currChar: { text: "", index: 0 },
	totalChars: 0,
	correctChars: 0,
	incorrectChars: 0,
	time: 0,
	wordsLeft: 0,
	results: { grossWPM: 0, netWPM: 0, accuracy: 0, errors: 0 },
	contentState: { loading: false, error: null },
	dictionary: [],
	displayLayout: "flow",
};

export const useTestStore = create<TestState & TestActions>()(
	persist(
		(set, get) => ({
			...initialState,
			setMode: (mode: TestMode) => {
				set({ mode: mode });
			},
			setTestContent: async (content?: string[] | null) => {
				// content as a parameter => for custom content that user inputs
				// console.log("cst content", content);
				set({ contentState: { loading: true, error: null } });
				try {
					// same content for words & time filters
					const currentFilterName = get().activeFilter.name;
					const dataKey =
						currentFilterName !== "quotes" ? "words" : "quotes";
					const url =
						dataKey === "words"
							? "/dictionaries/english_common.json"
							: "/quotes/quotes.json";
					const response = await fetch(url);
					if (response.ok) {
						const data = await response.json();

						set({
							dictionary: data[dataKey],
						});
						set({
							testContent:
								content ??
								generateContent(data[dataKey], {
									name: currentFilterName,
									value: Number(get().activeFilter.value),
								}),
						});
					} else {
						console.log("failed to fetch dictionary content");
					}
				} catch (error) {
					console.log("error in getting content data:", error);
					set({
						contentState: {
							loading: false,
							error: "error in getting content data",
						},
					});
				} finally {
					set({ contentState: { loading: false, error: null } });
				}
			},
			setWord: (text: string, index: number) => {
				set({ currWord: { text, index } });
			},
			setChar: (char: string, index: number) => {
				set({ currChar: { text: char, index } });
			},
			setTime: (seconds: number) => {
				set({ time: seconds });
			},
			setTotalChars: (count: number) => {
				set({ totalChars: count });
			},
			setActivity: (status: TestStatus) => {
				set({ activity: status });
			},
			setCorrectChars: (count: number) => {
				set({ correctChars: count });
			},
			setIncorrectChars: (count: number) => {
				set({ incorrectChars: count });
			},
			setActiveFilter: (filter: FilterProps) => {
				set({ activeFilter: filter });
			},
			setWordsLeft: (count: number) => {
				set({ wordsLeft: count });
			},
			setResults: (result: TestMetrics) => {
				set({ results: result });
			},
			setContentState: (currentState: ContentState) => {
				set({ contentState: currentState });
			},
			setDictionary(dictionary: string[]) {
				set({ dictionary: dictionary });
			},
			setDisplayLayout(layout: LayoutType) {
				set({ displayLayout: layout });
			},
			redoTest: () => {
				document
					.querySelectorAll(".active-char")
					.forEach((e) => e.classList.remove("active-char"));

				set({
					...initialState,
					dictionary: get().dictionary,
					testContent: get().testContent,
					activeFilter: get().activeFilter,
				});
			},
			resetTest: () => {
				// bug when 50+ words is finished, previous text stays hidden at top of the element

				document
					.querySelectorAll(".active-char")
					.forEach((e) => e.classList.remove("active-char"));
				const contentClass =
					document.querySelector(".typing-test")?.firstElementChild
						?.classList[0];
				const generatedText: string[] = generateContent(
					get().dictionary,
					{
						name: get().activeFilter.name,
						value: Number(get().activeFilter.value),
					},
				);

				addTransition(`.${contentClass}__content`);

				set({
					...initialState,
					testContent: generatedText,
					displayLayout: get().displayLayout,
					dictionary: get().dictionary,
					activeFilter: get().activeFilter,
				});
			},
		}),
		{
			name: "config-storage", // name of item in the storage (must be unique)
			partialize: (state) =>
				Object.fromEntries(
					Object.entries(state).filter(
						([key]) => !["dictionary", "testContent"].includes(key),
					),
				),
		},
	),
);
