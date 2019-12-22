import * as React from 'react';
import { HashRouter, Route, NavLink } from "react-router-dom";
import { Component } from 'react-simplified';


import "./css/materialize.min.css";
import "./css/style.css";
import {issueService} from "./issueService";

export class Menu extends Component{
	labels = [];

  render(){
    return (
			<div className="sidebar">
				<div className="logo"></div>

				<ul className="collection grey darken-1">
					<NavLink to="/add" activeStyle={{ color: "orange" }}>
						<li className="collection-item cyan darken-3">
							<div className="add">
								<i className="material-icons">add_circle_outline</i>
								New issue
							</div>
						</li>
					</NavLink>
					<NavLink to="/dashboard" activeStyle={{ color: "orange" }}>
						<li className="collection-item grey darken-2">
							<i className="material-icons">build</i>Dashboard
						</li>
					</NavLink>


					{this.labels.map(e =>

					<NavLink
						to={"/"+e.id}
						activeStyle={{
							color: "orange"
						}}
					>

						<li className="collection-item grey darken-2">
							{e.name}
						</li>
					</NavLink>

					)}
				</ul>
			</div>
		);
  }

  mounted() {
  	issueService.getAllLabels().then(res => this.labels = res.data);
  }

}