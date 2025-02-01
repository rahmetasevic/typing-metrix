import { SelectOption } from "@components/Shared/Select";
import { ThemeProps } from "types";

export function shuffleArray(arr: string[]): string[] {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

export function convertToBoolean(x: string): boolean {
	return x === "on" ? true : false;
}

export function addTransition(className: string): void {
	const isHidden = document
		.querySelector(className)
		?.classList.contains("hidden");
	if (!isHidden) {
		document.querySelector(className)?.classList.add("hidden");
		(document.querySelector(className) as HTMLElement).style.opacity = "0";

		setTimeout(() => {
			document.querySelector(className)?.classList.remove("hidden");
			(document.querySelector(className) as HTMLElement).style.opacity =
				"1";
		}, 200);
	}
}

export function filterThemeTitle(themes: ThemeProps[]): any {
	return themes.map((theme) => ({ value: theme.name }));
}
