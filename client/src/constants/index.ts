import { IconType } from "react-icons";
import { PiTextAa } from "react-icons/pi";
import { MdOutlineTimer } from "react-icons/md";
import { GrBlockQuote } from "react-icons/gr";

type FilterOptionKey = "Words" | "Time" | "Quotes";
type FilterOptionProps = {
	[key in FilterOptionKey]: {
		values?: string[] | null;
		icon: IconType;
	};
};

export const FilterOption: FilterOptionProps = {
	Words: {
		values: ["10", "25", "50"],
		icon: PiTextAa,
	},
	Time: {
		values: ["15", "30", "60"],
		icon: MdOutlineTimer,
	},
	Quotes: {
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
