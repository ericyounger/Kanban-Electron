import * as React from 'react';
import {Card} from './Widgets.js';
import { Component } from 'react-simplified';
import {issueService} from "./issueService";


export class Add extends Component{
    labels = [];
    render(){
        return (
            <div className="content">
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
            <div className="content">
                <div className="col l8">
                    <div className="row">
                        <Card title={this.props.title} type="simple">
                            {this.props.body}

                            <div className="divider"></div>
                            <div className="orange-text">
                                {this.props.assign.map(item =>
                                    <div className="chip grey lighten-2">{item.login} <i className="close material-icons">close</i></div>
                                )}
                            </div>
                            <div className="divider"></div>

                            <button onClick={""} className="btn green">Complete</button>
                            <button onClick={""} className="btn orange">Edit</button>
                            <button onClick={""} className="btn">Assign me</button>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}