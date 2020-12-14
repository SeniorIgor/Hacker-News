import React, { Component } from 'react';

import CommentItem from '../components/comment-item';

class CommentItemContainer extends Component {

	state = {
		isView: false,
	}

	getMoreComments = () => {
		this.setState((state) => {
			return {
				isView: !state.isView,
			}
		});
	}

	render() {
		const { item } = this.props;
		const { isView } = this.state;

		return <CommentItem item={item} isView={isView} getMoreComments={this.getMoreComments} />;
	}
}

export default CommentItemContainer;