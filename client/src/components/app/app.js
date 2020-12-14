import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '../header';
import ErrorIndicator from '../error-indicator';
import { HomePage, NewsPage } from '../pages';

import './app.scss';

const App = () => {

	return (
		<div className="app">
			<Header />
			<Switch>
				<Route path="/" component={HomePage} exact />
				<Route path="/news/:newsId" component={NewsPage} exact />
				<Route component={ErrorIndicator} />
			</Switch>
		</div>
	);
}

export default App;
