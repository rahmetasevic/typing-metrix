import React, { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { BsInputCursor } from "react-icons/bs";

import { FilterOption, SetupMode } from "@constants/index";
import { useTestStore } from "@store/TestStore";
import { Button } from "@components/Shared/Button";

import "./ConfigPanel.scss";

export const ConfigPanel = () => {
	const [filterName, setFilterName] = useState<string>("Words");
	const [activeFilter, setActiveFilter] = useTestStore((state) => [
		state.activeFilter,
		state.setActiveFilter,
	]);

	function handleFilterSelect(e: React.MouseEvent<HTMLButtonElement>): void {
		const filterName = e.currentTarget.textContent;
		console.log(filterName);

		if (filterName) {
			document
				.querySelectorAll(".filter__title")
				.forEach((x) => x.classList.remove("filter--highlighted"));
			e.currentTarget.classList.add("filter--highlighted");
			document
				.querySelectorAll(".filter__value")
				.forEach((x) => x.classList.remove("filter--highlighted"));
			e.currentTarget.classList.add("filter--highlighted");
			document
				.querySelectorAll(".filter__value")
				.forEach((x) =>
					x.classList.remove("filter__value--highlighted"),
				);

			setActiveFilter({ ...activeFilter, name: filterName });
		}
	}

	function handleFilterValue(e: React.MouseEvent<HTMLButtonElement>): void {
		const filterValue = e.currentTarget.textContent;
		console.log(filterValue);

		if (filterValue) {
			document
				.querySelectorAll(".filter__value")
				.forEach((x) =>
					x.classList.remove("filter__value--highlighted"),
				);
			e.currentTarget.classList.add("filter__value--highlighted");
		}

		setActiveFilter({ ...activeFilter, value: filterValue });
	}

	return (
		<div className="panel">
			<div className="panel__filters">
				<div className="panel__filters__titles">
					{Object.keys(FilterOption).map((key, i) => {
						return (
							<Button
								className={`filter__title filter__${key.toLowerCase()}`}
								key={i}
								onClick={handleFilterSelect}
							>
								{key}
							</Button>
						);
					})}
				</div>
				<hr className="splitter" />
				<div className="filter-values">
					{FilterOption[activeFilter.name].values.map((value, i) => (
						<Button
							className="filter__value"
							key={i}
							onClick={handleFilterValue}
						>
							{value}
						</Button>
					))}
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
