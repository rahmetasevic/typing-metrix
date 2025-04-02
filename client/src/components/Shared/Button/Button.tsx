import React, { ReactNode } from "react";

type ButtonProps = {
	className?: string;
	type?: "button" | "submit" | "reset" | undefined;
	disabled?: boolean;
	dataValue?: string;
	children?: ReactNode;
	onClick?: React.MouseEventHandler;
};

export const Button = (props: ButtonProps) => {
	return (
		<button
			className={props.className}
			type={props.type}
			disabled={props.disabled}
			data-value={props.dataValue}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
};
