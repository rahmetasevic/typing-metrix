import React, { useEffect, useState } from "react";
import { BsInputCursor } from "react-icons/bs";

import { FilterOption, SetupMode, TestStatus } from "@constants/index";
import { useTestStore } from "@store/TestStore";
import { Button } from "@components/Shared/Button";

import "./ConfigPanel.scss";

export const ConfigPanel = () => {
	const [activeFilter, activity, setActiveFilter, setTime, setTestContent] =
		useTestStore((state) => [
			state.activeFilter,
			state.activity,
			state.setActiveFilter,
			state.setTime,
			state.setTestContent,
		]);

	useEffect(() => {
		console.log("panel act", activity);
	}, [activity]);

	useEffect(() => {
		console.log("actFil", activeFilter);
	}, [activeFilter]);

	useEffect(() => {
		// let generateCount: number;
		// activeFilter.name === "Time"
		// 	? Number(activeFilter.value) * 10
		// 	: Number(activeFilter.value);
		if (activeFilter.name === "Time") {
			// generateCount = Number(activeFilter.value) * 10;
			setTime(Number(activeFilter.value));
		} else {
			// generateCount = Number(activeFilter.value);
			setTime(0);
		}

		setTestContent();
	}, [activeFilter]);

	function handleFilterSelect(e: React.MouseEvent<HTMLButtonElement>): void {
		const filterName = e.currentTarget.textContent;
		// console.log(filterName);

		if (filterName) {
			document
				.querySelectorAll(".filter__title")
				.forEach((x) => x.classList.remove("filter--highlighted"));
			e.currentTarget.classList.add("filter--highlighted");
			document
				.querySelectorAll(".filter__value")
				.forEach((x) => x.classList.remove("filter--highlighted"));
			e.currentTarget.classList.add("filter--highlighted");
			// document
			// 	.querySelectorAll(".filter__value")
			// 	.forEach((x) =>
			// 		x.classList.remove("filter__value--highlighted"),
			// 	);

			setActiveFilter({
				name: filterName,
				options: FilterOption[filterName]?.values ?? null,
				value: FilterOption[filterName]?.values?.[0] ?? null,
			});
		}
	}

	function handleFilterValue(e: React.MouseEvent<HTMLButtonElement>): void {
		const filterValue = e.currentTarget.textContent;
		// console.log(filterValue);

		if (filterValue) {
			document
				.querySelectorAll(".filter__value")
				.forEach((x) =>
					x.classList.remove("filter__value--highlighted"),
				);
			e.currentTarget.classList.add("filter__value--highlighted");

			setActiveFilter({ ...activeFilter, value: filterValue });
		}
	}

	return (
		<div
			className={`panel ${activity !== TestStatus.Pending ? "hidden" : ""}`}
		>
			<div className="panel__filters">
				<div className="panel__filters__titles">
					{Object.keys(FilterOption).map((filterName, i) => {
						return (
							<Button
								className={`filter__title filter__${filterName.toLowerCase()} ${activeFilter.name === filterName ? "filter--highlighted" : ""}`}
								key={i}
								onClick={handleFilterSelect}
							>
								{filterName}
							</Button>
						);
					})}
				</div>
				<hr
					className={`splitter ${activeFilter.name === "Quotes" ? "invisible" : ""}`}
				/>
				<div
					className={`filter-values ${activeFilter.name === "Quotes" ? "invisible" : ""}`}
				>
					{FilterOption[activeFilter.name]?.values?.map(
						(filterValue, i) => (
							<Button
								className={`filter__value ${activeFilter.value === filterValue ? "filter__value--highlighted" : ""}`}
								key={i}
								onClick={handleFilterValue}
							>
								{filterValue}
							</Button>
						),
					)}
				</div>
			</div>
			<div className="panel__rules">
				<Button>Punctuation</Button>
				<Button>Numbers</Button>
			</div>
			<div className="panel__appearance">
				<Button>
					<BsInputCursor />
				</Button>
			</div>
		</div>
	);
};
