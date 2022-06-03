import { useSelector } from 'react-redux';
import { useField } from 'formik';

import { IStore } from '../../../types/store';
import { Elements, Statuses } from '../../../types/enums';

interface SelectProps {
	name: string;
	type: string;
}

const Select = (props: SelectProps) => {
	const [field] = useField(props);
	const { filters, filtersLoadingStatus } = useSelector(
		({ filters }: IStore) => filters
	);

	const isFetching =
		filtersLoadingStatus === Statuses.LOADING ||
		filtersLoadingStatus === Statuses.ERROR;

	const renderOptionsList = (elements: Array<Elements>) => {
		if (elements.length === 0) {
			return <option>There are no elements</option>;
		}

		return elements.map((element, i) => {
			if (element === Elements.ALL) return;
			return (
				<option key={i} value={element}>
					{element}
				</option>
			);
		});
	};

	return (
		<div className="mb-3">
			<label className="d-block form-label">
				Choose the element
				<select
					{...props}
					{...field}
					disabled={isFetching}
					className="form-control"
				>
					{renderOptionsList(filters.elements)}
				</select>
			</label>
		</div>
	);
};

export default Select;
