import { create } from "zustand";
import { persist } from "zustand/middleware";

import { FilterOption, LANGUAGE_OPTIONS, LayoutType } from "@constants/index";
import { FilterProps } from "types";
import { TestStatus } from "@constants/index";
import { generateContent } from "@lib/contentGenerator";
import { addTransition } from "@utils/index";

type TextContent = {
	text: string;
	index: number;
};

export type CharactersProps = {
	correct: number;
	incorrect: number;
	missed: number;
	entered: number;
};

type TestResults = {
	grossWpm?: number;
	netWpm: number;
	cpm: number;
	accuracy: number;
	timeTaken: number;
	characters: CharactersProps;
};

export type TestMode = "STANDARD" | "CUSTOM";
type TestState = {
	mode: TestMode;
	activity: TestStatus;
	activeFilter: FilterProps;
	testContent: string[] | null;
	currWord: TextContent;
	currChar: TextContent;
	timeCount: number;
	charStats: CharactersProps;
	results: TestResults;
	dictionary: string[];
	displayLayout: (typeof LayoutType)[keyof typeof LayoutType];
	showQuickbar: boolean;
	language: (typeof LANGUAGE_OPTIONS)[number];
};

type TestActions = {
	setMode: (mode: TestMode) => void;
	setTestContent: (content?: string[] | null) => void;
	setWord: (word: string, index: number) => void;
	setChar: (char: string, index: number) => void;
	setActivity: (status: TestStatus) => void;
	setActiveFilter: (filter: FilterProps) => void;
	setTimeCount: (seconds: number) => void;
	setResults: (result: TestResults) => void;
	setDictionary: (dictionary: string[]) => void;
	setDisplayLayout: (
		layout: (typeof LayoutType)[keyof typeof LayoutType],
	) => void;
	setShowQuickbar: (isVisible: boolean) => void;
	setLanguage: (language: (typeof LANGUAGE_OPTIONS)[number]) => void;
	setCharStats: (chars: CharactersProps) => void;
	redoTest: () => void;
	resetTest: () => void;
};

const initialState: TestState = {
	mode: "STANDARD",
	activity: TestStatus.Pending,
	activeFilter: {
		name: "words",
		options: FilterOption.words.values!,
		value: FilterOption.words.values![0],
	},
	testContent: [],
	currWord: { text: "", index: -1 },
	currChar: { text: "", index: 0 },
	timeCount: 0,
	charStats: {
		correct: 0,
		incorrect: 0,
		missed: 0,
		entered: 0,
	},
	results: {
		grossWpm: 0,
		netWpm: 0,
		cpm: 0,
		accuracy: 0,
		timeTaken: 0,
		characters: { correct: 0, incorrect: 0, missed: 0, entered: 0 },
	},
	dictionary: [],
	displayLayout: LayoutType.FLOW,
	showQuickbar: false,
	language: LANGUAGE_OPTIONS[0],
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
				try {
					// same content for words & time filters
					const currentFilterName = get().activeFilter.name;
					const dataKey =
						currentFilterName !== "quotes" ? "words" : "quotes";
					const url =
						dataKey === "words"
							? `/dictionaries/${get().language}.json`
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
				}
			},
			setWord: (text: string, index: number) => {
				set({ currWord: { text, index } });
			},
			setChar: (char: string, index: number) => {
				set({ currChar: { text: char, index } });
			},
			setTimeCount: (seconds: number) => {
				set({ timeCount: seconds });
			},
			setActivity: (status: TestStatus) => {
				set({ activity: status });
			},
			setActiveFilter: (filter: FilterProps) => {
				set({ activeFilter: filter });
			},
			setResults: (result: TestResults) => {
				set({ results: result });
			},
			setDictionary(dictionary: string[]) {
				set({ dictionary: dictionary });
			},
			setDisplayLayout(
				layout: (typeof LayoutType)[keyof typeof LayoutType],
			) {
				set({ displayLayout: layout });
			},
			setShowQuickbar(isVisible: boolean) {
				set({ showQuickbar: isVisible });
			},
			setLanguage(language: (typeof LANGUAGE_OPTIONS)[number]) {
				set({ language: language });
			},
			setCharStats(chars: CharactersProps) {
				set({ charStats: chars });
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
