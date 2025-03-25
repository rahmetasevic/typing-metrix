import { useState } from "react";

import { Button } from "@components/Shared/Button";
import { SettingsCategories, Suggestions } from "@constants/index";

import { Appearance } from "./Appearance";

import "./Settings.scss";
import { SuggestionProps } from "types";

type SettingsCategoryValue =
	(typeof SettingsCategories)[keyof typeof SettingsCategories];

export const Settings = () => {
	const [selectedCategory, setSelectedCategory] =
		useState<SettingsCategoryValue>(SettingsCategories.APPEARANCE);
	const settingsComponents = {
		[SettingsCategories.APPEARANCE]: Appearance,
		// [SettingsCategories.TYPING]: TypingSettings,
		// [SettingsCategories.LAYOUT]: LayoutSettings,
		// [SettingsCategories.METRICS]: MetricsSettings,
		// [SettingsCategories.USER]: UserSettings,
	};
	const SelectedSettingsComponent = settingsComponents[selectedCategory];
	const [suggestions, setSuggestions] = useState<SuggestionProps[]>(
		Suggestions.filter(
			(suggestion) => suggestion.type === selectedCategory,
		),
	);

	function handleChangeCategory(
		e: React.MouseEvent<HTMLButtonElement>,
	): void {
		const category = e.currentTarget.textContent as SettingsCategoryValue;
		// console.log(category);

		if (category !== selectedCategory) {
			setSelectedCategory(category);

			const filteredSuggestions = Suggestions.filter(
				(suggestion) => suggestion.type === category,
			);
			setSuggestions(filteredSuggestions);
		}
	}

	return (
		<div className="settings">
			<div className="settings__navigation">
				{/* {Object.values(SettingsCategories).map((title) => { */}
				{/* 	return ( */}
				{/* 		<Button */}
				{/* 			className={`settings__category ${selectedCategory === title ? "settings__category--highlighted" : ""}`} */}
				{/* 			type="button" */}
				{/* 			onClick={handleChangeCategory} */}
				{/* 			key={title} */}
				{/* 		> */}
				{/* 			{title} */}
				{/* 		</Button> */}
				{/* 	); */}
				{/* })} */}
				<Button
					className={`settings__category settings__category--highlighted`}
					type="button"
					onClick={handleChangeCategory}
				>
					{SettingsCategories.APPEARANCE}
				</Button>
			</div>
			<hr className="settings__splitter" />
			<div className="settings__panel">
				<SelectedSettingsComponent suggestions={suggestions} />
			</div>
		</div>
	);
};
