import React from 'react';

import { HackNewsServiceConsumer } from '../hack-news-service-context';

const withHackNewsService = (mapMethodsToProps) => (Wrapped) => {
	return (props) => {
		return (
			<HackNewsServiceConsumer>
				{
					(hackNewsService) => {
						const serviceProps = mapMethodsToProps(hackNewsService);

						return (
							<Wrapped {...props} {...serviceProps} />
						);
					}
				}
			</HackNewsServiceConsumer>
		);
	}
}

export default withHackNewsService;