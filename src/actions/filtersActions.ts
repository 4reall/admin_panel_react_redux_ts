import {
	FILTERS_CHANGED_ACTIVE,
	FILTERS_FETCHED,
	FILTERS_LOADING,
	FILTERS_LOADING_ERROR,
} from '../constants';
import { FiltersActions } from '../types/actions';
import { Elements } from '../types/enums';

export const filtersLoading = (): FiltersActions => {
	return {
		type: FILTERS_LOADING,
	};
};

export const filtersFetched = (filters: Array<Elements>): FiltersActions => {
	return {
		type: FILTERS_FETCHED,
		payload: filters,
	};
};

export const filtersChanged = (element: string): FiltersActions => {
	return {
		type: FILTERS_CHANGED_ACTIVE,
		payload: element,
	};
};

export const filtersLoadingError = (): FiltersActions => {
	return {
		type: FILTERS_LOADING_ERROR,
	};
};
