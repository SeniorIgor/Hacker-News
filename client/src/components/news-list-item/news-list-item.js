import React from 'react';
import { Link } from 'react-router-dom';

import { formatDate } from '../../utils';

import './news-list-item.scss';

const NewsListItem = ({ item }) => {
	const { id, title, score, by, time, url } = item;

	return (
		<div key={id} className="news-list-item">
			<div className="news-list-item__wrap">
				<a className="news-list-item__link" href={url} target="_blank">{title}</a>
				{/* <Link to={`/product/${id}`} className="news-list-item__title">{title}</Link> */}

				<div className="news-list-item__info">
					<span className="news-list-item__info-text">{score}</span>
					<span className="news-list-item__info-text">point by</span>
					<span className="news-list-item__info-owner">{by}</span>
					<span className="news-list-item__info-text">{formatDate(time)}</span>
				</div>
			</div>

			<Link className="btn news-list-item__btn" to={`/news/${id}`}>Details</Link>
		</div >
	);
}

export default NewsListItem;