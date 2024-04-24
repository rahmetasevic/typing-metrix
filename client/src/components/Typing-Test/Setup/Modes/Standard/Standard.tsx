import React, { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { FilterOption } from "@constants/index";
import { useTestStore } from "@store/TestStore";

import "./Standard.scss";

export const Standard = () => {
	const [selectedFilter, setSelectedFilter] = useTestStore(
		useShallow((state) => [state.selectedFilter, state.setSelectedFilter])
	);

	// const [selectedFilter, setSelectedFilter] =
	// 	useState<keyof typeof FilterOption>("Words");
	// const [filterValue, setFilterValue] = useState<string>("");

	function handleFilterSelect(e: React.MouseEvent<HTMLDivElement>): void {
		const val = (e.target as HTMLDivElement).dataset.value;

		if (val) {
			document
				.querySelectorAll(".filter")
				.forEach((x) => x.classList.remove("filter--highlighted"));
			(e.target as HTMLDivElement).classList.add("filter--highlighted");
			document
				.querySelectorAll(".filter__value")
				.forEach((x) => x.classList.remove("filter--highlighted"));
			(e.target as HTMLDivElement).classList.add("filter--highlighted");
			// setFilterValue(val);
			// setSelectedFilter(val);
			setSelectedFilter({ name: val, value: "" });
		}
	}

	function handleFilterValue(e: React.MouseEvent<HTMLDivElement>): void {
		const val = (e.target as HTMLDivElement).dataset.value;

		if (val) {
			document
				.querySelectorAll(".filter__value")
				.forEach((x) => x.classList.remove("filter--highlighted"));
			(e.target as HTMLDivElement).classList.add("filter--highlighted");
			// setFilterValue(val);
			setSelectedFilter({ ...selectedFilter, value: val });
		}
	}

	return (
		<div className="standard-mode">
			<div className="filters" onClick={handleFilterSelect}>
				{Object.keys(FilterOption).map((key, i) => (
					<div
						className={`filter filter__${key.toLowerCase()}`}
						key={i}
						data-value={key}
					>
						{key}
					</div>
				))}
			</div>
			<div className="filter-values" onClick={handleFilterValue}>
				{FilterOption[selectedFilter.name].map((value, i) => (
					<div className="filter__value" key={i} data-value={value}>
						{value}
					</div>
				))}
			</div>
			<div></div>
		</div>
	);
};
