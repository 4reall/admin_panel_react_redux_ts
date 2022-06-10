import { IFilters, IFiltersStore } from '../types/store';
import { Elements, Statuses } from '../types/enums';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useHttp } from '../hooks/useHttp';
import { FILTERS_URL } from '../constants';

const initialState: IFiltersStore = {
	filters: {
		activeFilter: Elements.ALL,
		elements: [],
	},
	filtersLoadingStatus: Statuses.OK,
};

export const fetchFilters = createAsyncThunk(
	'filters/fetchFilters',
	(): Promise<IFilters> => {
		const { request } = useHttp();
		return request(FILTERS_URL);
	}
);

const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		filtersFetched: (state, action: PayloadAction<IFilters>) => {
			state.filters.activeFilter = action.payload.activeFilter;
			state.filters.elements = action.payload.elements;
			state.filtersLoadingStatus = Statuses.OK;
		},
		filtersChanged: (state, action: PayloadAction<Elements>) => {
			state.filters.activeFilter = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFilters.pending, (state) => {
				state.filtersLoadingStatus = Statuses.LOADING;
			})
			.addCase(fetchFilters.fulfilled, (state, action) => {
				state.filters = action.payload;
				state.filtersLoadingStatus = Statuses.OK;
			})
			.addCase(fetchFilters.rejected, (state) => {
				state.filtersLoadingStatus = Statuses.ERROR;
			})
			.addDefaultCase(() => {});
	},
});

const { actions, reducer } = filtersSlice;

export default reducer;

export const { filtersFetched, filtersChanged } = actions;
