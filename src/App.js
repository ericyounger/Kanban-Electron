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
import {UserNameInput, RepoSelection, AuthorizationInput, Callback} from './components/userPrompts/initialization';

/**
 * @class App
 * @classdesc App is the uppermost parent that holds all components and also handles the navlink with hashroutes.
 */


function App(){
	const [loggedIn, setLoggedIn] = useState(false);
	const [issues, setIssues] = useState([]);
	const [labels, setLabels] = useState([]);


	function updateIssues() {
		setIssues(issueService.allIssues);
	}

	function addIssue(json){
		issueService.postIssue(json).then(res => {
			alert("Issue has been posted");
			issueService.allIssues.push(res.data);
			updateIssues();
		}).catch(e => {
			alert("Something went wrong");
			console.log(e);
		});
	}

	function closeIssue(json){
		let oldIssue = issueService.allIssues.filter(e => e.id === json.id);
		let index = issueService.allIssues.indexOf(oldIssue[0]);
		console.log(issueService.allIssues.splice(index, 1));
		updateIssues();
	}


	if(loggedIn){
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
							component={() => <Content page={<Dashboard issues={issues}  updateIssues={updateIssues}/>}/>}
						/>

						<Route
							exact path="/add"
							component={() => <SmallContent page={<Add addHandler={(json) => addIssue(json)}
						  	title={"Post new issue"}/>}/>}
						/>

						<Route
							exact path="/userSettings"
							component={() => <SmallContent page={<UserSetting logOut={() => setLoggedIn(false)}/>}/>}
						/>

						{labels.map(e =>
							<Route
								exact path={"/"+e.id}
								component={() => <Content page={<IssueContent category={e.name} color={e.color} issues={issues} />
								}/>}

							/>
						)}

						<Route
							exact path="/0"
							component={() => <Content page={<IssueContent category={"unlabeled"} color={"FF7F00"} issues={issues}/>}/>}
						/>

						{issues.map(issue =>

							<Route
								exact path={"/issue/"+issue.number}
								component={() => <Content page={<IssueView issue={issue} updateIssues={updateIssues} removeHandler={closeIssue}
							   	issueNumber={issue.number}/>}/>}
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
						<Route exact path="/user-repo" component={() => <UserNameInput />} />

						<Route
							exact
							path="/repos"
							component={() => (
								<RepoSelection handleLogin={() => {
									localStorage.setItem("loggedIn", "true");
									setLoggedIn(true);
									issueService.storeAllIssues(() => setIssues(issueService.allIssues));
									issueService.storeAllLabels(() => setLabels(issueService.allLabels));
								}} />
							)}
						/>

						<Route
							exact
							path="/"
							component={() => <AuthorizationInput />}
						/>

						<Route
							path="/authorization/callback"
							component={() => <Callback/>}
						/>
					</HashRouter>
				</div>
			</div>
		);
	}
}


export default App;
