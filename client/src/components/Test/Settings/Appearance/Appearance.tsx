import { useEffect } from "react";

import { ConfigProperty, useTestConfigStore } from "@store/TestConfigStore";
import { SuggestionProps } from "types";

import "./Appearance.scss";

export const Appearance = ({ suggestions }) => {
	const [config, setConfig] = useTestConfigStore((state) => [
		state.config,
		state.setConfig,
	]);

	useEffect(() => {
		// console.log("suggs", suggestions);
		console.log("config", config);
	}, [config]);

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
		<div className="appearance">
			{suggestions.map((category: SuggestionProps) => {
				const { element: Element, onlyQuickbar } = category;

				return (
					<div
						className={`appearance__settings appearance__${category.title}`}
						key={category.title}
					>
						<div
							className={`appearance__info appearance__${category.title}__info`}
						>
							<span className="appearance__title">
								{category.title}
							</span>
							<span className="appearance__description">
								{category.description}
							</span>
						</div>
						<div
							className={`appearance__handler appearance__${category.title}__handler`}
						>
							{!onlyQuickbar ? (
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
							) : null}
						</div>
					</div>
				);
			})}
		</div>
	);
};
