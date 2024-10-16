import { create } from "zustand";

import { generateTestContent } from "@lib/generate-text";
import { FilterOption } from "@constants/index";
import { FilterProps } from "types/index";

type TestAccuracy = {
	correct: number;
	incorrect: number;
};

type SelectedFilterProps = {
	name: string;
	value: string;
	options?: string[];
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

type TestStatus = "PENDING" | "STARTED" | "STOPPED" | "COMPLETED";
export type TestMode = "STANDARD" | "CUSTOM";
type TestState = {
	mode: TestMode;
	activity: TestStatus;
	activeFilter: FilterProps;
	selectedFilter: SelectedFilterProps;
	testContent: string[];
	currWord: TextContent;
	currChar: TextContent;
	time: number;
	wordsLeft: number;
	totalChars: number;
	correctChars: number;
	incorrectChars: number;
	results: TestMetrics;
};

type TestActions = {
	setMode: (mode: TestMode) => void;
	setTestContent: (size: number, content?: string[]) => void;
	setWord: (word: string, index: number) => void;
	setChar: (char: string, index: number) => void;
	setTime: (seconds: number) => void;
	setActivity: (status: TestStatus) => void;
	setActiveFilter: (filter: FilterProps) => void;
	setSelectedFilter: (filter: SelectedFilterProps) => void;
	setTotalChars: (count: number) => void;
	setCorrectChars: (count: number) => void;
	setIncorrectChars: (count: number) => void;
	setWordsLeft: (count: number) => void;
	setResults: (result: TestMetrics) => void;
	redoTest: () => void;
	resetTest: () => void;
};

const initialState: TestState = {
	mode: "STANDARD",
	activity: "PENDING",
	activeFilter: {
		name: "Words",
		options: FilterOption["Words"].values,
		value: FilterOption["Words"].values[0],
	},
	selectedFilter: { name: "Words", value: "10" },
	testContent: generateTestContent(Number(FilterOption["Words"].values[0])),
	currWord: { text: "", index: -1 },
	currChar: { text: "", index: 0 },
	totalChars: 0,
	correctChars: 0,
	incorrectChars: 0,
	time: 0,
	wordsLeft: 0,
	results: { grossWPM: 0, netWPM: 0, accuracy: 0, errors: 0 },
};

export const useTestStore = create<TestState & TestActions>()((set, get) => ({
	...initialState,
	setMode: (mode: TestMode) => {
		set({ mode: mode });
	},
	setTestContent: (size: number, content?: string[]) => {
		set({ testContent: content ?? generateTestContent(size) });
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
	setSelectedFilter: (filter: SelectedFilterProps) => {
		set({ selectedFilter: filter });
	},
	setWordsLeft: (count: number) => {
		set({ wordsLeft: count });
	},
	setResults: (result: TestMetrics) => {
		set({ results: result });
	},
	// applyConfig: (cfc: Config) => {
	// set(config: cfg)
	// set({ ...initialState }, activeFilter)
	// },
	redoTest: () => {
		document
			.querySelectorAll(".active-char")
			.forEach((e) => e.classList.remove("active-char"));

		// set((state) => ({
		// 	currWord: { text: state.testContent[0], index: 0 },
		// 	currChar: { text: state.testContent[0][0], index: 0 },
		// 	activity: { status: "PENDING" },
		// 	wordsLeft: 0
		// }))
		set({ ...initialState });
	},
	resetTest: () => {
		// bug when 50+ words is finished, previous text stays hidden at top of the element
		document
			.querySelectorAll(".active-char")
			.forEach((e) => e.classList.remove("active-char"));
		const filterValue = Number(get().activeFilter.value);
		const generatedText: string[] = generateTestContent(
			get().activeFilter.name === "Time" ? filterValue * 10 : filterValue,
		);
		set({ ...initialState, testContent: generatedText });
		// set({ testContent: generatedText, currWord: { text: generatedText[0], index: 0 }, currChar: { text: generatedText[0][0], index: -1 }, time: 0, activity: { status: "PENDING" }, wordsLeft: 0, results: { grossWPM: 0, accuracy: 0, errors: 0 } })
	},
}));
