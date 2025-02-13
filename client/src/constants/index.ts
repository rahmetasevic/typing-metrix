import { IconType } from "react-icons";
import { PiTextAa } from "react-icons/pi";
import { MdOutlineTimer } from "react-icons/md";
import { GrBlockQuote } from "react-icons/gr";
import { VscWholeWord } from "react-icons/vsc";
import { BsBodyText } from "react-icons/bs";
import { LuTextCursorInput } from "react-icons/lu";

import { SuggestionProps, ThemeProps } from "types";

type FilterOptionKey = "words" | "time" | "quotes";
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
		icon: BsBodyText,
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

export const PUNCTUATION_CHARS = [
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
	LAYOUT: "layout",
	METRICS: "metrics",
	USER: "user",
} as const;

export const Suggestions: SuggestionProps = {
	[SettingsCategories.APPEARANCE]: [
		{
			title: "theme",
			description: "list of themes",
			values: [], // initialized in component
		},
	],
	[SettingsCategories.TYPING]: [
		{
			description: "type of test",
			values: ["words", "time", "quotes"],
		},
		{
			title: "punctuation",
			description: "add punctuation marks",
			values: ["on", "off"],
		},
		{
			title: "numbers",
			description: "include numbers in test content",
			values: ["on", "off"],
		},
	],
} as const;

export const LANGUAGE_OPTIONS = ["english", "spanish"];
