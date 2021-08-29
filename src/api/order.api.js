import axios from 'axios';

const baseUrl = 'https://soha.sebastianbrosch.de/api';

export async function getOrder() {
	try {
		const { data } = await axios.get(`${baseUrl}/order`);
		return [null, data];
	} catch (error) {
		return [error];
	}
}

export async function deleteOrder(id) {
	try {
		await axios.delete(`${baseUrl}/order/${id}`);
	} catch (error) {
		return [error];
	}
}

export async function doneOrder(id) {
	try {
		await axios.put(`${baseUrl}/order/${id}`, {
			doneAt: new Date()
		});
	} catch (error) {
		return [error];
	}
}

export async function updateOrder(id, order) {
	try {
		await axios.put(`${baseUrl}/order/${id}`, order);
	} catch (error) {
		return [error];
	}
}

export async function createOrder(order) {
	try {
		await axios.post(`${baseUrl}/order`, order);
	} catch (error) {
		return [error];
	}
}