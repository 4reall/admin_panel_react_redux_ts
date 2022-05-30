import { IFilters } from '../types/store';
import { IFiltersFetchAction } from '../types/actions';
import {
	FILTERS_FETCHED,
	FILTERS_FETCHING,
	FILTERS_FETCHING_ERROR,
} from '../constants';
import { Statuses } from '../types/enums';

const initialState: IFilters = {
	filters: [],
	filtersLoadingStatus: Statuses.OK,
};

const filtersReducer = (state = initialState, action: IFiltersFetchAction) => {
	switch (action.type) {
		case FILTERS_FETCHING:
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
		case FILTERS_FETCHING_ERROR:
			return {
				...state,
				filtersLoadingStatus: Statuses.ERROR,
			};
		default:
			return state;
	}
};
export default filtersReducer;
