import React, { Component, Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { withHackNewsService } from '../components/hoc';
import { fetchNews } from '../actions';
import NewsList from './../components/news-list';
import ErrorIndicator from '../components/error-indicator';

class NewsListContainer extends Component {

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
	}

	update = (isLoading = true) => {
		this.props.fetchNews(isLoading);
	}

	render() {
		const { news, loading, error } = this.props;

		if (error) return <ErrorIndicator />;

		return (
			<NewsList items={news} loading={loading} update={this.update} />
		);
	}
}

const mapMethodsToProps = ({ getAllNews }) => ({ getAllNews });

const mapStateToProps = ({ newsList: { news, loading, error } }) => ({
	news, loading, error
})

const mapDispatchToProps = (dispatch, { getAllNews }) => ({
	fetchNews: fetchNews(getAllNews, dispatch),
})

export default compose(
	withHackNewsService(mapMethodsToProps),
	connect(mapStateToProps, mapDispatchToProps),
)(NewsListContainer);