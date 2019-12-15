import React, { Component } from 'react';




import "./css/materialize.min.css";
import "./css/style.css";

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
				<div className="card-content white-text">
					<span className="card-title">{this.props.title}</span>
					<p>I am a very simple card. I am good at containing small
						bits of information. I am convenient because I require
						little markup to use effectively.</p>
				</div>
				<div className="card-action">
					<a href="#">
						Stash<i className="material-icons">delete</i>
					</a>
					<a href="#">
						Finish task <i className="material-icons">check_circle</i>
					</a>
				</div>
      		</div>
		);
      }
  }
}

export class Label extends Component{
  category = "blue-grey";
  constructor(props){
    super(props);
    if(this.props.type === "Due"){
      this.category = "red";
    } else if(this.props.type === "Pending"){
      this.category = "yellow darken-2";
    } else if(this.props.type === "Finished"){
      this.category = "green"
    } else{
      this.category = "blue-grey"
    }
  }
  
  render(){
    return (
    	<div className={`card ${this.category} darken-1 white-text`}>
			<div className="card-title center-align">{this.props.type}</div>
    	</div>
		);
  }
}