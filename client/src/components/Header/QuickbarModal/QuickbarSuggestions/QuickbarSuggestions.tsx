import { Fragment, useEffect } from "react";

import { Button } from "@components/Shared/Button";
import { useTestConfigStore } from "@store/TestConfigStore";
import { convertToBoolean } from "@utils/index";

import "./QuickbarSuggestions.scss";

export const QuickbarSuggestions = ({ suggestions }) => {
	const [config, setConfig] = useTestConfigStore((state) => [
		state.config,
		state.setConfig,
	]);

	// useEffect(() => {
	// 	console.log(suggestions);
	// 	console.log("cfg", config);
	// }, [suggestions]);

	function handleSuggestion(e: React.MouseEvent<HTMLDivElement>): void {
		const suggestionTitle = (e.target as HTMLDivElement)
			.querySelector("span")
			?.dataset?.value?.toLowerCase() as keyof typeof config;
		const suggestionValue = convertToBoolean(
			(e.target as HTMLDivElement).querySelector("button")?.dataset
				.value || "",
		);

		const isSuggestionActive = config[suggestionTitle] === suggestionValue;

		if (!isSuggestionActive) {
			// console.log("sT", suggestionTitle);
			// console.log("sV", suggestionValue);
			setConfig(suggestionTitle, suggestionValue);
		}
	}

	if (suggestions.length === 0) return null;

	return (
		<div className="quickbar__suggestions" onClick={handleSuggestion}>
			{suggestions.map((suggestion, i) => (
				<Fragment key={i}>
					{suggestion.values.map((val: string, valIndex: number) => {
						const getActiveSugg =
							config[suggestion.title] && val === "on"
								? "quickbar__suggestion--highlighted"
								: !config[suggestion.title] && val === "off"
									? "quickbar__suggestion--highlighted"
									: "";
						return (
							<div
								className="quickbar__suggestion"
								key={`${suggestion.title}-${val}-${i}`}
								data-value={suggestion.title}
							>
								<span
									className="quickbar__suggestion__title"
									data-value={suggestion.title}
								>
									{suggestion.title
										? `${suggestion.title}`
										: `${suggestion.type}`}
								</span>
								<Button
									className={`quickbar__suggestion__button ${getActiveSugg}`}
									dataValue={val}
								>
									{val}
								</Button>
							</div>
						);
					})}
				</Fragment>
			))}
		</div>
	);
};
