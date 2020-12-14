import React from 'react';

import { CommentItemContainer } from '../../containers';
import Spinner from '../spinner';

import './comment-list.scss';

const CommentList = ({ items }) => {

	const itemsView = items.map((item) => {
		if (!item.by || !item.time || !item.text) return null;

		return (
			<div key={item.id} className="comment-list__item" >
				<CommentItemContainer item={item} />
			</div>
		);
	});

	return (
		<div className="comment-list">
			{
				(items.length > 0) ? (
					<div className="comment-list__wrap">
						{itemsView}
					</div>
				) : null
			}
		</div>
	);
}

export default CommentList;