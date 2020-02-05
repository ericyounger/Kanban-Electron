import React from 'react';

import { Component } from 'react';



import "./css/materialize.min.css";
import "./css/style.css";

import {NavLink} from "react-router-dom";

/**
 * @class Card
 * @classdesc Card is the standard component for displaying issues. Small card component
 */
export class Card extends Component{
  render(){
      if(this.props.type === "simple"){
          return (
          	<div className="width-90">
				<div className="card">
					<div className="card-content">
						<div className="card-title orange-text text-darken-2">{this.props.title}</div>
						{this.props.children}
					</div>
				</div>
          	</div>
		  );
      }
      else {
      	return (
      		<div className="card blue-grey darken-1 hoverable">
				<NavLink to={"/issue/"+this.props.issueNumber}>
                    <div className="card-content white-text">
                        <span className="card-title orange-text">{this.props.title}</span>
                        <p>{this.props.children}</p>
                    </div>
				</NavLink>
                    <div className="card-action orange-text">
                        {this.props.assign.map(item =>
                            <div key={item} className="chip grey lighten-2">{item.login} <i key={item.name} className="close material-icons">close</i></div>
                        )}
                    </div>
      		</div>
		);
      }
  }

}

/**
 * @class Label
 * @classdesc Label is the standard component for displaying labels.
 */
export class Label extends Component{
  render(){
    return (
    	<div className={`card darken-1`} id={"issue"+this.props.id}>
			<div className="card-title center-align font12">{this.props.type}
			{this.props.close===true?
                <i className="close material-icons pointer" onClick={() => {this.props.removeLabel(this.props.type)}}>close</i>
                :null
			}
			</div>

    	</div>
		);
  }

  componentDidMount() {
  	let labelColor = this.props.color;
  	let label = document.querySelector("#issue"+this.props.id);
  	if(label != null){
  		label.style.backgroundColor = `#${labelColor}`;
	}
  }
}

/**
 * @class Chip
 * @classdesc Chip is the component used for showing assignees on a issue
 */
export class Chip extends Component{
    render(){
            return (
                <div className="chip black-text" id={this.props.type.replace(/ /g,'')}>
                    <img src={this.props.image} alt=""/>
                        {this.props.type}
                    <i className="close material-icons">close</i>
                </div>
            )
    }

    componentDidMount() {
        let labelColor = this.props.color;
        let label = document.querySelector("#issue"+this.props.id);
        if(label != null){
            label.style.backgroundColor = `#${labelColor}`;
        }
    }
}

