import { Fragment, useEffect } from "react";

import { Button } from "@components/Shared/Button";
import { useTestConfigStore } from "@store/TestConfigStore";
import { convertToBoolean } from "@utils/index";

import "./QuickbarSuggestions.scss";
import { SuggestionProps } from "types";

export const QuickbarSuggestions = ({ suggestions }) => {
	const [config, setConfig] = useTestConfigStore((state) => [
		state.config,
		state.setConfig,
	]);

	function handleSuggestion(e: React.MouseEvent<HTMLDivElement>): void {
		const suggestionTitle = (e.target as HTMLDivElement).querySelector(
			"span",
		)?.dataset?.value as keyof typeof config;

		const rawSuggestionValue =
			(e.target as HTMLDivElement).querySelector("button")?.dataset
				.value || "";
		const suggestionValue = getSuggestionValue(rawSuggestionValue);
		const sameSuggestion = config[suggestionTitle] === suggestionValue;

		if (!sameSuggestion) {
			setConfig(suggestionTitle, suggestionValue);
		}
	}

	function getSuggestionValue(rawValue: string): boolean | string {
		let suggestionValue: boolean | string;
		if (rawValue === "on" || rawValue === "off") {
			suggestionValue = convertToBoolean(rawValue);
		} else {
			suggestionValue = rawValue.trim();
		}

		return suggestionValue;
	}

	if (suggestions.length === 0) return null;

	return (
		<div className="quickbar__suggestions" onClick={handleSuggestion}>
			{suggestions.map(
				(suggestion: SuggestionProps, suggestionIndex: number) => (
					<Fragment key={suggestionIndex}>
						{suggestion.values.map((suggestionItem: string) => {
							const suggestionValue =
								getSuggestionValue(suggestionItem);
							const suggestionHighlight =
								config[suggestion.key!] &&
								(suggestionValue === true ||
									suggestionValue === config[suggestion.key!])
									? "quickbar__suggestion--highlighted"
									: !config[suggestion.key!] &&
										  suggestionValue === false
										? "quickbar__suggestion--highlighted"
										: null;
							return (
								<div
									className="quickbar__suggestion"
									key={`${suggestion.title}-${suggestionItem}-${suggestionIndex}`}
									data-value={suggestion.key}
									style={{
										backgroundColor: suggestionHighlight
											? "var(--alternate)"
											: "",
									}}
								>
									<span
										className="quickbar__suggestion__title"
										style={{
											color: suggestionHighlight
												? "var(--font-primary)"
												: "",
										}}
										data-value={suggestion.key}
									>
										{suggestion.title
											? `${suggestion.title}`
											: `${suggestion.type}`}
									</span>
									<Button
										className={`quickbar__suggestion__button ${suggestionHighlight}`}
										dataValue={suggestionItem}
									>
										{suggestionItem}
									</Button>
								</div>
							);
						})}
					</Fragment>
				),
			)}
		</div>
	);
};
