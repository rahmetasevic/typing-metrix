import { Fragment, useEffect } from "react";

import { Button } from "@components/Shared/Button";
import { useTestConfigStore } from "@store/TestConfigStore";
import { SuggestionProps } from "types";

import "./QuickbarSuggestions.scss";

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
		const sameSuggestion = config[suggestionTitle] === rawSuggestionValue;

		if (!sameSuggestion) {
			setConfig(suggestionTitle, rawSuggestionValue);
		}
	}
	if (suggestions.length === 0) return null;

	return (
		<div className="quickbar__suggestions" onClick={handleSuggestion}>
			{suggestions.map(
				(suggestion: SuggestionProps, suggestionIndex: number) => (
					<Fragment key={suggestionIndex}>
						{Array.isArray(suggestion.values) &&
							suggestion.values.map((suggestionItem: string) => {
								const suggestionHighlight =
									config[suggestion.key!] === suggestionItem
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
