import { SYMBOL_CHARS } from "@constants/index";
import { useTestConfigStore } from "@store/TestConfigStore";
import { shuffleArray } from "@utils/index";

export function generateWords(dictionary: string[], amount: number): string[] {
	const config = useTestConfigStore.getState().config;
	let randNums: string[] = [];
	let randChars: string[] = [];

	if (config.numbers) {
		const numAmount = Math.floor(Math.random() * (amount / 2 - 1) + 1);
		randNums = Array.from(
			{ length: numAmount },
			() => `${Math.floor(Math.random() * 1000)}`,
		);
	}

	const x = Math.floor(Math.random() * dictionary.length);
	let y: number;

	if (x + amount > dictionary.length) {
		y = x - (amount - randNums.length);
	} else {
		y = x + (amount - randNums.length);
	}
	const [start, end] = [Math.min(x, y), Math.max(x, y)];
	let wordContent = dictionary.slice(start, end);

	if (config.symbols) {
		const punctAmount = Math.floor(Math.random() * (amount / 2) + 1);
		randChars = Array.from(
			{ length: punctAmount },
			() =>
				SYMBOL_CHARS[
					Math.floor(Math.random() * SYMBOL_CHARS.length) + 1
				],
		);
		wordContent = wordContent.map((word, i) =>
			word.concat(randChars[i] || ""),
		);
	}

	return shuffleArray([...randNums, ...wordContent]);
}

export function generateQuote(quotes: string[]): string[] {
	if (quotes.length < 1) {
		return [];
	}

	return quotes[Math.floor(Math.random() * quotes.length)]["quote"].split(
		" ",
	);
}

export function generateContent(
	data: string[],
	filter: {
		name: string;
		value: number;
	},
): string[] {
	const { name, value } = filter;
	let content: string[] = [];

	switch (name) {
		case "words":
			content = generateWords(data, value);
			break;
		case "time":
			// Words Needed=(Average WPM×Test Duration (minutes))+Buffer Words
			const time = value / 60;
			const amount = Math.floor(305 * time + 305 * time * 0.1);
			content = generateWords(data, amount);
			break;
		case "quotes":
			content = generateQuote(data);
			break;
		default:
			break;
	}

	return content;
}
