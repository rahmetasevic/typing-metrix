import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import { syncState } from "@utils/index.ts";

import "./index.scss";

syncState();

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
