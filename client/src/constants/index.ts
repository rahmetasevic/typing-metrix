import { IconType } from "react-icons";
import { PiTextAa } from "react-icons/pi";
import { MdOutlineTimer } from "react-icons/md";
import { GrBlockQuote } from "react-icons/gr";

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

export const QUICKBAR_OPTIONS = [
	"typing",
	"layout",
	"metrics",
	"appearance",
	"user",
] as const;
