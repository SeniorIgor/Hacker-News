export default class HackNewsService {

	getResource = async (url, method = 'GET', body = null, headers = {}) => {

		if (body) {
			body = JSON.stringify(body);
			headers['Content-Type'] = 'application/json'
		}

		const response = await fetch(url, { method, body, headers });
		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message || `Could not fetch ${url} received ${res.status}`);
		}

		return data
	}

	getAllNews = async () => {
		return await this.getResource(`/api/news`, 'GET');
	}

	getNewsItem = async (newsId) => {
		return await this.getResource(`/api/news/${newsId}`, 'GET');
	}

	getChildComments = async (newsId) => {
		return await this.getResource(`/api/comments/${newsId}`, 'GET');
	}
}