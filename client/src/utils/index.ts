import { ConfigProperty, useTestConfigStore } from "@store/TestConfigStore";

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

export function transformPropertyValue(
	property: ConfigProperty,
	propertyValue: any,
): string | string[] {
	if (property === "caret") {
		const caretType = getCaretType(propertyValue);
		return caretType;
	} else if (property === "highlightType") {
		const highlightType = getHighlightType(propertyValue);
		return highlightType;
	} else {
		return propertyValue;
	}
}

export function toggleBackspace(property: ConfigProperty, type: string): void {
	const state = useTestConfigStore.getState();

	if (property === "stopOnError") {
	} else {
	}
}

export function getCaretType(caret: string): string {
	// caret animations on start & pending test state
	if (caret === "default") {
		document.documentElement.style.setProperty("--caret-bg", "none");
		document.documentElement.style.setProperty(
			"--caret-bs",
			"-5px 0 0 0 var(--primary)",
		);
		return "verticalLineCaret 1s cubic-bezier(0.215, 0.61, 0.355, 1) forwards infinite";
	} else if (caret === "block") {
		document.documentElement.style.setProperty(
			"--caret-bg",
			"var(--primary)",
		);
		document.documentElement.style.setProperty("--caret-bs", "none");
		return "blockCaret 1s cubic-bezier(0.215, 0.61, 0.355, 1) forwards infinite";
	} else if (caret === "bordered") {
		document.documentElement.style.setProperty("--caret-bg", "none");
		document.documentElement.style.setProperty(
			"--caret-bs",
			"0 0 0 2px var(--primary)",
		);
		return "borderedCaret 1s cubic-bezier(0.215, 0.61, 0.355, 1) forwards infinite";
	} else if (caret === "underscore") {
		document.documentElement.style.setProperty("--caret-bg", "none");
		document.documentElement.style.setProperty(
			"--caret-bs",
			"0 2px 0 0 var(--primary)",
		);
		return "underscoreCaret 1s cubic-bezier(0.215, 0.61, 0.355, 1) forwards infinite";
	} else {
		document.documentElement.style.setProperty("--caret-bg", "none");
		document.documentElement.style.setProperty("--caret-bs", "none");
		return "none";
	}
}

export function getHighlightType(type: string): string[] {
	if (type === "character") {
		document.documentElement.style.setProperty(
			"--highlight-char-type",
			"var(--font-primary)",
		);
		document.documentElement.style.setProperty(
			"--highlight-word-type",
			"var(--secondary)",
		);

		return ["var(--font-primary)", "var(--secondary)"];
	} else if (type === "word") {
		document.documentElement.style.setProperty(
			"--highlight-char-type",
			"var(--font-primary)",
		);
		document.documentElement.style.setProperty(
			"--highlight-word-type",
			"var(--font-primary)",
		);
		return ["var(--font-primary)", "var(--font-primary)"];
	} else {
		document.documentElement.style.setProperty(
			"--highlight-char-type",
			"var(--secondary)",
		);
		document.documentElement.style.setProperty(
			"--highlight-word-type",
			"var(--secondary)",
		);
		return ["var(--secondary)", "var(--secondary)"];
	}
}

export function removeContentHighlights(): void {
	document
		.querySelectorAll(".entered")
		.forEach((e) => e.classList.remove("entered"));

	document
		.querySelectorAll(".active-char")
		.forEach((e) => e.classList.remove("active-char"));
	document
		.querySelectorAll(".entered-char")
		.forEach((e) => e.classList.remove("entered-char"));
}

export function syncState() {
	const state = useTestConfigStore.getState();

	const stateMap = {
		theme: "data-theme",
		fontFamily: "--font",
		caret: "--caret-animation",
		highlightType: ["--highlight-char-type", "--highlight-word-type"],
	};

	Object.entries(stateMap).forEach(([stateKey, styleVar]) => {
		const modifiedPropertyValue = transformPropertyValue(
			stateKey as ConfigProperty,
			state.config[stateKey],
		);

		if (Array.isArray(styleVar)) {
			styleVar.map((style, i) => {
				document.documentElement.style.setProperty(
					style,
					Array.isArray(modifiedPropertyValue)
						? modifiedPropertyValue[i]
						: modifiedPropertyValue,
				);
			});
		} else {
			if (stateKey === "theme") {
				document.documentElement.setAttribute(
					styleVar,
					Array.isArray(modifiedPropertyValue)
						? modifiedPropertyValue[0]
						: modifiedPropertyValue,
				);
			} else {
				document.documentElement.style.setProperty(
					styleVar,
					Array.isArray(modifiedPropertyValue)
						? modifiedPropertyValue[0]
						: modifiedPropertyValue,
				);
			}
		}
	});
}
