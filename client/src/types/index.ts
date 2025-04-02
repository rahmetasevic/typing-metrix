import { SettingsCategories } from "@constants/index";
import { ConfigProperty } from "@store/TestConfigStore";

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
	type: SuggestionCategory;
	key?: ConfigProperty;
	title: string;
	description: string;
	values: string[] | string;
	onlyQuickbar: boolean;
	element?: any;
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
