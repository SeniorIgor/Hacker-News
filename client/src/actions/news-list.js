import {
	FETCH_NEWS_REQUEST,
	FETCH_NEWS_SUCCESS,
	FETCH_NEWS_FAILURE
} from '../constants';

const newsRequested = () => {
	return {
		type: FETCH_NEWS_REQUEST,
	}
}

const newsLoaded = (news) => {
	return {
		type: FETCH_NEWS_SUCCESS,
		payload: news
	};
}

const newsError = (error) => {
	return {
		type: FETCH_NEWS_FAILURE,
		payload: error,
	}
}

const fetchNews = (getNews, dispatch) => (isLoading) => {
	if (isLoading) {
		dispatch(newsRequested());
	}

	getNews()
		.then((data) => dispatch(newsLoaded(data)))
		.catch((err) => dispatch(newsError(err)));
}

export {
	fetchNews,
};