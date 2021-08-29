import axios from 'axios';

const baseUrl = 'https://soha.sebastianbrosch.de/api';

export async function getHardware(id) {
	try {
		if (id) {
			const { data } = await axios.get(`${baseUrl}/hardware/${id}`);
			return [null, data];
		} else {
			const { data } = await axios.get(`${baseUrl}/hardware`);
			return [null, data];
		}
	} catch (error) {
		return [error];
	}
}

export async function deleteHardware(id) {
	try {
		await axios.delete(`${baseUrl}/hardware/${id}`);
	} catch (error) {
		return [error];
	}
}

export async function updateHardware(id, hardware) {
	try {
		await axios.put(`${baseUrl}/hardware/${id}`, hardware);
	} catch (error) {
		return [error];
	}
}

export async function createHardware(hardware) {
	try {
		await axios.post(`${baseUrl}/hardware`, hardware);
	} catch (error) {
		return [error];
	}
}