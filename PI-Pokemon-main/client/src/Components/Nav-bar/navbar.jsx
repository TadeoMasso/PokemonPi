import React from 'react';
import { NavLink } from 'react-router-dom';

import SearchBar from "../Search-Bar/search-bar"

const Nav = ({ setCurrentPage }) => {
	return (
		<>
			<nav className="navbar">
				<div>
					<div className="nav-title">
						<NavLink to="/home"> 
							{/* <img
								src=""
								alt=""
							/> */}
						</NavLink>
					</div>
				</div>

				<SearchBar setCurrentPage={setCurrentPage} />

				<div className="links">
					<NavLink className="route" to="/create">
						Create Pokemon
					</NavLink>
				</div>
			</nav>
		</>
	);
};

export default Nav;