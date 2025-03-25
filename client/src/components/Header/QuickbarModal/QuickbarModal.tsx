import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

import { Button } from "@components/Shared/Button";
import { QuickbarSuggestions } from "./QuickbarSuggestions";
import { QuickbarRecents } from "./QuickbarRecents";
import { ModalProps, SuggestionProps } from "types";
import { Suggestions, SettingsCategories } from "@constants/index";

import "./QuickbarModal.scss";

export const QuickbarModal = (props: ModalProps) => {
	const { visible, close } = props;
	const [selectedOption, setSelectedOption] = useState<string>(
		SettingsCategories.APPEARANCE,
	);
	const [searchResult, setSearchResult] = useState<string>("");
	const [suggestions, setSuggestions] =
		useState<SuggestionProps[]>(Suggestions);
	const [filteredSuggestions, setfilteredSuggestions] =
		useState<SuggestionProps[]>(Suggestions);

	function handleSelectOption(e: React.MouseEvent<HTMLDivElement>): void {
		const option = e.currentTarget.textContent;

		if (option && option !== selectedOption) {
			document
				.querySelectorAll(".quickbar__option")
				.forEach((x) => x.classList.remove("quickbar--highlighted"));
			e.currentTarget.classList.add("quickbar--highlighted");
			setSelectedOption(option);
		}
	}

	function handleSearchResult(e: React.ChangeEvent<HTMLInputElement>): void {
		const searchInput = e.target.value;
		setSearchResult(searchInput);

		// const x = suggestions.flatMap((val) => Object.values(val.values));
		// console.log("x", x);

		const filteredSuggestions = suggestions.filter((suggestion) => {
			// console.log("suggestion", suggestion);

			return suggestion.title?.startsWith(searchInput);
			// suggestion.values.filter((value) => {
			// 	// value.startsWith(e.target.value),
			// 	return value.startsWith(e.target.value);
			// })
			// 	||

			// suggestion.values.map((val) => {
			// 	return x.filter((z) => z.startsWith(e.target.value));
			// })
		});

		setfilteredSuggestions(filteredSuggestions);
	}

	function closeSearchModal(): void {
		close();
		setSearchResult("");
	}

	if (!visible) return null;

	return (
		<div
			className={`quickbar ${visible ? "quickbar__show" : ""}`}
			onClick={closeSearchModal}
		>
			<div
				className="quickbar__modal"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="quickbar__search">
					<IoSearchOutline className="quickbar__search--icon" />
					<input
						type="text"
						value={searchResult}
						onChange={handleSearchResult}
						placeholder="type to search..."
					/>
					<Button
						type="button"
						className="quickbar__search--close"
						onClick={closeSearchModal}
					>
						ESC
					</Button>
				</div>
				{/* {searchResult === "" && <QuickbarRecents />} */}
				{searchResult !== "" && (
					<QuickbarSuggestions suggestions={filteredSuggestions} />
				)}
			</div>
		</div>
	);
};
