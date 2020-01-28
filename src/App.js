import React, {Component} from 'react';
import {HashRouter, NavLink, Route} from "react-router-dom";
import {Sidebar} from './Sidebar.js';
import {Label, Card} from './Widgets.js';
import {Add, IssueView} from "./Issues";

import "./css/materialize.min.css";
import "./css/style.css";
import {issueService} from "./issueService";

import {FaEllipsisH} from "react-icons/all";
import {FaTh} from "react-icons/all";
import {FaBars} from "react-icons/all";


import {UserSetting} from "./user";
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
			loggedIn : false
		};
	}

	render(){
		if(this.state.loggedIn){
			return (
				<HashRouter>
					<div className="header-drag"></div>

					<div className="wrapper">
							<div className="sidebar" id="menuNavigation">
								<Sidebar />
							</div>

							<div className="contentMain" id="contentPages">
								<Route
									exact
									path="/"
									component={() => <Content page={<Dashboard />}/>}
								/>

								<Route
									exact path="/add"
									component={() => <SmallContent page={<Add addHandler={this.addHandler} title={"Post new issue"}/>}/>}
								/>

								<Route
									exact path="/userSettings"
									component={() => <SmallContent page={<UserSetting logOut={this.logOut}/>}/>}
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

								{this.state.array.map((issue, index) =>

									<Route key={issue.id + index}
										exact path={"/"+issue.id}
										component={() => <Content page={<IssueView title={issue.title} body={issue.body} assign={issue.assignees} label={issue.labels} issue={issue} issueId={issue.number}/>}/>}
									/>
								)}

							</div>
					</div>

				</HashRouter>
			);
		} else{
			return (
				<div className="login-form">
				<HashRouter>

						<Route
							exact path="/"
							component={() => <UserNameInput/>}
						/>

							<Route
								exact
								path="/repos"
								component={() => <RepoSelection handleLogin={this.handleLogin}/>}
							/>

				</HashRouter>
				</div>
			)
		}
	}

	logOut = () => {
		this.setState({loggedIn : false});
	};

	handleLogin = () => {
		localStorage.setItem("loggedIn", "true");
		this.setState({loggedIn : true});
	};

	addHandler = (json) => {
			issueService.postIssue(json).then(res => {
				alert("Issue has been posted");
				console.log(res);
				history.push("/");
			}).catch(e => {
				alert("Something went wrong");
				console.log(e);
			});

		};

		componentDidMount() {
			let hasLoggedIn = localStorage.getItem("loggedIn");
			console.log(hasLoggedIn);
			if(hasLoggedIn != null){
				if(hasLoggedIn === "true"){
					this.setState({loggedIn : true});
				}

			}
			//issueService.getAllIssues().then(res => this.setState({array : res.data}));
			//issueService.getAllLabels().then(res => this.setState({labels: res.data}));
			//issueService.storeAuthenticatedUser();
		}




}

export class SmallContent extends Component{
	render() {
		return(
			<div className="smallContent">
				{this.props.page}
			</div>
		)
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
			labelSize : 200,
			openIssues : [],
			closedIssues: [],
		}
	}

	render(){
		if(this.state.openIssues.length === 0){
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
									<div className="label-width">
										<Label type={e.name} color={e.color} id={e.id}/>

										{this.state.openIssues.filter(filt => filt.labels[0] != null && e.name === filt.labels[0].name).map((issue,index) =>
											<Card key={issue.title+index} title={issue.title} id={issue.id} assign={issue.assignees}>
												{issue.body}
											</Card>
										)}
									</div>
								)}
								<div className="label-width">
									<Label type={"unlabeled"} color={"FF7F00"} id={0}/>
									{this.state.openIssues.filter(e => e.labels.length === 0).map(issue =>
										<Card title={issue.title} id={issue.id} assign={issue.assignees}>
											{issue.body}
										</Card>
									)}
								</div>
							</div>
						:null}

						{this.state.display === "table"?
							<div className="row">
								{this.state.labels.map(e =>
									<div className="col l3">
										<Label type={e.name} color={e.color} id={e.id}/>

										{this.state.openIssues.filter(filt => filt.labels[0] != null && e.name === filt.labels[0].name).map(issue =>
											<Card title={issue.title} id={issue.id} assign={issue.assignees}>
												{issue.body}
											</Card>
										)}
									</div>
								)}
								<div className="col l3">
									<Label type={"unlabeled"} color={"FF7F00"} id={0}/>
									{this.state.openIssues.filter(e => e.labels.length === 0).map(issue =>
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

										{this.state.openIssues.filter(filt => filt.labels[0] != null && e.name === filt.labels[0].name).map(issue =>
											<Card title={issue.title} id={issue.id} assign={issue.assignees}>
												{issue.body}
											</Card>
										)}
									</div>
								)}

								<div>
									<Label type={"unlabeled"} color={"FF7F00"} id={0}/>
									{this.state.openIssues.filter(e => e.labels.length === 0).map(issue =>
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

							<div className="filter-icon pointer margin-right-15" onClick={this.toggleHideEmpty}>
								{this.state.hideShow}
							</div>



									<div className="range-field">
									<input type="range"  min="200" max="600" value={this.state.labelSize} onChange={this.handleRange}/>
									</div>



						</div>
					</div>

				</div>
			)
		}
	}

	displayList = () => {
		this.setState({display : "list"});
	};

	displayTable = () => {
		this.setState({display : "table"});
	};

	displaySlide = () => {
		this.setState({display : "slide"});
	};

	handleRange = (event) => {
		this.setState({labelSize : event.target.value}, () => {
			let label = document.querySelectorAll(".label-width");
			if(label != null){
				label.forEach( x=> x.setAttribute("style",`width:${this.state.labelSize}px`));

			}
		});

	};

	componentDidMount() {
		issueService.getAllLabels().then(res => {
			this.setState({labels : res.data});

		});
		issueService.getAllIssues().then(res =>  {
			let open = res.data.filter(issue => issue.state === "open");
			let closed = res.data.filter(issue => issue.state === "closed");
			this.setState({array : res.data, openIssues : open, closedIssues: closed});
		});

	}

	/**
	 * Hides labels if there are no issues associated with it.
	 */
	toggleHideEmpty = () => {
		if(this.state.hideShow === "Hide empty"){
			let currentState = this.state;
			let hideEmpty = [];

			currentState.array.map(issue => {
				if(issue.labels.length !== 0){
					let found = false;
					// eslint-disable-next-line array-callback-return
					hideEmpty.map(e => {
						if(e.name === issue.labels[0].name){
							found = true;
						}
					});
					if(!found){
						hideEmpty.push(issue.labels[0]);
					}


				}
				return null
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
				<div className="card">
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
		this.props.handleLogin();
	}

}


export default App;
