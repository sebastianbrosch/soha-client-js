import axios from 'axios';

const baseUrl = process.env.VUE_APP_API_BASE_URL;

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

export async function getSoftwareComments(id) {
	try {
		const { data } = await axios.get(`${baseUrl}/software/${id}/comments`);
		return [null, data];
	} catch (error) {
		return [error];
	}
}

export async function deleteSoftwareComment(softwareId, commentId) {
	try {
		await axios.delete(`${baseUrl}/software/${softwareId}/comments/${commentId}`);
	} catch (error) {
		return [error];
	}
}

export async function createSoftwareComment(softwareId, comment) {
	try {
		const { data } = await axios.post(`${baseUrl}/software/${softwareId}/comments`, comment);
		return [null, data];
	} catch (error) {
		return [error];
	}
}

export async function getSoftwareFiles(id) {
	try {
		const { data } = await axios.get(`${baseUrl}/software/${id}/files`);
		return [null, data];
	} catch (error) {
		return [error];
	}
}

export async function deleteSoftwareFile(softwareId, fileId) {
	try {
		await axios.delete(`${baseUrl}/software/${softwareId}/files/${fileId}`);
	} catch (error) {
		return [error];
	}
}

export async function createSoftwareFile(softwareId, file) {
	try {
		const { data } = await axios.post(`${baseUrl}/software/${softwareId}/files`, file);
		return [null, data];
	} catch (error) {
		return [error];
	}
}

export async function getSoftwareDocuments(id) {
	try {
		const { data } = await axios.get(`${baseUrl}/software/${id}/documents`);
		return [null, data];
	} catch (error) {
		return [null];
	}
}

export async function deleteSoftwareDocument(softwareId, documentId) {
	try {
		await axios.delete(`${baseUrl}/software/${softwareId}/documents/${documentId}`);
	} catch (error) {
		return [error];
	}
}

export async function createSoftwareDocument(softwareId, document) {
	try {
		const { data } = await axios.post(`${baseUrl}/software/${softwareId}/documents`, document);
		return [null, data];
	} catch (error) {
		return [null];
	}
}