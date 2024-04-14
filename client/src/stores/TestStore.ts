import { create } from 'zustand';

import { generateTestContent } from '@lib/generate-text';
import { FilterOption } from '../constants';
import { FilterProps } from 'types/index';

type TestAccuracy = {
	correct: number,
	incorrect: number
}

type TextContent = {
	text: string,
	index: number
}

type TestMetrics = {
	grossWPM: number,
	netWPM: number,
	accuracy: number,
	errors: number
}

type TestStatus = {
	status: "PENDING" | "STARTED" | "STOPPED" | "COMPLETED"
}

type TestState = {
	activity: TestStatus,
	activeFilter: FilterProps,
	testContent: string[],
	currWord: TextContent,
	currChar: TextContent,
	time: number,
	wordsLeft: number,
	totalChars: number,
	correctChars: number,
	incorrectChars: number,
	results: TestMetrics
}

type TestActions = {
	setTestContent: (size: number) => void,
	setWord: (word: string, index: number) => void,
	setChar: (char: string, index: number) => void,
	setTime: (seconds: number) => void,
	setActivity: (status: TestStatus) => void,
	setActiveFilter: (filter: FilterProps) => void,
	setTotalChars: (count: number) => void,
	setCorrectChars: (count: number) => void,
	setIncorrectChars: (count: number) => void,
	setWordsLeft: (count: number) => void,
	setResults: (result: TestMetrics) => void,
	redoTest: () => void,
	resetTest: () => void
}

const initialState: TestState = {
	activity: { status: 'PENDING' },
	activeFilter: { name: 'Words', options: FilterOption['Words'], value: FilterOption['Words'][0] },
	testContent: generateTestContent(Number(FilterOption['Words'][0])),
	currWord: { text: '', index: -1 },
	currChar: { text: '', index: 0 },
	totalChars: 0,
	correctChars: 0,
	incorrectChars: 0,
	time: 0,
	wordsLeft: 0,
	results: { grossWPM: 0, netWPM: 0, accuracy: 0, errors: 0 }
}

export const useTestStore = create<TestState & TestActions>()((set, get) => ({
	...initialState,
	// testContent: initialState.testContent,
	// currWord: { text: initialState.testContent[0], index: 0 },
	// currChar: { text: initialState.testContent[0][0], index: -1 },
	// time: initialState.time,
	// activity: initialState.activity,
	// activeFilter: initialState.activeFilter,
	// wordsLeft: initialState.wordsLeft,
	// results: initialState.results,
	setTestContent: (size: number) => {
		set({ testContent: generateTestContent(size) })
	},
	setWord: (text: string, index: number) => {
		set({ currWord: { text, index } })
	},
	setChar: (char: string, index: number) => {
		set({ currChar: { text: char, index } })
	},
	setTime: (seconds: number) => {
		set({ time: seconds })
	},
	setTotalChars: (count: number) => {
		set({ totalChars: count })
	},
	setActivity: (status: TestStatus) => {
		set({ activity: status });
	},
	setCorrectChars: (count: number) => {
		set({ correctChars: count })
	},
	setIncorrectChars: (count: number) => {
		set({ incorrectChars: count })
	},
	setActiveFilter: (filter: FilterProps) => {
		set({ activeFilter: filter })
	},
	setWordsLeft: (count: number) => {
		set({ wordsLeft: count })
	},
	setResults: (result: TestMetrics) => {
		set({ results: result })
	},
	redoTest: () => {
		document.querySelectorAll('.active-char').forEach(e => e.classList.remove('active-char'));

		// set((state) => ({
		// 	currWord: { text: state.testContent[0], index: 0 },
		// 	currChar: { text: state.testContent[0][0], index: 0 },
		// 	activity: { status: 'PENDING' },
		// 	wordsLeft: 0
		// }))
		set({ ...initialState })
	},
	resetTest: () => {
		// bug when 50+ words is finished, previous text stays hidden at top of the element
		document.querySelectorAll('.active-char').forEach(e => e.classList.remove('active-char'));
		const filterValue = Number(get().activeFilter.value);
		const generatedText: string[] = generateTestContent(get().activeFilter.name === 'Time' ? filterValue * 10 : filterValue);
		set({ ...initialState, testContent: generatedText })
		// set({ testContent: generatedText, currWord: { text: generatedText[0], index: 0 }, currChar: { text: generatedText[0][0], index: -1 }, time: 0, activity: { status: 'PENDING' }, wordsLeft: 0, results: { grossWPM: 0, accuracy: 0, errors: 0 } })
	}
}));
