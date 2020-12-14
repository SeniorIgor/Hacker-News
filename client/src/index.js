import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import App from './components/app';
import ScrollToTop from './components/scroll-to-top';
import ErrorBoundry from './components/error-boundry';
import { HackNewsService } from './services';
import { HackNewsServiceProvider } from './components/hack-news-service-context';

import './styles/style.scss';

import store from './store';

const hackNewsService = new HackNewsService();

ReactDOM.render(
	<Provider store={store}>
		<ErrorBoundry>
			<HackNewsServiceProvider value={hackNewsService}>
				<Router>
					<ScrollToTop>
						<div className="page">
							<App />
						</div>
					</ScrollToTop>
				</Router>
			</HackNewsServiceProvider>
		</ErrorBoundry>
	</Provider>,
	document.getElementById('root')
);