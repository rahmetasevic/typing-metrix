import React, { ReactNode } from "react";

type ButtonProps = {
    className?: string;
    type?: "button" | "submit" | "reset" | undefined;
    children?: ReactNode;
    onClick?: React.MouseEventHandler;
};

export const Button = (props: ButtonProps) => {
    return (
        <button
            className={props.className}
            type={props.type}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};
