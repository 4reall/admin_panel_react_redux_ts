import { Filters, IFilter, IFiltersState, RootState } from '../../types/store';
import { Elements, Statuses } from '../../types/helpers';
import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/useHttp';
import { FILTERS_URL } from '../../constants';

const filtersAdapter = createEntityAdapter<IFilter>();

const initialState: IFiltersState = filtersAdapter.getInitialState({
	activeFilter: Elements.ALL,
	filtersLoadingStatus: Statuses.OK,
});

export const fetchFilters = createAsyncThunk(
	'filters/fetchFilters',
	(): Promise<Filters> => {
		const { request } = useHttp();
		return request(FILTERS_URL);
	}
);

const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		filtersChanged: (state, action: PayloadAction<Elements>) => {
			state.activeFilter = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFilters.pending, (state) => {
				state.filtersLoadingStatus = Statuses.LOADING;
			})
			.addCase(fetchFilters.fulfilled, (state, action) => {
				filtersAdapter.setAll(state, action.payload);
				state.filtersLoadingStatus = Statuses.OK;
			})
			.addCase(fetchFilters.rejected, (state) => {
				state.filtersLoadingStatus = Statuses.ERROR;
			})
			.addDefaultCase(() => {});
	},
});

export const { selectAll: selectAllFilters } = filtersAdapter.getSelectors(
	(state: RootState) => state.filters
);

const { actions, reducer } = filtersSlice;

export default reducer;

export const { filtersChanged } = actions;
