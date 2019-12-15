import React, { Component } from 'react';
import { HashRouter, Route} from "react-router-dom";
import {Menu} from './Sidebar.js';
import {Label, Card} from './Widgets.js';
import {Add} from "./Issues";


import "./css/materialize.min.css";
import "./css/style.css";
import {issueService} from "./issueService";


class App extends Component{
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
								component={() => <Content category="Dashboard" />}
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
								component={()=> <Content category="Add"/>}
							/>
						</div>
					</div>
				</div>
			</HashRouter>
		);
	}
}


class Content extends Component{
	constructor(props){
		super(props);

		//issueService.getAllIssues().then(res => console.log(res.data[0].title));
		this.state = {
			array : [{title: "lol", description: "någe", category:"Due"}, {title:"map this", description: "ahaaah", category: "Pending"}, {title:"Something", description: "Something other", category:"Pending"}]
		};

	}



	render(){
		if(this.props.category === "Dashboard"){
			return (
				<div className="content">
					<Dashboard array={this.state.array}/>
				</div>
			);
		}

      else if(this.props.category === "Add"){
        return (
        	<div className="content">
				<Add handler={this.addToArray}/>
        	</div>
		);
      }
      else{
      	return (
      		<div className="content">
				<div className="row">
				<Label type={this.props.category}/>
				<div className="fixer">
					{this.state.array.filter(e => e.category === this.props.category).map(issue =>
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
  }


	addToArray = () => {
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
	  let newArray = this.state.array;
	  newArray.push(issue);
	  this.setState({array: newArray});
	  console.log(this.state.array);

  }
}

class Dashboard extends Component{
	render(){
    return (
    	<div>
			<div className="row">
				<div className="col l3">
					<Label type="Pending" />
					{this.props.array.filter(e => e.category === "Pending").map(pending =>
						<Card title={pending.title} stashHandler={this.stashHandler} completeHandler={this.completeHandler}>
							{pending.description}
						</Card>
					)}
				</div>
				<div className="col l3">
					<Label type="Due" />
					{this.props.array.filter(e => e.category === "Due").map(due =>
						<Card title={due.title} stashHandler={this.stashHandler} completeHandler={this.completeHandler}>
							{due.description}
						</Card>
					)}
				</div>
				<div className="col l3">
					<Label type="Finished"/>
					{this.props.array.filter(e => e.category === "Finished").map(finished =>
						<Card title={finished.title} stashHandler={this.stashHandler} completeHandler={this.completeHandler}>
							{finished.description}
						</Card>
					)}
				</div>
				<div className="col l3">
					<Label type="Stashed" />
					{this.props.array.filter(e => e.category === "Stashed").map(stashed =>
						<Card title={stashed.title} stashHandler={this.stashHandler} completeHandler={this.completeHandler}>
							{stashed.description}
						</Card>
					)}
				</div>
			</div>
    	</div>
		);
  }

  stashHandler(title){
		//let issue = this.state.array.find((e,i) => e.title === title);
		//console.log(issue);
	  alert(title);
  }

  completeHandler(title){
		console.log(title);

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
