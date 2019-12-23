import * as React from 'react';

import { Component } from 'react-simplified';



import "./css/materialize.min.css";
import "./css/style.css";
import {issueService} from "./issueService";
import {NavLink} from "react-router-dom";

export class Card extends Component{
  render(){
      if(this.props.type === "simple"){
          return (
          	<div>
				<div className="card">
					<div className="card-content">
						<div className="card-title">Post new issue</div>
						{this.props.children}
					</div>
				</div>
          	</div>
		  );
      }
      else {
      	return (
      		<div className="card blue-grey darken-1 hoverable">
				<NavLink to={"/"+this.props.id}>
				<div className="card-content white-text">
					<span className="card-title">{this.props.title}</span>
					<p>{this.props.children}</p>
				</div>
				</NavLink>
				<div className="card-action">
					<a onClick={e => this.stashHandler(this.props.title)}>
						Stash<i className="material-icons">pause_circle_filled</i>
					</a>
					<a onClick={e => this.completeHandler(this.props.title)}>
						Finish task <i className="material-icons">check_circle</i>
					</a>
				</div>
      		</div>
		);
      }
  }
  stashHandler(){
  	let idTitle = this.props.title;
  	let issue = issueService.issues.find(e => e.title === idTitle);
  	issue.tag = "Stashed";
  }

  completeHandler(){
	  let idTitle = this.props.title;
	  let issue = issueService.issues.find(e => e.title === idTitle);
	  issue.tag = "Finished";
  }
}

export class Label extends Component{

  
  render(){
    return (
    	<div className={`card ${this.category} darken-1`} id={this.props.type.replace(/ /g,'')}>
			<div className="card-title center-align">{this.props.type}</div>
    	</div>
		);
  }

  mounted() {
  	let labelColor = this.props.color;
  	let label = document.querySelector("#" + this.props.type.replace(/ /g,''));
  	if(label != null){
  		label.style.backgroundColor = `#${labelColor}`;
	}
  }
}