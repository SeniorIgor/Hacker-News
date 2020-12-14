import {
	FETCH_NEWS_ITEM_REQUEST,
	FETCH_NEWS_ITEM_SUCCESS,
	FETCH_NEWS_ITEM_FAILURE,
	CLEAR_NEWS_ITEM,
} from '../constants';

const updateNewsItem = (state, action) => {

	if (state === undefined) {
		return {
			item: {},
			loading: true,
			error: null,
		};
	}

	switch (action.type) {
		case FETCH_NEWS_ITEM_REQUEST:
			return {
				...state.newsItem,
				loading: true,
				error: null,
			}
		case FETCH_NEWS_ITEM_SUCCESS:
			return {
				item: action.payload,
				loading: false,
				error: null,
			}
		case FETCH_NEWS_ITEM_FAILURE:
			return {
				item: {},
				loading: false,
				error: action.payload,
			}
		case CLEAR_NEWS_ITEM:
			return {
				...state.newsItem,
				item: {},
			}

		default:
			return state.newsItem;
	}
}

export default updateNewsItem;