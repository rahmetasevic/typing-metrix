import { useState } from "react";

import { Button } from "@components/Shared/Button";
import { SettingsCategories, Suggestions } from "@constants/index";
import { SuggestionProps } from "types";
import { SelectedSettingsCategory } from "./SelectedSettingsCategory";

import "./Settings.scss";

type SettingsCategoryValue =
	(typeof SettingsCategories)[keyof typeof SettingsCategories];

export const Settings = () => {
	const [selectedCategory, setSelectedCategory] =
		useState<SettingsCategoryValue>(SettingsCategories.APPEARANCE);
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
				{Object.values(SettingsCategories).map((title) => {
					return (
						<Button
							className={`settings__category ${selectedCategory === title ? "settings__category--highlighted" : ""}`}
							type="button"
							onClick={handleChangeCategory}
							key={title}
						>
							{title}
						</Button>
					);
				})}
			</div>
			<hr className="settings__splitter" />
			<div className="settings__panel">
				<SelectedSettingsCategory
					suggestions={suggestions.filter(
						(suggestion) => suggestion.type === selectedCategory,
					)}
					selectedCategory={selectedCategory}
				/>
			</div>
		</div>
	);
};
