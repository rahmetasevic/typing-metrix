import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { addTransition } from "@utils/index";

import "./LayoutWrapper.scss";

export const LayoutWrapper = () => {
	const location = useLocation();

	useEffect(() => {
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
