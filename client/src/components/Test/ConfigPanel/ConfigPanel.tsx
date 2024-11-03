import React, { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { FilterOption, SetupMode } from "@constants/index";
import { useTestStore } from "@store/TestStore";

import "./ConfigPanel.scss";

export const ConfigPanel = () => {
	const [filterName, setFilterName] = useState<string>("Words");

	// const { register, setValue } = useForm();

	function handleFilterSelect(e: React.MouseEvent<HTMLDivElement>): void {
		const filterName = (e.currentTarget as HTMLDivElement).dataset.value;

		if (filterName) {
			document
				.querySelectorAll(".filter")
				.forEach((x) => x.classList.remove("filter--highlighted"));
			(e.target as HTMLDivElement).classList.add("filter--highlighted");
			document
				.querySelectorAll(".filter__value")
				.forEach((x) => x.classList.remove("filter--highlighted"));
			(e.target as HTMLDivElement).classList.add("filter--highlighted");
			document
				.querySelectorAll(".filter__value")
				.forEach((x) =>
					x.classList.remove("filter__value--highlighted"),
				);

			setFilterName(filterName);
		}
	}

	function handleFilterValue(e: React.MouseEvent<HTMLDivElement>): void {
		const filterValue = (e.currentTarget as HTMLDivElement).dataset.value;

		if (filterValue) {
			document
				.querySelectorAll(".filter__value")
				.forEach((x) =>
					x.classList.remove("filter__value--highlighted"),
				);
			(e.target as HTMLDivElement).classList.add(
				"filter__value--highlighted",
			);
		}
	}

	return (
		<div className="standard-mode">
			<div className="filters">
				{Object.keys(FilterOption).map((key, i) => {
					const Icon = FilterOption[key].icon;
					return (
						<div
							className={`filter filter__${key.toLowerCase()}`}
							key={i}
							data-value={key}
							onClick={handleFilterSelect}
						>
							<Icon /> {key}
						</div>
					);
				})}
			</div>
			<div className="filter-values">
				{FilterOption[filterName].values.map((value, i) => (
					<div
						className="filter__value"
						key={i}
						data-value={value}
						onClick={handleFilterValue}
					>
						{value}
					</div>
				))}
			</div>
			<div></div>
		</div>
	);
};
