import React, { Fragment } from 'react';

import NewsListItem from '../news-list-item';
import Spinner from '../spinner';

import './news-list.scss';

const NewsList = ({ items, loading, update }) => {

	const newsView = items.map((item) => (
		<div key={item.id} className="news-list__item">
			<NewsListItem item={item} />
		</div>
	));

	return (
		<div className="news-list">
			<div className="container">
				<div className="news-list__wrap">
					<div className="news-list__loading">
						{
							(loading) ? <Spinner /> : null
						}
					</div>
					{
						(items.length > 0) ? (
							<Fragment>
								<div className="news-list__btn-wrap">
									<button className="btn news-list__btn" onClick={update}>Update</button>
								</div>
								<div className="news-list__items-wrap">
									{newsView}
								</div>
							</Fragment>
						) : null
					}
				</div>
			</div>
		</div>
	);
}

export default NewsList;
