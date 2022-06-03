import { useField } from 'formik';

interface InputProps {
	type: string;
	name: string;
	className?: string;
	placeholder: string;
}

const Input = (props: InputProps) => {
	const [field, meta] = useField(props);
	const error =
		meta.touched && meta.error ? (
			<div className="text-danger fs-6">{meta.error}</div>
		) : null;
	return (
		<div className="mb-md-3 mb-1">
			<label className="d-block form-label fs-4">
				The name of the new hero
				<input {...props} {...field} className="form-select" />
				{error}
			</label>
		</div>
	);
};

export default Input;
