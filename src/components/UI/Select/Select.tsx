import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IFilters, IStore } from '../../../types/store';
import { useHttp } from '../../../hooks/useHttp';
import {
	filtersFetched,
	filtersFetching,
	filtersFetchingError,
} from '../../../actions';
import { FILTERS_URL } from '../../../constants';
import { Elements, Statuses } from '../../../types/enums';

interface SelectProps {
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
	require?: string;
	name: string;
	className?: string;
}

const Select = ({
	setValue,
	name,
	className = 'form-select',
	...props
}: SelectProps) => {
	const { filters, filtersLoadingStatus } = useSelector(
		({ filters }: IStore) => filters
	);
	const dispatch = useDispatch();
	const { request } = useHttp();

	useEffect(() => {
		dispatch(filtersFetching());
		request<IFilters>(FILTERS_URL)
			.then((data) => dispatch(filtersFetched(data)))
			.catch(() => dispatch(filtersFetchingError()));

		// eslint-disable-next-line
	}, []);

	const isFetching =
		filtersLoadingStatus === Statuses.LOADING ||
		filtersLoadingStatus === Statuses.ERROR;

	const renderOptionsList = (arr: Array<Elements>) => {
		if (arr.length === 0) {
			return <option>There are no elements</option>;
		}

		return arr.map((element, i) => {
			return (
				<option key={i} value={element}>
					{element}
				</option>
			);
		});
	};

	return (
		<div className="mb-3">
			<label htmlFor={name} className="form-label">
				Choose the element
			</label>
			<select
				disabled={isFetching}
				{...props}
				onChange={(e) => setValue(e.target.value)}
				className={className}
				id={name}
				name={name}
			>
				{renderOptionsList(filters)}
			</select>
		</div>
	);
};

export default Select;
