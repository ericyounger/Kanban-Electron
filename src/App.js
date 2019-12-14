import React, { Component } from 'react';
import { HashRouter, Route, NavLink } from "react-router-dom";
import {Menu} from './Sidebar.js';
import {Label, Card} from './Widgets.js';



import "./css/materialize.min.css";
import "./css/style.css";



function App() {
  return (
		<div>
			<HashRouter>
				<div>
					<div className="row">
						<div className="wrapper">
							<div className="col s12 m4 l2">
								<Menu />
							</div>
							<div className="col s12 m8 l10">
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
				</div>
			</HashRouter>
		</div>
	);
}



class Content extends Component{
  array = [];

  render(){
    if(this.array.length == 1){
      return (
        <div class="center-progress center">
          Building skynet
        <div class="progress">
          <div class="indeterminate"></div>
        </div>
        </div>
      );
    } else{ 
      if(this.props.category === "Dashboard"){
        return (
					<div className="content">
						<Dashboard/>
					</div>
				);
      } else if(this.props.category == "Add"){
        return (
					<div className="content width-50">
						<Add />
					</div>
				);
      } else{
 return (
     <div className="content">
       {this.props.category}
     </div>

 );
    }
   
  }
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
					</div>
					<div className="col l3">
						<Label type="Finished"/>
					</div>
					<div className="col l3">
						<Label type="Stashed" />
					</div>
				</div>

				<div className="row">
					<div className="col s12 m8 l3">
						<Card title="Fix multiple projects"/>
						<Card title="Post to github"/>
					</div>
					<div className="col s12 m8 l3">
						<Card title="Add button"/>
					</div>
				</div>
			</div>
		);
  }
}

class Add extends Component{
  render(){
    return (
			<div>
				<Card title="Add" type="simple">
					<div className="addForm">
						<div className="row">
							<div className="col l12">
								<input
									type="text"
									placeholder="Title"
									className="active" id="issueTitle"
								></input>
							</div>
						</div>

						<div className="row">
							<div className="col l12">
								<textarea
									placeholder="Description"
									id="textArea1"
									class="materialize-textarea"
								></textarea>
							</div>
						</div>

						<div className="row">
							<div className="col l6">
								<input type="date" className="date" id="date" />
							</div>
						</div>

						<div className="row">
							<div className="col l6">
                <select>
                  <option>2</option>
                  <option>3</option>
                </select>
							</div>
						</div>

            <div className="row">
              <button className="btn" onClick={this.addIssue}>Add issue</button>
            </div>
					</div>
				</Card>
			</div>
		);
  }

  addIssue(){
    let title = document.querySelector('#issueTitle').value;
    let description = document.querySelector("#textArea1").value;
    let dueDate = document.querySelector("#date").value;
    alert(dueDate);
  }

}

export default App;
