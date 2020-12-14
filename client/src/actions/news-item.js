import {
	FETCH_NEWS_ITEM_REQUEST,
	FETCH_NEWS_ITEM_SUCCESS,
	FETCH_NEWS_ITEM_FAILURE,
	CLEAR_NEWS_ITEM,
} from '../constants';

const newsItemRequested = () => {
	return {
		type: FETCH_NEWS_ITEM_REQUEST,
	}
}

const newsItemLoaded = (newsItem) => {
	return {
		type: FETCH_NEWS_ITEM_SUCCESS,
		payload: newsItem
	};
}

const newsItemError = (error) => {
	return {
		type: FETCH_NEWS_ITEM_FAILURE,
		payload: error,
	}
}

const clearNewsItem = () => {
	return {
		type: CLEAR_NEWS_ITEM,
	}
}

const fetchNewsItem = (getItem, itemId, dispatch) => (isLoading) => {
	if (isLoading) {
		dispatch(newsItemRequested());
	}

	getItem(itemId)
		.then((data) => dispatch(newsItemLoaded(data)))
		.catch((err) => dispatch(newsItemError(err)));
}

export {
	fetchNewsItem,
	clearNewsItem,
};