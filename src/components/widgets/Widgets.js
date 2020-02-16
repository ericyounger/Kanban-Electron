import React, { useEffect, useState } from 'react';
import { Component } from 'react';
import {NavLink} from "react-router-dom";
import "../../css/materialize.min.css";
import "../../css/style.css";

/**
 * @function Card
 * Card is the standard component for displaying issues. Small card component
 */
export function Card({type, title, children, issueNumber, assign}){

      if(type === "simple"){
          return (
          	<div className="width-90">
				<div className="card">
					<div className="card-content">
						<div className="card-title orange-text text-darken-2">{title}</div>
						{children}
					</div>
				</div>
          	</div>
		  );
      }
      else {
      	return (
      		<div className="card blue-grey darken-1 hoverable">
				<NavLink to={"/issue/"+issueNumber}>
                    <div className="card-content white-text">
                        <span className="card-title orange-text">{title}</span>
                        <p>{children}</p>
                    </div>
				</NavLink>
                    <div className="card-action orange-text">
                        {assign.map(item =>
                            <div key={item} className="chip grey lighten-2">{item.login} <i key={item.name} className="close material-icons">close</i></div>
                        )}
                    </div>
      		</div>
		);
      }
}

/**
 * @function Label
 * Label is the standard component for displaying labels.
 */
export function Label({close, removeLabel, type, id, label, color}){
const onLoad = useEffect(() => {
    let labelColor = color;
    let label = document.querySelector("#issue" + id);
    if (label != null) {
        label.style.backgroundColor = `#${labelColor}`;
    }
}, []);

    return (
    	<div className={`card darken-1`} id={"issue"+id}>
			<div className="card-title center-align font12">{type}
			{close===true?
                <i className="close material-icons pointer" onClick={() => {removeLabel(type)}}>close</i>
                :null
			}
			</div>

    	</div>
		);

}

/**
 * @function Chip
 * Chip is the component used for showing assignees on a issue
 */
export function Chip({image, type, color}){
    const [labelColor, setLabelColor] = useState("");

    const onLoad = useEffect(() => {
        setLabelColor("#"+color);
        /* DUNNO WHAT THIS CODE IS DOING HERE, MAY BE DUPLICATE, MAY NEED TO CLEAN UP
        let label = document.querySelector("#issue" + this.props.id);
        if (label != null) {
            label.style.backgroundColor = `#${labelColor}`;
        }
        */
    },[]);

            return (
                <div className="chip black-text" id={type}>
                    <img src={image} alt=""/>
                        {type}
                    <i className="close material-icons">close</i>
                </div>
            )

}

export function LoadingContent({title}){
    return (
        <div className="center-progress center">
            {title}
            <div className="progress">
                <div className="indeterminate"> </div>
            </div>
        </div>
    )
}