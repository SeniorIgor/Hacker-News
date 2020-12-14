import updateNewsList from './news-list';
import updateNewsItem from './news-item';

const reducer = (state, action) => {
	return {
		newsList: updateNewsList(state, action),
		newsItem: updateNewsItem(state, action),
	};
};

export default reducer;