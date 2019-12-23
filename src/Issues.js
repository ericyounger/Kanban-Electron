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
            <Card title={this.props.title}>
                {this.props.body}
            </Card>
        )
    }
}