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
		const caretType = setCaretAtts(propertyValue);
		return caretType;
	} else if (property === "contentHighlightStyle") {
		const highlightType = getHighlightType(propertyValue);
		return highlightType;
	} else if (property === "mistakeHighlightStyle") {
		const style = getMistakeHighlightStyle(propertyValue);
		return style;
	} else {
		return propertyValue;
	}
}

export function setCaretAtts(caret: string): string[] {
	// caret animations on start & pending test state
	if (caret === "default") {
		document.documentElement.style.setProperty("--caret-width", "3px");
		document.documentElement.style.setProperty("--caret-height", "33px");
		document.documentElement.style.setProperty(
			"--caret-bgc",
			"var(--primary)",
		);
		document.documentElement.style.setProperty("--caret-bradius", "5px");
		document.documentElement.style.setProperty("--caret-border", "none");
		document.documentElement.style.setProperty("--caret-borderbtm", "none");
		return ["3px", "33px", "var(--primary)", "5px", "none", "none"];
	} else if (caret === "block") {
		document.documentElement.style.setProperty("--caret-width", "17px");
		document.documentElement.style.setProperty("--caret-height", "33px");
		document.documentElement.style.setProperty(
			"--caret-bgc",
			"var(--primary)",
		);
		document.documentElement.style.setProperty("--caret-bradius", "5px");
		document.documentElement.style.setProperty("--caret-border", "none");
		document.documentElement.style.setProperty("--caret-borderbtm", "none");
		return ["17px", "33px", "var(--primary)", "5px", "none", "none"];
	} else if (caret === "bordered") {
		document.documentElement.style.setProperty("--caret-width", "17px");
		document.documentElement.style.setProperty("--caret-height", "36px");
		document.documentElement.style.setProperty(
			"--caret-bgc",
			"transparent",
		);
		document.documentElement.style.setProperty("--caret-bradius", "5px");
		document.documentElement.style.setProperty(
			"--caret-border",
			"2px solid var(--primary)",
		);
		document.documentElement.style.setProperty(
			"--caret-borderbtm",
			"2px solid var(--primary)",
		);
		return [
			"17px",
			"36px",
			"transparent",
			"5px",
			"2px solid var(--primary)",
			"2px solid var(--primary)",
		];
	} else if (caret === "underscore") {
		document.documentElement.style.setProperty("--caret-width", "17px");
		document.documentElement.style.setProperty("--caret-height", "36px");
		document.documentElement.style.setProperty(
			"--caret-bgc",
			"transparent",
		);
		document.documentElement.style.setProperty("--caret-bradius", "0");
		document.documentElement.style.setProperty("--caret-border", "none");
		document.documentElement.style.setProperty(
			"--caret-borderbtm",
			"2px solid var(--primary)",
		);
		return [
			"17px",
			"36px",
			"transparent",
			"0",
			"none",
			"2px solid var(--primary)",
		];
	} else {
		document.documentElement.style.setProperty("--caret-width", "0");
		document.documentElement.style.setProperty("--caret-height", "0");
		document.documentElement.style.setProperty(
			"--caret-bgc",
			"transparent",
		);
		document.documentElement.style.setProperty("--caret-bradius", "0");
		document.documentElement.style.setProperty("--caret-border", "none");
		document.documentElement.style.setProperty("--caret-borderbtm", "none");
		return ["0", "0", "transparent", "0", "none", "none"];
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

export function getMistakeHighlightStyle(flag: string): string {
	if (flag === "on") {
		document.documentElement.style.setProperty(
			"--incorrect-color",
			"var(--error-primary)",
		);

		return "var(--error-primary)";
	} else {
		document.documentElement.style.setProperty(
			"--incorrect-color",
			"var(--font-primary)",
		);
		return "var(--font-primary)";
	}
}

export function removeContentHighlights(): void {
	document
		.querySelectorAll(".entered")
		.forEach((e) => e.classList.remove("entered"));
	document
		.querySelectorAll(".active-char")
		.forEach((e) =>
			e.classList.remove("active-char", "incorrect", "correct"),
		);
	document
		.querySelectorAll(".entered-char")
		.forEach((e) => e.classList.remove("entered-char"));
}

export function syncState() {
	const state = useTestConfigStore.getState();
	const stateMap = {
		theme: "data-theme",
		fontFamily: "--font",
		caret: [
			"--caret-width",
			"--caret-height",
			"--caret-bgc",
			"--caret-bradius",
			"--caret-border",
			"--caret-borderbtm",
		],
		contentHighlightStyle: [
			"--highlight-char-type",
			"--highlight-word-type",
		],
		mistakeHighlightStyle: "--incorrect-color",
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
