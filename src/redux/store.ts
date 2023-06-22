import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from './features/countries-slice';

export const store = configureStore({
    reducer: {
    	countries: countriesReducer,
    },
});
