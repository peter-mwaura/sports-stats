import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICountries {
	country_iso2: string | null;
	country_key: number;
	country_logo: string;
	country_name: string;
};

const initialState = [
	{
		country_iso2: null,
		country_key: 0,
		country_logo: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Flag-map_of_Kenya.svg",
		country_name: "Kenya",
	} as ICountries,
] as ICountries[];

export const countriesSlice = createSlice({
	name: "countries",
	initialState,
	reducers: {
		addCountries: (state:ICountries[], action:PayloadAction<ICountries[]>) => {
			state = action.payload;
		},
	},
});

export const { addCountries } = countriesSlice.actions;

export default countriesSlice.reducer;
