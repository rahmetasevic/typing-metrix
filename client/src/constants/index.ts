import { IconType } from "react-icons";
import { PiTextAa } from "react-icons/pi";
import { MdOutlineTimer } from "react-icons/md";
import { GrBlockQuote } from "react-icons/gr";

export const FilterOption: {
	[key: string]: { values: string[]; icon: IconType };
} = {
	Words: {
		values: ["10", "25", "50"],
		icon: PiTextAa,
	},
	Time: {
		values: ["15", "30", "60"],
		icon: MdOutlineTimer,
	},
	Quotes: {
		values: ["short", "medium", "large"],
		icon: GrBlockQuote,
	},
} as const;

export const SetupMode = {
	STANDARD: "Standard",
	CUSTOM: "Custom",
} as const;
