import React, { Component } from 'react';
import { HashRouter, Route, NavLink } from "react-router-dom";
import {Menu} from './Sidebar.js';
import {Label, Card} from './Widgets.js';


export class Add extends Component{
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
        let issue = {
            "title":title,
            "description": description,
            "dueDate":dueDate,
            "tag": "Pending"
        };



    }

}