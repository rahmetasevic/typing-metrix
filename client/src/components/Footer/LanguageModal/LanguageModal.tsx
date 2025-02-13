import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdCheck } from "react-icons/md";

import { Button } from "@components/Shared/Button";
import { useTestStore } from "@store/TestStore";
import { ModalProps } from "types";
import { LANGUAGE_OPTIONS } from "@constants/index";

import "./LanguageModal.scss";

export const LanguageModal = (props: ModalProps) => {
	const { visible, close } = props;
	const [searchResult, setSearchResult] = useState<string>("");
	const [filteredLanguages, setFilteredLanguages] =
		useState<string[]>(LANGUAGE_OPTIONS);
	const [language, setLanguage, setTestContent] = useTestStore((state) => [
		state.language,
		state.setLanguage,
		state.setTestContent,
	]);

	function handleSelectLanguage(e: React.MouseEvent<HTMLDivElement>): void {
		const languageName = (e.target as HTMLDivElement).dataset.value;

		if (languageName && languageName !== language) {
			setLanguage(languageName);
			setTestContent();
		}
	}

	function handleSearchResult(e: React.ChangeEvent<HTMLInputElement>): void {
		setSearchResult(e.target.value);

		const result = LANGUAGE_OPTIONS.filter((language) => {
			return language.startsWith(e.target.value);
		});

		setFilteredLanguages(result);
	}

	function closeSearchModal(): void {
		close();
		setSearchResult("");
		setFilteredLanguages(LANGUAGE_OPTIONS);
	}

	if (!visible) return null;

	return (
		<div
			className={`languages ${visible ? "languages__show" : ""}`}
			onClick={closeSearchModal}
		>
			<div
				className="languages__modal"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="languages__search">
					<IoSearchOutline className="languages__search--icon" />
					<input
						type="text"
						value={searchResult}
						onChange={handleSearchResult}
						placeholder="type to search..."
					/>
					<Button
						type="button"
						className="languages__search--close"
						onClick={closeSearchModal}
					>
						ESC
					</Button>
				</div>
				<div
					className="languages__options"
					onClick={handleSelectLanguage}
				>
					{filteredLanguages.map((option: any, i: number) => {
						return (
							<div
								className="languages__language"
								key={`${option}-${i}`}
								data-value={option}
							>
								<span className="language__option">
									{option}
								</span>
								{option === language && (
									<MdCheck
										style={{
											color: "var(--primary)",
										}}
									/>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
