import axios from 'axios';

const baseUrl = process.env.VUE_APP_API_BASE_URL;

export async function signin(credentials) {
	try {
		const { data } = await axios.post(`${baseUrl}/signin`, credentials);
		return [null, data];
	} catch (error) {
		return [error];
	}
}

export function signup(credentials) {
	try {
		const { token, user } = axios.post(`${baseUrl}/signup`, credentials);
		return [null, {
			token: token,
			user: user
		}];
	} catch (error) {
		return [error];
	}
}
