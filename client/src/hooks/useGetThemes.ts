import { useEffect, useState } from "react";

import { ThemeProps } from "types";

export const useGetThemes = () => {
	const [themes, setThemes] = useState<ThemeProps[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const fetchedThemes = await fetch("/themes/themes.json").then(
					(r) => r.json(),
				);

				setThemes(fetchedThemes);
			} catch (error) {
				console.log("error in getting themes data");
			}
		})();
	}, []);

	return { themes };
};
