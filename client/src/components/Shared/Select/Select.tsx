import React from "react";

import { ConfigProperty } from "@store/TestConfigStore";

import "./Select.scss";

export type SelectOption = {
	value: string;
	label?: string;
};

export type SelectProps = {
	config: {
		key: ConfigProperty;
		currentValue: any;
		values: string[];
	};
	onChange?: (property: ConfigProperty, value: string) => void;
};

export const Select = (props: SelectProps) => {
	const { key, currentValue, values } = props.config;
	// console.log("props", props);

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		props.onChange?.(
			event.target.name as ConfigProperty,
			event.target.value,
		);
	};

	return (
		<select onChange={handleChange} value={currentValue} name={key}>
			{values?.map((option) => {
				return (
					<option value={option} key={option}>
						{option}
					</option>
				);
			})}
		</select>
	);
};
