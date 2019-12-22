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
	labels = [];

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
								exact path="/add"
								component={()=> <Add addHandler={this.addHandler}/>}
							/>

							{this.labels.map(e =>
							<Route
								exact path={"/"+e.id}
								component={() => <Content category={e.name} />}
							/>

							)}
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

		mounted() {
		issueService.getAllLabels().then(res => this.labels = res.data);
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
					{this.array.map(issue =>
						<div className="col l3">
							<Card title={issue.title} id={issue.id}>
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
		return(
			<div className="content">
				<div className="row">
				{this.labels.map(e =>
					<div className="col l3">
					<Label type={e.name} color={e.color}/>
						{this.array.filter(label => label.labels[0].name === e.name).map(issue =>
						<Card title={issue.title}>
							{issue.body}
						</Card>

						)}
					</div>
				)}
				</div>
			</div>
		)
	}
/*
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

 */
  mounted() {
		issueService.getAllLabels().then(res => {
			this.labels = res.data
			console.log(res.data);
		});
		issueService.getAllIssues().then(res => this.array = res.data);
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
