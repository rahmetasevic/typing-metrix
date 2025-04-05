import { IconType } from "react-icons";
import { PiTextAa } from "react-icons/pi";
import { MdOutlineTimer } from "react-icons/md";
import { GrBlockQuote } from "react-icons/gr";
import { VscWholeWord } from "react-icons/vsc";
import { VscSymbolKeyword } from "react-icons/vsc";
import { LuTextCursorInput } from "react-icons/lu";

import { SuggestionProps } from "types";
import { Select } from "@components/Shared/Select";
import { Picker } from "@components/Shared/Picker";
import { Button } from "@components/Shared/Button";
import { ResetConfigButton } from "@components/Shared/Button/ResetConfigButton";

export type FilterOptionKey = "words" | "time" | "quotes";
type FilterOptionProps = {
	[key in FilterOptionKey]: {
		values?: string[] | null;
		icon: IconType;
	};
};

export const FilterOption: FilterOptionProps = {
	words: {
		values: ["10", "25", "50"],
		icon: PiTextAa,
	},
	time: {
		values: ["15", "30", "60"],
		icon: MdOutlineTimer,
	},
	quotes: {
		values: null,
		icon: GrBlockQuote,
	},
} as const;

export const SetupMode = {
	STANDARD: "Standard",
	CUSTOM: "Custom",
} as const;

export enum TestStatus {
	Pending = "PENDING",
	Start = "START",
	Stop = "STOP",
	Finish = "FINISH",
}

export const LayoutType = {
	FLOW: "flow",
	BOX: "box",
	INLINE: "inline",
} as const;
export type LayoutTypeName = (typeof LayoutType)[keyof typeof LayoutType];
type DisplayLayoutProps = {
	name: LayoutTypeName;
	icon: IconType;
};

export const DisplayLayout: DisplayLayoutProps[] = [
	{
		name: LayoutType.FLOW,
		icon: VscSymbolKeyword,
	},
	{
		name: LayoutType.BOX,
		icon: VscWholeWord,
	},
	{
		name: LayoutType.INLINE,
		icon: LuTextCursorInput,
	},
] as const;

export const SYMBOL_CHARS = [
	"!",
	'"',
	"#",
	"$",
	"%",
	"&",
	"'",
	"(",
	")",
	"*",
	"+",
	",",
	"-",
	".",
	"/",
	":",
	";",
	"<",
	"=",
	">",
	"?",
	"@",
	"[",
	"]",
	"^",
	"_",
	"`",
	"{",
	"|",
	"}",
	"~",
] as const;

export const SettingsCategories = {
	APPEARANCE: "appearance",
	TYPING: "typing",
	GENERAL: "general",
	// LAYOUT: "layout",
	// METRICS: "metrics",
	// USER: "user",
} as const;

export const LANGUAGE_OPTIONS = ["english", "spanish"];

export const Suggestions: SuggestionProps[] = [
	{
		type: SettingsCategories.APPEARANCE,
		key: "theme",
		title: "theme",
		description: "list of themes",
		values: [
			"dark",
			"light",
			"catppuccin",
			"koopa beach",
			"sonokai",
			"arc",
			"gruvbox dark",
			"github dark",
			"everforest dark",
			"nightfox",
			"dayfox",
		],
		onlyQuickbar: false,
		element: Select,
	},
	{
		type: SettingsCategories.APPEARANCE,
		key: "fontFamily",
		title: "font family",
		description: "list of fonts",
		values: [
			"Fira Mono",
			"Roboto",
			"Courier New",
			"Droid Sans",
			"Hack",
			"Lato",
			"Montserrat",
		],
		onlyQuickbar: false,
		element: Select,
	},
	{
		type: SettingsCategories.APPEARANCE,
		key: "caret",
		title: "caret",
		description: "current character indicator",
		values: ["none", "default", "block", "bordered", "underscore"],
		onlyQuickbar: false,
		element: Picker,
	},
	{
		type: SettingsCategories.APPEARANCE,
		key: "contentHighlightStyle",
		title: "content highlight",
		description: "content highlight styles",
		values: ["none", "character", "word"],
		onlyQuickbar: false,
		element: Picker,
	},
	{
		type: SettingsCategories.APPEARANCE,
		key: "mistakeHighlightStyle",
		title: "mistakes highlight",
		description: "each mistake/error is higlighted",
		values: ["off", "on"],
		onlyQuickbar: false,
		element: Picker,
	},
	{
		type: SettingsCategories.TYPING,
		key: "movement",
		title: "free movement",
		description: "removal of all previously typed text is allowed",
		values: ["off", "on"],
		onlyQuickbar: false,
		element: Picker,
	},
	{
		type: SettingsCategories.TYPING,
		key: "stopOnError",
		title: "stop on error",
		description:
			"stopping on incorrect character or preventing from proceeding to the next word",
		values: ["off", "character", "word"],
		onlyQuickbar: false,
		element: Picker,
	},
	{
		type: SettingsCategories.TYPING,
		key: "backspaceOption",
		title: "backspace",
		description: "backspace availability",
		values: ["off", "on", "limited"],
		onlyQuickbar: false,
		element: Picker,
	},
	{
		type: SettingsCategories.TYPING,
		title: "mode",
		description: "type of test",
		values: ["words", "time", "quotes"],
		onlyQuickbar: true,
	},
	{
		type: SettingsCategories.TYPING,
		title: "symbols",
		description: "add symbol marks",
		values: ["on", "off"],
		onlyQuickbar: true,
	},
	{
		type: SettingsCategories.TYPING,
		title: "numbers",
		description: "include numbers in test content",
		values: ["on", "off"],
		onlyQuickbar: true,
	},
	{
		type: SettingsCategories.GENERAL,
		key: "language",
		title: "language",
		description: "language of the test content",
		values: LANGUAGE_OPTIONS,
		onlyQuickbar: false,
		element: Select,
	},
	{
		type: SettingsCategories.GENERAL,
		title: "reset configuration",
		description: "reset configuration to the default state",
		values: "reset configuration",
		onlyQuickbar: false,
		element: ResetConfigButton,
	},
] as const;
