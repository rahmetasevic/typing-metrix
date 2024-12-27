import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserPreferences = {
	punctuation: boolean;
	numbers: boolean;
};

type ConfigState = {
	config: UserPreferences;
};

type ConfigActions = {
	setPunctuation: (punctuation: boolean) => void;
	setNumbers: (numbers: boolean) => void;
};

const initialState: ConfigState = {
	config: {
		punctuation: false,
		numbers: false,
	},
};

export const useTestConfigStore = create<ConfigState & ConfigActions>()(
	persist(
		(set, get) => ({
			...initialState,
			setPunctuation: (punctuation: boolean) => {
				set({ config: { ...get().config, punctuation: punctuation } });
			},
			setNumbers: (numbers: boolean) => {
				set({ config: { ...get().config, numbers: numbers } });
			},
		}),
		{
			name: "config-store",
		},
	),
);
