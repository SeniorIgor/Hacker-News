import React from 'react';

import { formatDate, htmlDecode } from '../../utils';

import './nested-comment.scss';

const NestedComment = ({ comment }) => {

	// актуальное количество комментариев

	const { text, by, kids, time } = comment;

	const nestedItems = (kids || []).map(comment => {
		return <NestedComment key={comment.id} comment={comment} type="child" />
	})

	return (
		<div className="nested-comment">
			<div className="nested-comment__info">
				<span className="nested-comment__info-owner">{by}</span>
				<span className="nested-comment__info-text">{formatDate(time)}</span>
			</div>
			<div className="nested-comment__text">{htmlDecode(text)}</div>
			{nestedItems}
		</div>
	);
}

export default NestedComment;