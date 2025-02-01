import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserPreferences = {
	punctuation: boolean;
	numbers: boolean;
	theme: string;
};

type ConfigState = {
	config: UserPreferences;
};

export type ConfigProperty = keyof UserPreferences;
type ConfigActions = {
	setConfig: (property: ConfigProperty, value: any) => void;
	// setPunctuation: (punctuation: boolean) => void;
	// setNumbers: (numbers: boolean) => void;
};

const initialState: ConfigState = {
	config: {
		punctuation: false,
		numbers: false,
		theme: localStorage.getItem("theme") ?? "dark",
	},
};

export const useTestConfigStore = create<ConfigState & ConfigActions>()(
	persist(
		(set, get) => ({
			...initialState,
			// setPunctuation: (punctuation: boolean) => {
			// 	set({ config: { ...get().config, punctuation: punctuation } });
			// },
			// setNumbers: (numbers: boolean) => {
			// 	set({ config: { ...get().config, numbers: numbers } });
			// },
			setConfig: (property, value) =>
				set({
					config: {
						...get().config,
						[property]: value, // Dynamically update the property
					},
				}),
		}),
		{
			name: "config-store",
		},
	),
);
