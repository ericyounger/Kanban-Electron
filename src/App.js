import React, { Component } from 'react';
import { HashRouter, Route, NavLink } from "react-router-dom";
import {Menu} from './Sidebar.js';
import {Label, Card} from './Widgets.js';
import {Add} from "./Issues";


import "./css/materialize.min.css";
import "./css/style.css";
import {issueService} from "./issueService";



function App() {
  return (
			<HashRouter>
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
			</HashRouter>
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
      }

      else if(this.props.category == "Add"){
        return (
        	<div className="content width-50">
				<Add />
        	</div>
		);
      }
      else{
      	return (
      		<div className="content">
				<Label type={this.props.category}/>
				{this.array.map(e =>
				<Card title={e.title}>
					{e.description}
				</Card>
				)}
      		</div>
		);
    }
   
  }
}
}

class Dashboard extends Component{

	constructor(props) {
		super(props);

		this.state = {
			issues: [],
		};
	}

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
					{this.state.issues.map(e =>
							<Card title={e.title}/>
							)}
				</div>
				<div className="col s12 m8 l3">
					<Card title="Add button"/>
				</div>
			</div>
    	</div>
		);
  }

}



export default App;
