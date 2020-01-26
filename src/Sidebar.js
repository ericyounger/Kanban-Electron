import React from 'react';
import { NavLink } from "react-router-dom";
import {Component} from 'react';
import "./css/materialize.min.css";
import "./css/style.css";
import {issueService} from "./issueService";

/**
 * @class Sidebar
 * @classdesc Sidebar is the main navigation for the site.
 */
export class Sidebar extends Component{
	constructor(props){
		super(props);

		this.state = {
			labels : [],
		}
	}

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
					<NavLink to="/" activeStyle={{ color: "orange" }}>
						<li className="collection-item grey darken-2">
							<i className="material-icons">build</i>Dashboard
						</li>
					</NavLink>


					{this.state.labels.map((e,index) =>
					<NavLink
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

				<div className="user-avatar" onClick={() => {alert("No function added to this yet")}}>
					<div className="user">
						<div className="avatar">
							<img src="https://postmediatorontosun.files.wordpress.com/2019/12/cat-e1575303121192.jpg"/>
						</div>

						{issueService.user}
					</div>
				</div>
			</div>
		);
  }

	componentDidMount() {
  	issueService.getAllLabels().then(res => this.setState({labels : res.data}));
  }

}