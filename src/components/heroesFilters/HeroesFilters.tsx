import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import classNames from 'classnames';
import { getClassByElement } from '../../helpers/helpers';
import {
	fetchFilters,
	filtersChanged,
	selectAllFilters,
} from '../../store/reducers/filtersSlice';

import { Filters, IFiltersState } from '../../types/store';
import { ElementsClasses } from '../../types/helpers';
import { Statuses } from '../../types/helpers';
import { useAppDispatch } from '../../hooks/hooks';
import store from '../../store/store';

const elementsClasses: ElementsClasses = {
	all: 'btn-sm btn-warning',
	fire: 'btn-sm btn-danger',
	water: 'btn-sm btn-primary',
	wind: 'btn-sm btn-info',
	earth: 'btn-sm btn-success',
};

const HeroesFilters = () => {
	const filters = selectAllFilters(store.getState());
	const { activeFilter, filtersLoadingStatus } = useSelector(
		(state: IFiltersState) => state
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchFilters());
		// eslint-disable-next-line
	}, []);

	const isFetching =
		filtersLoadingStatus === Statuses.LOADING ||
		filtersLoadingStatus === Statuses.ERROR;

	const renderFiltersList = (filters: Filters) => {
		if (filters.length === 0) {
			return <div>There are no filters</div>;
		}

		return filters.map((filter) => {
			const classes = classNames(
				getClassByElement(elementsClasses, filter.element),
				{
					active: activeFilter === filter.element,
				},
				'mx-1 mt-md-1'
			);
			return (
				<button
					onClick={() => dispatch(filtersChanged(filter.element))}
					className={classes}
					key={filter.id}
				>
					{filter.element}
				</button>
			);
		});
	};

	const buttons = !isFetching ? (
		renderFiltersList(filters)
	) : (
		<div>There are no filters</div>
	);

	return (
		<div className="card shadow-lg mt-md-3 mt-2">
			<div className="card-body">
				<p className="card-text text-center mb-md-2">
					Отфильтруйте героев по элементам
				</p>
				<div className="d-flex flex-wrap justify-content-center btn-group">
					{buttons}
				</div>
			</div>
		</div>
	);
};

export default HeroesFilters;
