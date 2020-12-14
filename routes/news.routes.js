const { Router } = require('express');
const { getResource, getAllResources } = require('../utils');

const router = Router();

const mapNewsItem = ({ id, title, score, by, time, url, descendants, kids = [] }) => ({
	id, title, score, by, time, url, descendants, kids
});

const mapCommentList = (comments) => {
	return comments
		.filter(({ text, by, time }) => by && time && text)
		.sort((a, b) => a.time - b.time)
		.map(({ id, text, by, time, kids }) => ({
			id, text, by, time, kids, updateTime: Date.now(),
		}));
}

const mapNewsList = (newsList) => {
	return newsList.map(({ id, title, score, by, time, url }) => ({
		id, title, score, by, time, url,
	})).sort((a, b) => b.time - a.time);
}

router.get('/', async (req, res) => {
	try {
		const result = await getResource(`/newstories`);
		const data = mapNewsList(await getAllResources(result.slice(0, 100)));

		return res.json(data);

	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Что-то пошло не так, попробуйте снова'
		})
	}
})

router.get('/:newsId', async (req, res) => {
	try {
		const result = mapNewsItem(await getResource(`/item/${req.params.newsId}`));
		const { kids = [] } = result;

		result.kids = [];

		if (!kids) return res.json(result);

		result.kids = mapCommentList(await getAllResources(kids));

		return res.json(result);

	} catch (err) {
		res.status(500).json({
			message: 'Что-то пошло не так, попробуйте снова'
		})
	}
})

module.exports = router;