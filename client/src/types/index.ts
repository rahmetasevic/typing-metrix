import { SettingsCategories } from "@constants/index";

export type FilterProps = {
	name: string;
	options: string[] | null;
	value: string | null;
};

export type ModalProps = {
	visible: boolean;
	close: () => void;
};

type SuggestionCategory =
	(typeof SettingsCategories)[keyof typeof SettingsCategories];
export type SuggestionProps = {
	[key in SuggestionCategory]?: {
		title?: string;
		description: string;
		values: ThemeProps[] | string[];
	}[];
};

export type ThemeProps = {
	name: string;
	backgroundPrimary: string;
	primary: string;
	secondary: string;
	alternate: string;
	textPrimary: string;
	error: string;
};
