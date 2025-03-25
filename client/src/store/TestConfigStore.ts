import { create } from "zustand";
import { persist } from "zustand/middleware";

import { getCaretType, getHighlightType, toggleBackspace } from "@utils/index";

type UserPreferences = {
	punctuation: boolean;
	numbers: boolean;
	theme: string;
	fontFamily: string;
	caret: string;
	highlightType: string;
	stopOnError: string;
	backspaceOption: string;
};

type ConfigState = {
	config: UserPreferences;
};

export type ConfigProperty = keyof UserPreferences;
type ConfigActions = {
	setConfig: <T extends ConfigProperty>(
		property: T,
		value: UserPreferences[T],
	) => void;
};

const initialState: ConfigState = {
	config: {
		punctuation: false,
		numbers: false,
		theme: "dark",
		fontFamily: "Fira Mono",
		caret: "default",
		highlightType: "character",
		stopOnError: "off",
		backspaceOption: "on",
	},
};

export type PropertyHandlers = {
	[T in keyof UserPreferences]: (
		value: UserPreferences[T],
		setConfig?: <T extends keyof UserPreferences>(
			property: T,
			value: UserPreferences[T],
		) => void,
	) => UserPreferences[T];
};

const propertyHandlers: PropertyHandlers = {
	punctuation: (flag) => flag,
	numbers: (flag) => flag,
	theme: (newTheme) => {
		document.documentElement.setAttribute("data-theme", newTheme);
		return newTheme;
	},
	fontFamily: (newFont) => {
		document.documentElement.style.setProperty("--font", newFont);
		return newFont;
	},
	caret: (newCaret) => {
		document.documentElement.style.setProperty(
			"--caret-animation",
			getCaretType(newCaret),
		);
		return newCaret;
	},
	highlightType: (newHighlightType) => {
		const [charType, wordType] = getHighlightType(newHighlightType);
		document.documentElement.style.setProperty(
			"--highlight-char-type",
			charType,
		);
		document.documentElement.style.setProperty(
			"--highlight-word-type",
			wordType,
		);
		return newHighlightType;
	},
	stopOnError: (type, setConfig) => {
		toggleBackspace("stopOnError", type);
		if (type !== "off") {
			setConfig?.("backspaceOption", "on");
		}
		return type;
	},
	backspaceOption: (option, setConfig) => {
		toggleBackspace("backspaceOption", option);
		if (option !== "off") {
			setConfig?.("stopOnError", "off");
		}
		return option;
	},
};

export const useTestConfigStore = create<ConfigState & ConfigActions>()(
	persist(
		(set, get) => ({
			...initialState,
			setConfig: (property, value) => {
				set(() => {
					const handler = propertyHandlers[property];

					function setCustomConfig<T extends keyof UserPreferences>(
						prop: T,
						val: UserPreferences[T],
					): void {
						set((state) => ({
							config: {
								...state.config,
								[prop]: val,
							},
						}));
					}

					// Call the handler with the custom `setConfig`
					const processedValue = handler
						? handler(value, setCustomConfig)
						: value;

					// Update the `config` object
					const updatedConfig = {
						...get().config,
						[property]: processedValue,
					};

					return { config: updatedConfig };
				});
			},
		}),
		{
			name: "config-store",
		},
	),
);
