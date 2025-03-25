import { useEffect } from "react";

import { ConfigProperty, useTestConfigStore } from "@store/TestConfigStore";
import { SuggestionProps } from "types";

import "./SelectedSettingsCategory.scss";

export const SelectedSettingsCategory = ({ suggestions, selectedCategory }) => {
	const [config, setConfig] = useTestConfigStore((state) => [
		state.config,
		state.setConfig,
	]);

	useEffect(() => {
		// console.log("suggs", suggestions);
		console.log("config", config);
		console.log("selected cat", selectedCategory);
	}, [config, selectedCategory]);

	function handleChange(property: ConfigProperty, value: string): void {
		setConfig(property, value);
	}

	function handlePicker(e: React.MouseEvent<HTMLButtonElement>): void {
		const [property, newValue] =
			e.currentTarget.dataset.value?.split(";") || [];
		// console.log("property, newVal", property, newValue);
		setConfig(property as ConfigProperty, newValue);
	}

	return (
		<div className={`${selectedCategory} selected-category`}>
			{suggestions
				.filter(
					(suggestion: SuggestionProps) => !suggestion.onlyQuickbar,
				)
				.map((category: SuggestionProps) => {
					const { element: Element } = category;

					return (
						<div
							className={`selected-category__settings ${selectedCategory}__${category.title}`}
							key={category.title}
						>
							<div
								className={`selected-category__info ${selectedCategory}__${category.title}__info`}
							>
								<span className="selected-category__title">
									{category.title}
								</span>
								<span className="selected-category__description">
									{category.description}
								</span>
							</div>
							<div
								className={`selected-category__handler ${selectedCategory}__${category.title}__handler`}
							>
								<Element
									config={{
										key: category.key,
										currentValue: config[category.key!],
										values: category.values,
									}}
									onChange={handleChange}
									onClick={handlePicker}
									key={category.title}
								/>
							</div>
						</div>
					);
				})}
		</div>
	);
};
