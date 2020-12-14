import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import NewsItem from '../components/news-item';
import { withHackNewsService } from './../components/hoc';
import { fetchNewsItem, clearNewsItem } from './../actions';

import ErrorIndicator from './../components/error-indicator';
import Spinner from './../components/spinner';

class NewsItemContainer extends Component {

	componentDidMount() {
		this.update();
		this.setTimer();
	}

	setTimer = () => {
		this.timerId = setTimeout(() => {
			this.update(false);
			this.setTimer();
		}, 60 * 1000);
	};

	componentWillUnmount() {
		clearTimeout(this.timerId);
		this.props.clearNewsItem();
	}

	update = (isLoading = true) => {
		this.props.fetchNewsItem(isLoading);
	}

	render() {
		const { item, loading, error } = this.props;

		if (error) return <ErrorIndicator />;
		if (!item.id && loading) return <Spinner />;

		return <NewsItem item={item} loading={loading} update={this.update} />;
	}
}

const mapMethodsToprops = ({ getNewsItem }) => ({ getNewsItem });

const mapStateToProps = ({ newsItem: { item, loading, error } }) => ({
	item, loading, error,
});

const mapDispatchToProps = (dispatch, { getNewsItem, match }) => ({
	fetchNewsItem: fetchNewsItem(getNewsItem, match.params.newsId, dispatch),
	clearNewsItem: () => dispatch(clearNewsItem()),
})

export default compose(
	withHackNewsService(mapMethodsToprops),
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(NewsItemContainer);