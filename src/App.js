import React, {Component, useState, useEffect} from 'react';
import {HashRouter, NavLink, Route} from "react-router-dom";
import {Sidebar} from './components/navigation/Sidebar';
import {Add, IssueView} from "./components/issues/Issues";
import {issueService} from "./components/store/issueService";
import {Dashboard} from './components/dashboard/dashboard';
import UserSetting from "./components/userSettings/user";
import {Content, SmallContent, IssueContent} from './components/containers/contentContainers'
import "./css/materialize.min.css";
import "./css/style.css";
import {UserNameInput, RepoSelection, AuthorizationInput} from './components/userPrompts/initialization';

/**
 * @class App
 * @classdesc App is the uppermost parent that holds all components and also handles the navlink with hashroutes.
 */
class App extends Component{

	constructor(props){
		super(props);

		this.state = {
			issues : [],
			labels : [],
			title : "",
			loggedIn : true
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
									component={() => <Content page={<Dashboard issues={this.state.issues} />}/>}
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

								{this.state.issues.map(issue =>

									<Route
										exact path={"/issue/"+issue.number}
										component={() => <Content page={<IssueView title={issue.title} body={issue.body} assign={issue.assignees} label={issue.labels} issue={issue} removeHandler={this.removeHandler} issueNumber={issue.number}/>}/>}
									/>
								)}

							</div>
					</div>

				</HashRouter>
			);
		} else{
			return (
				<div>
				<div className="header-drag"></div>
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

							<Route
								exact
								path="/authorization"
								component={() => <AuthorizationInput />}

							/>


				</HashRouter>
				</div>
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
		issueService.storeAllIssues(() => {
			this.setState({ issues: issueService.allIssues });
		});

		issueService.storeAllLabels(() => this.setState({ labels: issueService.allLabels }));
					//issueService.storeAuthenticatedUser();
	};

	addHandler = (json) => {
			issueService.postIssue(json).then(res => {
				alert("Issue has been posted");
				issueService.allIssues.push(res.data);
				this.setState({issues : issueService.allIssues});
			}).catch(e => {
				alert("Something went wrong");
				console.log(e);
			});

		};

	removeHandler = (issue) => {
		let oldIssue = issueService.allIssues.filter(e => e.id === issue.id);
		let index = issueService.allIssues.indexOf(oldIssue[0]);
		issueService.allIssues.splice(index, 1, issue);
	};

		componentDidMount() {
			let hasLoggedIn = localStorage.getItem("loggedIn");
			console.log(hasLoggedIn);
			if(hasLoggedIn != null){
				if(hasLoggedIn === "true"){
					this.setState({loggedIn : true});
				}

			}

		}




}


export default App;
