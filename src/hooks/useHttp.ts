import { useCallback } from 'react';

export const useHttp = () => {
	// const [process, setProcess] = useState('waiting');

	const request = useCallback(
		async <T>(
			url: string,
			method = 'GET',
			body = null,
			headers = { 'Content-Type': 'application/json' }
		): Promise<T> => {
			// setProcess('loading');

			try {
				const response = await fetch(url, { method, body, headers });

				if (!response.ok) {
					throw new Error(
						`Could not fetch ${url}, status: ${response.status}`
					);
				}
				const res: Promise<T> = await response.json();
				return res;
			} catch (e) {
				// setProcess('error');
				throw e;
			}
		},
		[]
	);

	// const clearError = useCallback(() => {
	// setProcess('loading');
	// }, []);

	return {
		request,
		// clearError,
		// process,
		// setProcess
	};
};
