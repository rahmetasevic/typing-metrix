import { Outlet, useLocation } from "react-router-dom";

import { addTransition } from "@utils/index";

import "./LayoutWrapper.scss";
import { useEffect, useState } from "react";

export const LayoutWrapper = () => {
	const location = useLocation();

	useEffect(() => {
		console.log(location);
		const outlet =
			document.querySelector(".layout-wrapper")?.firstElementChild
				?.classList[0];
		addTransition(`.${outlet}`);
	}, [location]);

	return (
		<div className="layout-wrapper">
			<Outlet />
		</div>
	);
};
