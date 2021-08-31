import axios from 'axios';

const baseUrl = process.env.VUE_APP_API_BASE_URL;

export async function getUsers(id) {
	try {
		if (id) {
			const { data } = await axios.get(`${baseUrl}/users/${id}`);
			return [null, data];
		} else {
			const { data } = await axios.get(`${baseUrl}/users`);
			return [null, data];
		}
	} catch (error) {
		return [error];
	}
}

export async function deleteUser(id) {
	try {
		await axios.delete(`${baseUrl}/users/${id}`);
	} catch (error) {
		return [error];
	}
}

export async function updateUser(id, user) {
	try {
		await axios.put(`${baseUrl}/users/${id}`, user);
	} catch (error) {
		return [error];
	}
}

export async function createUser(user) {
	try {
		const { data } = await axios.post(`${baseUrl}/users`, user);
		return [null, data];
	} catch (error) {
		return [null];
	}
}