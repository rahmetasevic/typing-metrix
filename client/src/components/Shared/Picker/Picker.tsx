import React from "react";

import { ConfigProperty } from "@store/TestConfigStore";
import { Button } from "../Button";

import "./Picker.scss";

export type SelectOption = {
	value: string;
	label?: string;
};

export type PickerProps = {
	config: {
		key: ConfigProperty;
		currentValue: any;
		values: string[];
	};
	onChange?: (property: ConfigProperty, value: string) => void;
	onClick?: React.MouseEventHandler;
};

export const Picker = (props: PickerProps) => {
	const { key, currentValue, values } = props.config;
	// console.log("props", props);

	return (
		<div className={`picker picker__${key}`}>
			{values.map((val) => (
				<Button
					className={`picker__button ${currentValue === val ? "picker__button--highlighted" : ""}`}
					dataValue={`${key};${val}`}
					onClick={props.onClick}
					key={val}
				>
					{val}
				</Button>
			))}
		</div>
	);
};
