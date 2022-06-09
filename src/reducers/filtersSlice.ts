import { IFilters, IFiltersStore } from '../types/store';
import { Elements, Statuses } from '../types/enums';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IFiltersStore = {
	filters: {
		activeFilter: Elements.ALL,
		elements: [],
	},
	filtersLoadingStatus: Statuses.OK,
};

const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		filtersLoading: (state) => {
			state.filtersLoadingStatus = Statuses.LOADING;
		},
		filtersFetched: (state, action: PayloadAction<IFilters>) => {
			state.filters.activeFilter = action.payload.activeFilter;
			state.filters.elements = action.payload.elements;
			state.filtersLoadingStatus = Statuses.OK;
		},
		filtersChanged: (state, action: PayloadAction<Elements>) => {
			state.filters.activeFilter = action.payload;
		},
		filtersLoadingError: (state) => {
			state.filtersLoadingStatus = Statuses.ERROR;
		},
	},
});

const { actions, reducer } = filtersSlice;

export default reducer;

export const {
	filtersLoading,
	filtersFetched,
	filtersChanged,
	filtersLoadingError,
} = actions;
