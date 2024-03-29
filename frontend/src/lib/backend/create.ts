import { backend_ip } from "../constants";

export async function fetchCreateQuiz(words: string[]) {
	const response = await fetch(`${backend_ip}/quiz`, {
		method: 'POST',
		body: JSON.stringify({
			words
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return await response.json();
}

export async function fetchStats() {
	const response = await fetch(`${backend_ip}/scores`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return await response.json();
}