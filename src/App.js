import * as React from 'react';
import {HashRouter, NavLink, Route} from "react-router-dom";
import {Menu} from './Sidebar.js';
import {Label, Card} from './Widgets.js';
import {Add, IssueView} from "./Issues";
import {Component} from 'react-simplified';

import "./css/materialize.min.css";
import "./css/style.css";
import {issueService} from "./issueService";


class App extends Component{
	array = [];
	labels = [];

	render(){
		if(issueService.loggedIn){
			return (
				<HashRouter>
					<div className="row">
						<div className="wrapper">
							<div className="col s12 m2 l2">
								<Menu />
							</div>
							<div className="col s12 m10 l10">
								<Route
									exact
									path="/dashboard"
									component={() => <Dashboard />}
								/>

								<Route
									exact path="/add"
									component={()=> <Add addHandler={this.addHandler} title={"Post new issue"}/>}
								/>

								{this.labels.map(e =>
									<Route
										exact path={"/"+e.id}
										component={() => <Content category={e.name} color={e.color} />}
									/>
								)}

								{this.array.map(issue =>
									<Route
										exact path={"/"+issue.id}
										component={() => <IssueView title={issue.title} body={issue.body} assign={issue.assignees} label={issue.labels} issue={issue} issueId={issue.number}/>}
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
					component={() => <UserInput />}
				/>

					<Route
						exact
						path="/repos"
						component={() => <RepoList/>}
					/>
				</HashRouter>
			)
		}
	}

	addHandler = () => {
			let title = document.querySelector('#issueTitle').value;
			let description = document.querySelector("#textArea1").value;
			let dueDate = document.querySelector("#date").value;
			let category = document.querySelector('#selectIssue').value;
			let issue = {
				"title":title,
				"description": description,
				"dueDate":dueDate,
				"tag": category
			};

			issueService.issues.push(issue);
			alert("Added issue");
		}

		mounted() {
		issueService.getAllIssues().then(res => this.array = res.data);
		issueService.getAllLabels().then(res => this.labels = res.data);
		}


}


class Content extends Component{
	array = [];
	render(){
      	return (
      		<div className="content">
				<div className="row">
				<Label type={this.props.category} color={this.props.color}/>
				<div className="fixer">
					{this.array.map(issue =>
						<div className="col l3">
							<Card title={issue.title} id={issue.id} assign={issue.assignees}>
								{issue.body}
							</Card>
						</div>
					)}
				</div>
				</div>
      		</div>
		);
  }

  mounted() {
		issueService.getAllIssues().then(res => {
			this.array = res.data.filter(e => e.labels[0].name === this.props.category);

		});

  }

}

class Dashboard extends Component{
	array = [];
	labels = [];
	render(){
		if(this.array.length === -1){
			return (
				<div class="center-progress center">
					Building skynet
					<div class="progress">
						<div class="indeterminate"></div>
					</div>
				</div>
			);

		} else{
			return(
				<div className="content">
					<div className="row">
						{this.labels.map(e =>
							<div className="col l3">
								<Label type={e.name} color={e.color}/>
								{this.array.filter(label => label.labels[0].name === e.name).map(issue =>
									<Card title={issue.title} id={issue.id} assign={issue.assignees} >
										{issue.body}
									</Card>

								)}
							</div>
						)}
					</div>
				</div>
			)
		}
	}

  mounted() {
		issueService.getAllLabels().then(res => {
			this.labels = res.data
			console.log(res.data);
		});
		issueService.getAllIssues().then(res => this.array = res.data);
  }

}

export class UserInput extends Component{
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

export class RepoList extends Component{
	repos = [];
	radios = [];

	render(){
		return(
			<div>
				<div className="card width-30 login-form">
					<div className="card-content">
						<div className="card-title">Choose repo</div>
						{this.repos.map((repos, index) =>
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
	mounted() {
		issueService.getAllRepos().then(res => this.repos = res.data);
	}

	loginHandler = () => {

		let selectedRepo = document.querySelector("input[name = group1]:checked").value;
		issueService.repo = selectedRepo;
		issueService.loggedIn = true;
	}

}


export default App;
