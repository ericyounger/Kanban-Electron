import * as React from 'react';
import { HashRouter, Route} from "react-router-dom";
import {Menu} from './Sidebar.js';
import {Label, Card} from './Widgets.js';
import {Add} from "./Issues";
import {Component} from 'react-simplified';

import "./css/materialize.min.css";
import "./css/style.css";
import {issueService} from "./issueService";


class App extends Component{
	array = [];

	render(){
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
								exact path="/pending"
								component={() => <Content category="Pending" />}
							/>
							<Route
								exact path="/due"
								component={() => <Content category="Due" />}
							/>
							<Route
								exact path="/finished"
								component={() => <Content category="Finished" />}
							/>
							<Route
								exact path="/stashed"
								component={() => <Content category="Stashed" />}
							/>
							<Route
								exact path="/add"
								component={()=> <Add addHandler={this.addHandler}/>}
							/>
						</div>
					</div>
				</div>
			</HashRouter>
		);
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


}


class Content extends Component{
	array = [];
	render(){
      	return (
      		<div className="content">
				<div className="row">
				<Label type={this.props.category}/>
				<div className="fixer">
					{this.array.filter(e => e.tag === this.props.category).map(issue =>
						<div className="col l3">
							<Card title={issue.title}>
								{issue.description}
							</Card>
						</div>
					)}
				</div>
				</div>
      		</div>
		);
  }

  mounted() {
		this.array = issueService.issues;
		console.log(issueService.issues);
  }

}

class Dashboard extends Component{
	array = [];

	render(){
    return (
    	<div className="content">
			<div className="row">
				<div className="col l3">
					<Label type="Pending" />
					{this.array.filter(e => e.tag === "Pending").map(pending =>
						<Card title={pending.title} stashHandler={this.stashHandler} completeHandler={this.completeHandler}>
							{pending.description}
						</Card>
					)}
				</div>
				<div className="col l3">
					<Label type="Due" />
					{this.array.filter(e => e.tag=== "Due").map(due =>
						<Card title={due.title} stashHandler={this.stashHandler} completeHandler={this.completeHandler}>
							{due.description}
						</Card>
					)}
				</div>
				<div className="col l3">
					<Label type="Finished"/>
					{this.array.filter(e => e.tag === "Finished").map(finished =>
						<Card title={finished.title} stashHandler={this.stashHandler} completeHandler={this.completeHandler}>
							{finished.description}
						</Card>
					)}
				</div>
				<div className="col l3">
					<Label type="Stashed" />
					{this.array.filter(e => e.tag === "Stashed").map(stashed =>
						<Card title={stashed.title} stashHandler={this.stashHandler} completeHandler={this.completeHandler}>
							{stashed.description}
						</Card>
					)}
				</div>
			</div>
    	</div>
		);
  }
  mounted() {
		this.array = issueService.issues;
  }

}

/* if(this.array.length == 1){
      return (
        <div class="center-progress center">
			Building skynet
			<div class="progress">
				<div class="indeterminate"></div>
			</div>
        </div>
      );

    }
 */


export default App;
