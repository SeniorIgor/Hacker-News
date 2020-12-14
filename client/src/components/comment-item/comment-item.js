import React from 'react';

import { NestedCommentContainer } from '../../containers';
import { formatDate, htmlDecode } from '../../utils';

import './comment-item.scss';

const CommentItem = ({ item, isView, getMoreComments }) => {

	const { text, by, time } = item;

	const btnMoreComments = (item.kids && item.kids.length > 0) ? (
		<button className="btn comment-item__btn"
			onClick={getMoreComments}>{(isView) ? "Less comments" : "Мore comments"}</button>
	) : null;

	const commentsView = (!isView) ? null : <NestedCommentContainer item={item} />;

	return (
		<div className="comment-item">
			<div className="comment-item__info">
				<span className="comment-item__info-owner">{by}</span>
				<span className="comment-item__info-text">{formatDate(time)}</span>
			</div>
			<div className="comment-item__text">{htmlDecode(text)}</div>
			{btnMoreComments}
			{commentsView}
		</div>
	);
}

export default CommentItem;

// function Comment({ comment }) {
// 	const nestedComments = (comment.children || []).map(comment => {
// 		return <Comment key={comment.id} comment={comment} type="child" />
// 	})

// 	return (
// 		<div style={{ "marginLeft": "25px", "marginTop": "10px" }}>
// 			<div>{comment.text}</div>
// 			{nestedComments}
// 		</div>
// 	)