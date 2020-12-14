import React from 'react';
import { Link } from 'react-router-dom';

import './header.scss';

const Header = () => {

	return (
		<div className="header">
			<Link to="/" className="header__logo">
				<span className="header__logo-image">Y</span>
				<span className="header__logo-text">HACKER NEWS</span>
			</Link>
			<Link to="/" className="header__nav">
				<span className="header__nav-text">News</span>
			</Link>

			{/* <div className="container">
				<div className="header__wrap">
				</div>
			</div> */}
		</div>
	);
}

export default Header;