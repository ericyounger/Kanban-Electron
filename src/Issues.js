import * as React from 'react';
import {Label, Card} from './Widgets.js';
import { Component } from 'react-simplified';
import {issueService} from "./issueService";
import {Chip} from "./Widgets";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";


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
                                <SimpleMDE onChange={this.handleChange}  options={{
                                    autofocus: true,
                                    spellChecker: false
                                }} />
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
    issue = {};
    created_date = "";
    updated_date = "";
    render(){
        return(
            <div className="row">
            <div className="issueview col l12">
                    <Card title={this.props.title} type="simple">
                        <div className="row">
                            <div className="col l9">
                                <div className="divider"></div>

                            {this.props.body}
                            <br/>
                            </div>
                            <div className="col l3">
                                <div className="card-panel teal lighten-5 ">
                                    <span className="bold">Labels:</span>
                                    <p>
                                    {this.props.label.map(label =>
                                        <Label type={label.name} color={label.color} close={true}/>
                                        )}
                                        <input type="button" className="btn btn-small" value="Add label"/>
                                    </p><br/>
                                    <span className="bold">Assigned</span>
                                    <div className="row">


                                        {this.issue.assignees != null && this.issue.assignees != 0 ? this.issue.assignees.map(issue =>
                                            <div className="addForm">
                                                <Chip type={issue.login} image={issue.avatar_url}/>
                                            </div>
                                        ):<div className="addForm">{"No one assigned"}</div>}


                                        <div className="addForm">
                                        <input type="button" className="btn btn-small" value="Assign me"/>
                                        <input type="button" className="btn btn-small" value="Assign someone"/>
                                        </div>
                                    </div>

                                    <p><b>Date created:</b><br/>
                                    {this.created_date}
                                    </p><br/>
                                    <p><b>Last updated:</b><br/>
                                    {this.updated_date}
                                    </p>
                                    <br/>
                                    <input type="button" className="btn btn-small red" value="Close issue"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">


                        </div>
                        <div className="divider"></div>
                        <div className="row">
                            <CommentField issueId={this.props.issueId}/>
                        </div>
                    </Card>

            </div>

            </div>
        )
    }

    mounted() {
        this.issue = this.props.issue;
        let created_at = this.issue.created_at.replace(/Z/g, '').replace(/T/g, ' at ');
        this.created_date = created_at;
        let updated_at = this.issue.updated_at.replace(/Z/g, '').replace(/T/g, ' at ');
        this.updated_date = updated_at;

    }
}

export class CommentField extends Component{
    comments = [];
    render(){
        return(
                    <div className="addForm">
                        {this.comments.length>0?this.comments.map(comment =>
                            <Comment user={comment.user.login} date_comment={comment.created_at} comment={comment.body} avatar={comment.user.avatar_url}/>
                        ):"No comments"}

                        <SimpleMDE onChange={this.handleChange}  options={{
                            autofocus: true,
                            spellChecker: false
                        }} />

                        <button className="btn teal">Comment</button>
                    </div>

        )
    }

    mounted() {
        let issueId = this.props.issueId;
        issueService.getAllCommentsPerIssue(issueId).then(res => this.comments = res.data);
    }
}

export class Comment extends Component{
    comment_days_ago = 0;
    render(){
        return(
            <div>
                <div className="card grey lighten-4">
                    <div className="row">
                        <div className="col l1 center-align">
                            <img src={this.props.avatar} className="avatar-comments"/>
                        </div>
                        <div className="col l11">
                            <b>{this.props.user}</b> commented {this.comment_days_ago} days ago
                            <hr></hr>
                            <div className="row">
                            <div className="col l12">
                                {this.props.comment}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    mounted() {
        let date = new Date();
        let year = date.getFullYear().toString();
        let month = parseInt(date.getMonth().toString())+1;
        let day = date.getDate().toString();
        
        let now = parseInt(year+month+day);

        let commentDateString = this.props.date_comment.replace(/-/g, '').substr(0,8);
        let commentDate = parseInt(commentDateString);
        this.comment_days_ago = now-commentDate;
    }
}