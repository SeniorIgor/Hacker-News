const { Router } = require('express');
const { getResource, getAllResources } = require('../utils');

const router = Router();

const mapNewsItem = ({ id, kids = [] }) => ({ id, kids });

const getNestedComments = async (items) => {
	const data = await getAllResources(items);

	return await Promise.all(data.map(async ({ id, by, time, text, kids = [] }) => {
		const comments = (await getNestedComments(kids))
			.sort((a, b) => a.time - b.time)
			.filter(({ text, by, time }) => by && time && text);

		return { id, by, time, text, kids: comments };
	}))
}

router.get('/:commentId', async (req, res) => {
	try {
		const result = mapNewsItem(await getResource(`/item/${req.params.commentId}`));

		const { kids = [] } = result;

		result.kids = (await getNestedComments(kids))
			.sort((a, b) => a.time - b.time)
			.filter(({ text, by, time }) => by && time && text);

		return res.json(result);

	} catch (err) {
		res.status(500).json({
			message: 'Что-то пошло не так, попробуйте снова'
		})
	}
})

module.exports = router;