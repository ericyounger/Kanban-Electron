import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import {Component} from 'react';
import "./css/materialize.min.css";
import "./css/style.css";
import {issueService} from "./issueService";


/**
 * @function Sidebar
 * Sidebar is the main navigation for the site.
 */
export function Sidebar(){
	const [labels, setLabels] = useState([]);
	const onLoad = useEffect(() => {
		issueService.getAllLabels().then(res => setLabels(res.data));
	}, []);

    return (
			<div className="sidebar">
				<div className="logo margin-top-30"></div>

				<ul className="collection grey darken-1">
					<NavLink to="/add" activeStyle={{ color: "orange" }}>
						<li className="collection-item cyan darken-3">
							<div className="add">
								<i className="material-icons">add_circle_outline</i>
								New issue
							</div>
						</li>
					</NavLink>
					<NavLink to="/" activeStyle={{ color: "orange" }}>
						<li className="collection-item grey darken-2">
							<i className="material-icons">build</i>Dashboard
						</li>
					</NavLink>


					{labels.map((e,index) =>
					<NavLink key={index}
						to={"/"+e.id}
						activeStyle={{
							color: "orange"
						}}
					>

						<li key={e.name+index} className="collection-item grey darken-2">
							{e.name}
						</li>
					</NavLink>
					)}


					<NavLink
						to={"/0"}
						activeStyle={{
							color: "orange"
						}}
					>

						<li key={"unlabeled0"} className="collection-item grey darken-2">
							{"unlabeled"}
						</li>
					</NavLink>
				</ul>

                <NavLink to="/userSettings">
				<div className="user-avatar">
					<div className="user">
						<div className="avatar">
							<img src={issueService.userAvatar} alt=""/>
						</div>
						{issueService.user}
					</div>
				</div>
                </NavLink>

			</div>
		);
}
