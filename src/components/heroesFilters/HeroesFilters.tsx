import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHttp } from '../../hooks/useHttp';

import classNames from 'classnames';
import { getClassByElement } from '../../helpers/helpers';
import { filtersChanged } from '../../reducers/filtersSlice';

import { IStore } from '../../types/store';
import { ElementsClasses } from '../../types/helpers';
import { Elements, Statuses } from '../../types/enums';
import { filtersFetch } from '../../actions/heroesActions';
import { useAppDispatch } from '../../hooks/hooks';

const elementsClasses: ElementsClasses = {
	all: 'btn-sm btn-warning',
	fire: 'btn-sm btn-danger',
	water: 'btn-sm btn-primary',
	wind: 'btn-sm btn-info',
	earth: 'btn-sm btn-success',
};

const HeroesFilters = () => {
	const { filters, filtersLoadingStatus } = useSelector(
		({ filters }: IStore) => filters
	);
	const dispatch = useAppDispatch();
	const { request } = useHttp();

	useEffect(() => {
		dispatch(filtersFetch(request));
		// eslint-disable-next-line
	}, []);

	const isFetching =
		filtersLoadingStatus === Statuses.LOADING ||
		filtersLoadingStatus === Statuses.ERROR;

	const renderFiltersList = (elements: Array<Elements>) => {
		if (elements.length === 0) {
			return <div>There are no filters</div>;
		}

		return elements.map((element, i) => {
			const classes = classNames(
				getClassByElement(elementsClasses, element),
				{
					active: filters.activeFilter === element,
				},
				'mx-1 mt-md-1'
			);
			return (
				<button
					onClick={() => dispatch(filtersChanged(element))}
					className={classes}
					key={i}
				>
					{element}
				</button>
			);
		});
	};

	const buttons = !isFetching ? (
		renderFiltersList(filters.elements)
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
