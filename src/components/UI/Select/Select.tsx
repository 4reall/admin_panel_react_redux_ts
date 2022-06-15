import { useField } from 'formik';

import { Filters, RootState } from '../../../types/store';
import { Elements, Statuses } from '../../../types/helpers';
import { useAppSelector } from '../../../hooks/hooks';
import { selectAllFilters } from '../../../store/reducers/filtersSlice';

interface SelectProps {
	name: string;
	type: string;
}

const Select = (props: SelectProps) => {
	const [field] = useField(props);

	const filtersLoadingStatus = useAppSelector(
		(state: RootState) => state.filters.filtersLoadingStatus
	);
	const filters = useAppSelector(selectAllFilters);

	const isFetching =
		filtersLoadingStatus === Statuses.LOADING ||
		filtersLoadingStatus === Statuses.ERROR;

	const renderOptionsList = (filters: Filters) => {
		if (filters.length === 0) {
			return <option>There are no elements</option>;
		}

		return filters.map((filter, i) => {
			if (filter.element === Elements.ALL) return null;
			return (
				<option key={i} value={filter.element}>
					{filter.element}
				</option>
			);
		});
	};

	return (
		<div className="mb-md-3 mb-1">
			<label className="d-block form-label">
				Choose the element
				<select
					{...props}
					{...field}
					disabled={isFetching}
					className="form-control"
				>
					{renderOptionsList(filters)}
				</select>
			</label>
		</div>
	);
};

export default Select;
