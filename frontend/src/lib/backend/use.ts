import { backend_ip } from "../constants";

export async function fetchCreateScore(quiz_id: string, name: string) {
	const response = await fetch(`${backend_ip}/score`, {
		method: 'POST',
		body: JSON.stringify({
			quiz_id, 
			name
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return await response.json();
}