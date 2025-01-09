import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "./index.scss";

document.documentElement.setAttribute(
	"data-theme",
	localStorage.getItem("theme") ?? "dark",
);

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
