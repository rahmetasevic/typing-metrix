import React, { ReactNode } from "react";

import "./Select.scss";
import { ConfigProperty } from "@store/TestConfigStore";

export type SelectOption = {
	value: string;
	label?: string;
};

export type SelectProps = {
	options: SelectOption[];
	value?: string;
	onChange?: (property: ConfigProperty, value: string) => void;
	label?: string;
	placeholder?: string;
};

export const Select = (props: SelectProps) => {
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		props.onChange?.(
			event.target.name as ConfigProperty,
			event.target.value,
		);
	};

	return (
		<select onChange={handleChange} value={props.value} name={props.label}>
			{props.options.map((option) => {
				return (
					<option value={option.value} key={option.value}>
						{option.value}
					</option>
				);
			})}
		</select>
	);
};
