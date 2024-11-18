import * as React from "react";

export async function useGetText(amount: number) {
	async function getThemes(): Promise<void> {
		try {
			const res = await fetch("/public/themes/themes.json").then((r) =>
				r.json(),
			);

			setThemes(res);
		} catch (error) {
			console.log("error in getting themes data");
		}
	}

	return { isOpen, open, close, toggle };
}
