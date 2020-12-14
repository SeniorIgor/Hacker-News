import React, { Fragment, Component } from 'react';

import NestedComment from '../components/nested-comment';
import ErrorIndicator from '../components/error-indicator';
import Spinner from '../components/spinner';
import { withHackNewsService } from '../components/hoc';

class NestedCommentContainer extends Component {

	_isMounted = false;

	state = {
		comment: {},
		loading: false,
		error: null,
	}

	componentDidMount() {
		this._isMounted = true;
		this.fetchMoreComments();
	}

	componentDidUpdate(prevProps) {
		const { item } = this.props;

		if (prevProps.item.updateTime && prevProps.item.updateTime !== item.updateTime) {
			this.fetchMoreComments(false);
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	fetchMoreComments = (isLoading = true) => {
		const { item } = this.props;

		(isLoading) ? this.setState({ loading: true, error: null }) :
			this.setState({ error: null });

		this.props.getChildComments(item.id)
			.then((comment) => {
				if (this._isMounted) {
					this.setState({ comment, loading: false });
				}
			})
			.catch((err) => {
				if (this._isMounted) {
					this.setState({ comment: {}, loading: false, error: err });
				}
			})
	}

	render() {
		const { comment, loading, error } = this.state;

		if (error) return <ErrorIndicator />;

		const loadingView = (loading) ? (
			<div className="for-spinner">
				<Spinner />
			</div>
		) : null;

		const dataView = (comment && !loading) ?
			(comment.kids || []).map(comment => {
				return <NestedComment key={comment.id} comment={comment} type="child" />
			}) : null;

		return (
			<Fragment>
				{loadingView}
				{dataView}
			</Fragment>
		);
	}
}

const mapMethodsToProps = ({ getChildComments }) => ({ getChildComments });

export default withHackNewsService(mapMethodsToProps)(NestedCommentContainer);