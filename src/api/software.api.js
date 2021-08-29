import axios from 'axios';

const baseUrl = 'https://soha.sebastianbrosch.de/api';

export async function getSoftware(id) {
	try {
		if (id) {
			const { data } = await axios.get(`${baseUrl}/software/${id}`);
			return [null, data];
		} else {
			const { data } = await axios.get(`${baseUrl}/software`);
			return [null, data];
		}
	} catch (error) {
		return [error];
	}
}

export async function deleteSoftware(id) {
	try {
		await axios.delete(`${baseUrl}/software/${id}`);
	} catch (error) {
		return [error];
	}
}

export async function updateSoftware(id, software) {
	try {
		await axios.put(`${baseUrl}/software/${id}`, software);
	} catch (error) {
		return [error];
	}
}

export async function createSoftware(software) {
	try {
		const { data } = await axios.post(`${baseUrl}/software`, software);
		return [null, data];
	} catch (error) {
		return [error];
	}
}