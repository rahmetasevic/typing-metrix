import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
	getHighlightType,
	getMistakeHighlightStyle,
	setCaretAtts,
} from "@utils/index";
import { LANGUAGE_OPTIONS } from "@constants/index";

type UserPreferences = {
	punctuation: boolean;
	numbers: boolean;
	theme: string;
	fontFamily: string;
	caret: string;
	contentHighlightStyle: string;
	mistakeHighlightStyle: string;
	movement: string;
	stopOnError: string;
	backspaceOption: string;
	language: (typeof LANGUAGE_OPTIONS)[number];
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
	resetConfig: () => void;
};

const initialState: ConfigState = {
	config: {
		punctuation: false,
		numbers: false,
		theme: "dark",
		fontFamily: "Fira Mono",
		caret: "default",
		contentHighlightStyle: "character",
		mistakeHighlightStyle: "off",
		movement: "off",
		stopOnError: "off",
		backspaceOption: "limited",
		language: LANGUAGE_OPTIONS[0],
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
		setCaretAtts(newCaret);
		return newCaret;
	},
	contentHighlightStyle: (style) => {
		const [charType, wordType] = getHighlightType(style);
		document.documentElement.style.setProperty(
			"--highlight-char-type",
			charType,
		);
		document.documentElement.style.setProperty(
			"--highlight-word-type",
			wordType,
		);
		return style;
	},
	mistakeHighlightStyle: (flag) => {
		getMistakeHighlightStyle(flag);
		return flag;
	},
	movement: (isEnabled, setConfig) => {
		setConfig?.("backspaceOption", "on");
		return isEnabled;
	},
	stopOnError: (type, setConfig) => {
		setConfig?.("backspaceOption", "on");
		return type;
	},
	backspaceOption: (option, setConfig) => {
		if (option !== "on") {
			setConfig?.("stopOnError", "off");
			setConfig?.("movement", "off");
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
			resetConfig: () => {
				document.documentElement.setAttribute(
					"data-theme",
					initialState.config.theme,
				);

				set({ ...initialState });
			},
		}),
		{
			name: "config-store",
		},
	),
);

export const isConfigStateChanged = (
	currentState: UserPreferences,
): boolean => {
	return Object.keys(initialState.config).some((key) => {
		return currentState[key] !== initialState.config[key];
	});
};
