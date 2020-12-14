import React from 'react';

import CommentList from '../comment-list';
import Spinner from '../spinner';
import { formatDate } from '../../utils';

import './news-item.scss';

const NewsItem = ({ item, loading, update }) => {

	const itemView = () => {
		if (!item.id && loading) return null;

		const { id, title, score, by, time, url, descendants, kids = [] } = item;

		return (
			<div className="news-item__wrap-item">
				<a className="news-item__link" href={url} target="_blank">{title}</a>

				<div className="news-item__info">
					<span className="news-item__info-text">{score}</span>
					<span className="news-item__info-text">point by</span>
					<span className="news-item__info-owner">{by}</span>
					<span className="news-item__info-text">{formatDate(time)}</span>
				</div>

				<div className="news-item__quantity-wrap">Count comments:
					<span className="news-item__quantity">{descendants}</span>
				</div>
				<div className="comment-list__btn-wrap">
					<button className="btn comment-list__btn" onClick={update}>Update</button>
				</div>
				<CommentList items={kids} />
			</div>
		)
	}

	return (
		<div className="news-item">
			<div className="container">
				<div className="news-item__wrap">
					<div className="news-item__loading">
						{
							(loading) ? <Spinner /> : null
						}
					</div>
					{itemView()}
				</div>
			</div>
		</div>
	);
}

export default NewsItem;









// import React from "react"

// const commentData = {
// 	title: "Fake article title.",
// 	author: "grzm",
// 	comments: [
// 		{
// 			id: 1,
// 			text: "Example comment here.",
// 			author: "user2",
// 			children: [
// 				{
// 					id: 2,
// 					text: "Another example comment text.",
// 					author: "user3",
// 					children: [
// 						{
// 							id: 3,
// 							text: "Another example comment text.",
// 							author: "user4",
// 							children: []
// 						}
// 					]
// 				}
// 			]
// 		},
// 		{
// 			id: 4,
// 			text: "Example comment here 2.",
// 			author: "user5",
// 			children: []
// 		}
// 	]
// }

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
// }

// function CommentList() {
// 	return (
// 		<div>
// 			{
// 				commentData.comments.map((comment) => {
// 					return (
// 						<Comment key={comment.id} comment={comment} />
// 					)
// 				})
// 			}
// 		</div>
// 	)
// }

// export default CommentList;