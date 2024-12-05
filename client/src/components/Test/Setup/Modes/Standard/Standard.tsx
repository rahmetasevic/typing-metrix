import React, { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useForm, useFormContext } from "react-hook-form";

import { FilterOption, SetupMode } from "@constants/index";
import { useTestStore } from "@store/TestStore";

import "./Standard.scss";

export const Standard = () => {
	const [filterName, setFilterName] = useState<string>("words");

	// const { register, setValue } = useForm();
	const { register, formState, setValue, getValues } = useFormContext();

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

			setValue("filter", {
				name: filterName,
				value: filterValue,
			});
		}
	}

	return (
		<div className="standard-mode">
			<div className="filters">
				{Object.keys(FilterOption).map((key, i) => {
					const Icon = FilterOption[key].icon;
					return (
						<div
							className={`filter filter__${key}`}
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
