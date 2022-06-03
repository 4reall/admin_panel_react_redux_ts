import { IFilters } from '../types/store';
import { FiltersActions } from '../types/actions';
import {
	FILTERS_CHANGED_ACTIVE,
	FILTERS_FETCHED,
	FILTERS_LOADING,
	FILTERS_LOADING_ERROR,
} from '../constants';
import { Elements, Statuses } from '../types/enums';

const initialState: IFilters = {
	filters: {
		activeFilter: Elements.ALL,
		elements: [],
	},
	filtersLoadingStatus: Statuses.OK,
};

const filtersReducer = (state = initialState, action: FiltersActions) => {
	switch (action.type) {
		case FILTERS_LOADING:
			return {
				...state,
				filtersLoadingStatus: Statuses.LOADING,
			};
		case FILTERS_FETCHED:
			return {
				...state,
				filters: action.payload,
				filtersLoadingStatus: Statuses.OK,
			};
		case FILTERS_CHANGED_ACTIVE:
			return {
				...state,
				filters: {
					activeFilter: action.payload,
					elements: state.filters.elements,
				},
				filtersLoadingStatus: Statuses.OK,
			};
		case FILTERS_LOADING_ERROR:
			return {
				...state,
				filtersLoadingStatus: Statuses.ERROR,
			};
		default:
			return state;
	}
};
export default filtersReducer;
