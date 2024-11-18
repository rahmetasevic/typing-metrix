export function generateWords(dictionary: string[], amount: number): string[] {
	const x = Math.floor(Math.random() * dictionary.length);
	let y: number;

	if (x + amount > dictionary.length) {
		y = x - amount;
	} else {
		y = x + amount;
	}

	const [start, end] = [Math.min(x, y), Math.max(x, y)];
	return dictionary.slice(start, end);
}

export function generateQuote(quotes: string[]): string[] {
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
		case "time":
			content = generateWords(data, value);
			break;
		case "quotes":
			content = generateQuote(data);
			break;
	}

	return content;
}
