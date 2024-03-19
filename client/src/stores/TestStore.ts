import { create } from 'zustand';

import { generateTestContent } from '../lib/generate-text';
import { FilterProps } from '../types';
import { FilterOption } from '../constants';

type TextContent = {
	text: string,
	index: number
}

type TestState = {
	testContent: string[],
	currWord: TextContent,
	currChar: TextContent,
	time: number,
	isStarted: boolean,
	activeFilter: FilterProps
}

type TestActions = {
	setTestContent: (size: number) => void,
	setWord: (word: string, index: number) => void,
	setChar: (char: string, index: number) => void,
	setTime: (seconds: number) => void,
	setIsStarted: (start: boolean) => void,
	setActiveFilter: (filter: FilterProps) => void,
	redoTest: () => void,
	resetTest: () => void
}

const initialState: TestState = {
	testContent: generateTestContent(Number(FilterOption['Words'][0])),
	currWord: {text: '', index: -1},
	currChar: {text: '', index: -1},
	time: 15,
	isStarted: false,
	activeFilter: {name: 'Words', options: FilterOption['Words'], value: FilterOption['Words'][0]}
}

export const useTestStore = create<TestState & TestActions>()((set, get) => ({
	testContent: initialState.testContent,
	currWord: {text: initialState.testContent[0], index: 0},
	currChar: {text: initialState.testContent[0][0], index: -1},
	time: initialState.time,
	isStarted: initialState.isStarted,
	activeFilter: initialState.activeFilter,
	setTestContent: (size: number) => {
		set({testContent: generateTestContent(size)})
	},
	setWord: (text: string, index: number) => {
		set({currWord: {text, index}})
	},
	setChar: (char: string, index: number) => {
		set({currChar: {text: char, index}})
	},
	setTime: (seconds: number) => {
		set({time: seconds})
	},
	setIsStarted: (start: boolean) => {
		set({isStarted: start})
	},
	setActiveFilter: (filter: FilterProps) => {
		set({activeFilter: filter})
	},
	redoTest: () => {
		document.querySelectorAll('.active-char').forEach(e => e.classList.remove('active-char'));

		set((state) => ({
			currWord: {text: state.testContent[0], index: 0},
			currChar: {text: state.testContent[0][0], index: -1}
		}))
	},
	resetTest: () => {
		document.querySelectorAll('.active-char').forEach(e => e.classList.remove('active-char'));
		const generatedText: string[] = generateTestContent(Number(get().activeFilter.value));
		
		set({testContent: generatedText, currWord: {text: generatedText[0], index: 0}, currChar: {text: generatedText[0][0], index: -1}, isStarted: false})
	}
}));
