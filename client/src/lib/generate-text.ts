import { generate } from "random-words";

export const generateTestContent = (size: number) => {
	return Array.from(generate(size));
}