import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

import { Button } from "@components/Shared/Button";
import { QUICKBAR_OPTIONS } from "@constants/index";
import { ModalProps } from "types";

import "./QuickbarModal.scss";

export const QuickbarModal = (props: ModalProps) => {
	const { visible, close } = props;
	const [selectedOption, setSelectedOption] = useState<string>("typing");

	function handleSelectOption(e: React.MouseEvent<HTMLDivElement>): void {
		const option = e.currentTarget.textContent;
		console.log(option);

		if (option && option !== selectedOption) {
			document
				.querySelectorAll(".quickbar__option")
				.forEach((x) => x.classList.remove("quickbar--highlighted"));
			e.currentTarget.classList.add("quickbar--highlighted");
			setSelectedOption(option);
		}
	}

	if (!visible) return null;

	return (
		<div
			className={`quickbar ${visible ? "quickbar__show" : ""}`}
			onClick={close}
		>
			<div
				className="quickbar__modal"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="quickbar__search">
					<IoSearchOutline className="quickbar__search--icon" />
					<input type="text" placeholder="type to search..." />
					<Button
						type="button"
						className="quickbar__search--close"
						onClick={close}
					>
						ESC
					</Button>
				</div>
				<div className="quickbar__settings"></div>
				<div className="quickbar__options">
					{QUICKBAR_OPTIONS.map((option) => (
						<div
							className={`quickbar__option ${option === "typing" ? "quickbar--highlighted" : ""}`}
							key={option}
							onClick={handleSelectOption}
						>
							{option}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
