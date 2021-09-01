import axios from 'axios';

const baseUrl = process.env.VUE_APP_API_BASE_URL;

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

export async function getHardwareComments(id) {
	try {
		const { data } = await axios.get(`${baseUrl}/hardware/${id}/comments`);
		return [null, data];
	} catch (error) {
		return [error];
	}
}

export async function deleteHardwareComment(hardwareId, commentId) {
	try {
		await axios.delete(`${baseUrl}/hardware/${hardwareId}/comments/${commentId}`);
	} catch (error) {
		return [error];
	}
}

export async function createHardwareComment(hardwareId, comment) {
	try {
		const { data } = await axios.post(`${baseUrl}/hardware/${hardwareId}/comments`, comment);
		return [null, data];
	} catch (error) {
		return [error];
	}
}

export async function getHardwareFiles(id) {
	try {
		const { data } = await axios.get(`${baseUrl}/hardware/${id}/files`);
		return [null, data];
	} catch (error) {
		return [error];
	}
}

export async function deleteHardwareFile(hardwareId, fileId) {
	try {
		await axios.delete(`${baseUrl}/hardware/${hardwareId}/files/${fileId}`);
	} catch (error) {
		return [error];
	}
}

export async function createHardwareFile(hardwareId, file) {
	try {
		const { data } = await axios.post(`${baseUrl}/hardware/${hardwareId}/files`, file);
		return [null, data];
	} catch (error) {
		return [error];
	}
}

export async function getHardwareDocuments(id) {
	try {
		const { data } = await axios.get(`${baseUrl}/hardware/${id}/documents`);
		return [null, data];
	} catch (error) {
		return [error];
	}
}

export async function deleteHardwareDocument(hardwareId, documentId) {
	try {
		await axios.delete(`${baseUrl}/hardware/${hardwareId}/documents/${documentId}`);
	} catch (error) {
		return [error];
	}
}

export async function createHardwareDocument(hardwareId, document) {
	try {
		const { data } = await axios.post(`${baseUrl}/hardware/${hardwareId}/documents`, document);
		return [null, data];
	} catch (error) {
		return [error];
	}
}