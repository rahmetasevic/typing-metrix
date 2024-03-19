import React, { ReactElement } from 'react';

type ButtonProps = {
	icon: ReactElement
	onClick?: React.MouseEventHandler
}

export const Button = (props: ButtonProps) => {	
	return (
		<button onClick={props.onClick}>
			{props.icon}
		</button>
	)
}
