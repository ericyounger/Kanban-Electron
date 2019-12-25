import * as React from 'react';
import {Label, Card} from './Widgets.js';
import { Component } from 'react-simplified';
import {issueService} from "./issueService";


export class Add extends Component{
    labels = [];
    render(){
        return (
            <div>
            <div className="row">
                <div className="col l8 m12">
                <Card title={this.props.title} type="simple">
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
                            <div className="col l6">
                                <label>Category:</label>
                                <select className="browser-default" id="selectIssue">
                                    {this.labels.map(label =>
                                    <option>{label.name}</option>
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <button className="btn" onClick={this.props.addHandler}>Add issue</button>
                        </div>
                    </div>
                </Card>
                </div>
            </div>
            </div>
        );
    }
    mounted() {
        issueService.getAllLabels().then(res => this.labels = res.data);
    }

}

export class IssueView extends Component{
    render(){
        return(
            <div className="row">
            <div className="issueview col l8">
                    <Card title={this.props.title} type="simple">
                        <div className="row">
                            <div className="col l8">
                                <div className="divider"></div>

                            {this.props.body}


                            </div>
                            <div className="col l4">
                                <div className="card-panel teal lighten-5 ">
                                    <span className="bold">Labels:</span>
                                    {this.props.label.map(label =>
                                        <Label type={label.name} color={label.color}/>
                                    )}

                                    <span className="bold">Assigned</span>
                                    <div className="row">
                                    {this.props.assign.map(assignee =>
                                        <div className="chip grey lighten-2">{assignee.login} <i className="close material-icons">close</i></div>
                                    )}
                                    </div>

                                    <input type="button" className="btn" value="Assign me"/>
                                    <input type="button" className="btn" value="Complete"/>
                                    <input type="button" className="btn" value="Edit"/>
                                    <input type="button" className="btn" value="Assign someone"/>
                                    <input type="button" className="btn" value="Add label"/>





                                </div>

                            </div>
                        </div>
                    </Card>
            </div>
            </div>
        )
    }
}