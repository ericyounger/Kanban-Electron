import React, { Component } from 'react';
import { HashRouter, Route} from "react-router-dom";
import {Menu} from './Sidebar.js';
import {Label, Card} from './Widgets.js';
import {Add} from "./Issues";


import "./css/materialize.min.css";
import "./css/style.css";



function App() {
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
								  exact path="/add"
								  component={()=> <Content category="Add"/>}
								  />
							</div>
						</div>
					</div>
			</HashRouter>
	);
}



class Content extends Component{

	state = {
		array : []
	};

	render(){
		if(this.props.category === "Dashboard"){
			return (
				<div className="content">
					<Dashboard/>
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
				<Label type={this.props.category}/>
				<div className="row">
					{this.state.array.map(issue =>
						<div className="col l3">
							<Card title={issue.title}>
								{issue.description}
							</Card>
						</div>
					)}
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
	  this.setState({array :newArray});
	  console.log(issue);

  }
}

class Dashboard extends Component{
	render(){
    return (
    	<div>
			<div className="row">
				<div className="col l3">
					<Label type="Pending" />
				</div>
				<div className="col l3">
					<Label type="Due" />
					<Card title="Add button"/>
				</div>
				<div className="col l3">
					<Label type="Finished"/>
				</div>
				<div className="col l3">
					<Label type="Stashed" />
				</div>
			</div>
    	</div>
		);
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
