import { useField } from 'formik';

interface TextareaProps {
	name: string;
	placeholder: string;
	style: object;
}

const Textarea = (props: TextareaProps) => {
	const [field, meta] = useField(props);
	const error =
		meta.touched && meta.error ? (
			<div className="text-danger fs-6">{meta.error}</div>
		) : null;
	return (
		<div className="mb-3">
			<label className="d-block form-label fs-4">
				Description
				<textarea {...field} {...props} className="form-control" />
			</label>
			{error}
		</div>
	);
};

export default Textarea;
