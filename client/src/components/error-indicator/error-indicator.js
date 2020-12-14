import React from 'react';
import { Link } from 'react-router-dom';

import './error-indicator.scss';

const ErrorIndicator = () => {

	return (
		<div className="error-indicator">
			<div className="container">
				<div className="error-indicator__text-wrapper">
					<h1 className="error-indicator__title">Страница не найдена</h1>
					<p className="error-indicator__text">
						Перейти на
						<Link to="/" className="error-indicator__link">Главную страницу</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default ErrorIndicator;