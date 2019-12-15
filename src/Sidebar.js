import React, { Component } from 'react';
import { HashRouter, Route, NavLink } from "react-router-dom";

import "./css/materialize.min.css";
import "./css/style.css";

export class Menu extends Component{
  render(){
    return (
			<div className="sidebar">
				<div className="logo"></div>

				<ul class="collection grey darken-1">
					<NavLink to="/add" activeStyle={{ color: "orange" }}>
						<li className="collection-item cyan darken-3">
							<div className="add">
								<i className="material-icons">add_circle_outline</i>
								New issue
							</div>
						</li>
					</NavLink>
					<NavLink to="/dashboard" activeStyle={{ color: "orange" }}>
						<li class="collection-item grey darken-2">
							<i class="material-icons">build</i>Dashboard
						</li>
					</NavLink>
					<NavLink
						to="/pending"
						activeStyle={{
							color: "orange"
						}}
					>
						<li class="collection-item grey darken-2">
							<i class="material-icons">assignment</i>Pending
						</li>
					</NavLink>
					<NavLink to="/due" activeStyle={{ color: "orange" }}>
						<li class="collection-item grey darken-2">
							<i class="material-icons">assignment_late</i>
							Due
						</li>
					</NavLink>
					<NavLink to="/finished" activeStyle={{ color: "orange" }}>
						<li class="collection-item grey darken-2">
							<i class="material-icons">assignment_turned_in</i>
							Finished
						</li>
					</NavLink>
				</ul>
			</div>
		);
  }

  componentDidMount(){}
}