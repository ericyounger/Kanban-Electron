import React, { Component } from 'react';
import {Card} from './Widgets.js';


export class Add extends Component{
    render(){
        return (
            <div className="row">
                <div className="col l8 m12">
                <Card title="Add" type="simple">
                    <div className="addForm">
                        <div className="row">
                            <div className="col l12 m12">
                                <label>Title</label>
                                <input
                                    type="text"
                                    className="active" id="issueTitle"
                                ></input>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col l12 m12">
                                <label>Description</label>
								<textarea
                                    id="textArea1"
                                    className="materialize-textarea"
                                ></textarea>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col l6 m12">
                                <label>Due date:</label>
                                <input type="date" className="date" id="date" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col l6">
                                <label>Category:</label>
                                <select className="browser-default" id="selectIssue">
                                    <option>Pending</option>
                                    <option>Finished</option>
                                    <option>Stashed</option>
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <button className="btn" onClick={this.props.handler}>Add issue</button>
                        </div>
                    </div>
                </Card>
                </div>
            </div>
        );
    }
}