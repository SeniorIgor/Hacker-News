const fetch = require("node-fetch");
const config = require('config');

const jsonQuery = config.get('jsonQuery')
const apiBase = config.get('apiBase')

module.exports = {
	async getResource(url) {
		const res = await fetch(`${apiBase}${url}${jsonQuery}`);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, received ${res.status}`);
		}

		return await res.json();
	},

	async getAllResources(items, isSort = false) {
		if (!items || items.length === 0) return [];

		const data = [];

		items.forEach((id) => {
			const item = fetch(`${apiBase}/item/${id}${jsonQuery}`)
				.then((response) => {
					if (!response.ok) {
						return null;
					} else {
						return response.json();
					}
				})
				.catch(() => null);

			data.push(item);
		});

		return (await Promise.all(data)).filter((item) => item);
	}
}