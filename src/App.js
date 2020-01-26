import React from 'react';
import {HashRouter, NavLink, Route} from "react-router-dom";
import {Menu} from './Sidebar.js';
import {Label, Card} from './Widgets.js';
import {Add, IssueView} from "./Issues";
import {Component} from 'react';
import "./css/materialize.min.css";
import "./css/style.css";
import {issueService} from "./issueService";
import {FaList} from "react-icons/all";
import {FaEllipsisV} from "react-icons/all";
import {FaEllipsisH} from "react-icons/all";
import {FaTh} from "react-icons/all";
import {FaBars} from "react-icons/all";

import { createHashHistory } from 'history';


let history = createHashHistory();


/**
 * @class App
 * @classdesc App is the uppermost parent that holds all components and also handles the navlink with hashroutes.
 */
class App extends Component{

	constructor(props){
		super(props);

		this.state = {
			array : [],
			labels : [],
			title : "",
		};
	}

	render(){
		if(issueService.loggedIn){
			return (
				<HashRouter>
					<div className="wrapper">

						<div className="row">

							<div className="col s12 m2 l2" id="menuNavigation">
								<Menu />
							</div>

							<div className="col s12 m10 l10" id="contentPages">
								<Route
									exact
									path="/dashboard"
									component={() => <Content page={<Dashboard />}/>}
								/>

								<Route
									exact path="/add"
									component={() => <Content page={<Add addHandler={this.addHandler} title={"Post new issue"}/>}/>}
								/>


								{this.state.labels.map(e =>
									<Route
										exact path={"/"+e.id}
										component={() => <Content page={<IssueContent category={e.name} color={e.color} />
										}/>}

									/>
								)}

								<Route
									exact path="/0"
									component={() => <Content page={<IssueContent category={"unlabeled"} color={"FF7F00"} />}/>}
								/>



								{this.state.array.map(issue =>
									<Route
										exact path={"/"+issue.id}
										component={() => <Content page={<IssueView title={issue.title} body={issue.body} assign={issue.assignees} label={issue.labels} issue={issue} issueId={issue.number}/>}/>}
									/>
								)}



								</div>

						</div>
					</div>
				</HashRouter>
			);
		} else{
			return (
				<HashRouter>
				<Route
					exact path="/"
					component={() => <UserNameInput />}
				/>

					<Route
						exact
						path="/repos"
						component={() => <RepoSelection/>}
					/>
				</HashRouter>
			)
		}
	}

	addHandler = (json) => {
			issueService.postIssue(json).then(res => console.log(res)).catch(e => console.log(e));
		};

		componentDidMount() {
			issueService.getAllIssues().then(res => this.setState({array : res.data}));
			issueService.getAllLabels().then(res => this.setState({labels: res.data}));
		}




}

export class Content extends Component{
	render() {
		return(
			<div className="content">
				{this.props.page}
			</div>
		)
	}
}

/**
 * @class IssueContent
 * @classdesc IssueContent is the main container for all the content
 */
class IssueContent extends Component{
	constructor(props){
		super(props);

		this.state = {
			array : [],
		}
	}
	render(){
      	return (
				<div>
					<Label type={this.props.category} color={this.props.color}/>
					<div className="fixer">
						{this.state.array.map(issue =>
							<div className="col l3">
								<Card title={issue.title} id={issue.id} assign={issue.assignees}>
									{issue.body}
								</Card>
							</div>
						)}
					</div>
				</div>
		);
  }

  componentDidMount() {
	  issueService.getAllIssues().then(res => {
		  if(this.props.category === "unlabeled"){
		  	this.setState({array : res.data.filter(e => e.labels.length === 0)});
		  } else {
		  	this.setState({array :res.data.filter(e => e.labels[0] != null && e.labels[0].name === this.props.category)});
		  }
	  }).catch(e =>
		  console.log(e));
  }


}

/**
 * @class Dashboard
 * @classdesc Dashboard is the landing page when logged in, and displays all issues with labels categorised.
 */
class Dashboard extends Component{
	constructor(props){
		super(props);

		this.state = {
			array : [],
			labels : [],
			display: "slide",
			hideShow : "Hide empty",
		}
	}

	render(){
		if(this.state.array.length === -1){
			return (
				<div className="center-progress center">
					Building skynet
					<div className="progress">
						<div className="indeterminate"> </div>
					</div>
				</div>
			);

		} else{
			return(
				<div>
						{this.state.display === "slide" ?
							<div className="flex">
								{this.state.labels.map(e =>
									<div className="col l3">
										<Label type={e.name} color={e.color} id={e.id}/>

										{this.state.array.filter(filt => filt.labels[0] != null && e.name === filt.labels[0].name).map(issue =>
											<Card title={issue.title} id={issue.id} assign={issue.assignees}>
												{issue.body}
											</Card>
										)}
									</div>
								)}
								<div className="col l3">
									<Label type={"unlabeled"} color={"FF7F00"} id={0}/>
									{this.state.array.filter(e => e.labels.length === 0).map(issue =>
										<Card title={issue.title} id={issue.id} assign={issue.assignees}>
											{issue.body}
										</Card>
									)}
								</div>
							</div>
						:null}

						{this.state.display === "table"?
							<div>
								{this.state.labels.map(e =>
									<div className="col l3">
										<Label type={e.name} color={e.color} id={e.id}/>

										{this.state.array.filter(filt => filt.labels[0] != null && e.name === filt.labels[0].name).map(issue =>
											<Card title={issue.title} id={issue.id} assign={issue.assignees}>
												{issue.body}
											</Card>
										)}
									</div>
								)}
								<div className="col l3">
									<Label type={"unlabeled"} color={"FF7F00"} id={0}/>
									{this.state.array.filter(e => e.labels.length === 0).map(issue =>
										<Card title={issue.title} id={issue.id} assign={issue.assignees}>
											{issue.body}
										</Card>
									)}
								</div>


							</div>
						:null}

						{this.state.display === "list"?
							<div className="padding-bottom-50">

								{this.state.labels.map(e =>
									<div>
										<Label type={e.name} color={e.color} id={e.id}/>

										{this.state.array.filter(filt => filt.labels[0] != null && e.name === filt.labels[0].name).map(issue =>
											<Card title={issue.title} id={issue.id} assign={issue.assignees}>
												{issue.body}
											</Card>
										)}
									</div>
								)}

								<div>
									<Label type={"unlabeled"} color={"FF7F00"} id={0}/>
									{this.state.array.filter(e => e.labels.length === 0).map(issue =>
										<Card title={issue.title} id={issue.id} assign={issue.assignees}>
											{issue.body}
										</Card>
									)}
								</div>

							</div>
							:null}


					<div className="filter-bar">
						<div className="flex">
							<div onClick={this.displayTable} className="pointer filter-icon margin-right-15">
								<FaTh/>
							</div>

							<div onClick={this.displayList} className="pointer filter-icon margin-right-15">
								<FaBars/>
							</div>

							<div onClick={this.displaySlide} className="pointer filter-icon margin-right-15">
								<FaEllipsisH/>
							</div>

							<div className="filter-icon pointer" onClick={this.toggleHideEmpty}>
								{this.state.hideShow}
							</div>
						</div>
					</div>

				</div>
			)
		}
	}

	displayList = () => {
		this.setState({display : "list"});
	}

	displayTable = () => {
		this.setState({display : "table"});
	};

	displaySlide = () => {
		this.setState({display : "slide"});
	};

	componentDidMount() {
		issueService.getAllLabels().then(res => {
			this.setState({labels : res.data});

		});
		issueService.getAllIssues().then(res =>  {
			this.setState({array : res.data});

			console.log(res.data);
		});
	}

	toggleHideEmpty = () => {
		if(this.state.hideShow === "Hide empty"){
			let currentState = this.state;
			let hideEmpty = [];

			currentState.array.map(issue => {
				if(issue.labels.length !== 0){
					//TODO: Have to check if label is added already before pushing
					hideEmpty.push(issue.labels[0]);
				}
			});

			this.setState({labels : hideEmpty, hideShow : "Show empty"});
		} else{
			issueService.getAllLabels().then(res => {
				this.setState({labels : res.data, hideShow : "Hide empty"});
			});
		}

	}



}

/**
 * @class UserNameInput
 * @classdesc UserNameInput is the first component the user sees, that lets user write in their username.
 *  RepoSelection uses the user input from this component to get their repos listed out.
 */
export class UserNameInput extends Component{
	render(){
		return(
			<div>
				<div className="card width-30 login-form">
						<div className="card-content">
							<div className="card-title">Login</div>
							<label>GitHub User-name</label>
							<input type="text" className="input-field" id="usernameInput"/>
							<NavLink to="/repos">
							<button className="btn" onClick={this.userInputHandler}>Next</button>
							</NavLink>
						</div>
				</div>
			</div>
		)
	}

	userInputHandler = () => {
		let userInput = document.querySelector("#usernameInput").value;
		issueService.user = userInput;
	}

}

/**
 * @class RepoSelection
 * @classdesc RepoSelection lists up all repos associated with user, and lets user select repo.
 */
export class RepoSelection extends Component{
	constructor(props){
		super(props);

		this.state = {
			repos : [],
			radios : [],
		}
	}

	render(){
		return(
			<div>
				<div className="card width-30 login-form">
					<div className="card-content">
						<div className="card-title">Choose repo</div>
						{this.state.repos.map((repos, index) =>
							<p>
							<label>
								<input name="group1" type="radio" id="radioRepo" value={repos.name}/>
								<span>{repos.name}</span>
							</label>
							</p>
						)}
							<button className="btn" onClick={this.loginHandler}>Next</button>
					</div>
				</div>
			</div>
		)

	}
	componentDidMount() {
		issueService.getAllRepos().then(res => this.setState({repos: res.data}));
	}

	loginHandler = () => {
		let selectedRepo = document.querySelector("input[name = group1]:checked").value;
		issueService.repo = selectedRepo;
		issueService.loggedIn = true;
		console.log("logged in?");
		console.log(issueService.loggedIn);
		history.push("/dashboard");
	}

}


export default App;
