import * as React from 'react';
import {Label, Card} from './Widgets.js';
import { Component } from 'react';
import {issueService} from "./issueService";
import {Chip} from "./Widgets";

import { createHashHistory } from 'history';


let history = createHashHistory();

/**
 * @class Add
 * @classdesc Add is the component where user can add new issues. Holds the forms for submission.
 */
export class Add extends Component{

    constructor(props){
        super(props);

        this.state = {
            labels : [],
            title : "",
            body : "",
            labelSelected : "",
        };
    }

    render(){
        return (
            <div>
            <div className="">
                <div className="col l8 m12">
                <Card title={this.props.title} type="simple">
                    <div className="addForm">
                        <div className="row">
                            <div className="col l12 m12">
                                <label>Title</label>
                                <input type="text" className="active" id="issueTitle" onChange={this.inputHandler} name="title"/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col l12 m12">
                                <label>Description</label>
                                <textarea name="body" onChange={this.inputHandler}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col l6">
                                <label>Label:</label>
                                <select className="browser-default" id="selectIssue" onChange={this.labelHandler}>
                                    {this.state.labels.map(label =>
                                    <option>{label.name}</option>
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <button className="btn" onClick={this.submit}>Add issue</button>
                        </div>
                    </div>
                </Card>
                </div>
            </div>
            </div>
        );
    }

    /**
     * Handles the inputfields and stores information in state.
     * @param {event}event
     * Takes in event from onChange
     */
    inputHandler = (event) => {
        console.log(event.target.name);
        this.setState({[event.target.name] : event.target.value });
    };

    labelHandler = (event) => {
        this.setState({labelSelected : event.target.value});
    };

    componentDidMount() {
        issueService.getAllLabels().then(res => this.setState({labels : res.data, labelSelected : res.data[0].name}));
    }

    /**
     * Submits information stored in state from forms, and adds a new issue to repo.
     */
    submit = () => {

        let json = {
            title : this.state.title,
            body : this.state.body,
            labels : [this.state.labelSelected]
        };

        console.log(json.labels);
       this.props.addHandler(json);
    };




}

/**
 * @class IssueView
 * @classdesc IssueView is for display all information about a specific issue
 */
export class IssueView extends Component{

    constructor(props){
        super(props);

        this.state = {
            issue : {},
            created_date : "",
            updated_date : "",
        };
    }

    render(){
        return(
            <div className="">
            <div className="">
                    <Card title={this.props.title} type="simple">
                        <div className="row">
                            <div className="col l9">
                                <div className="divider"> </div>

                            {this.props.body}
                            <br/>
                            </div>
                            <div className="col l3">
                                <div className="card-panel teal lighten-5 ">
                                    <span className="bold">Labels:</span>
                                    <p>
                                    {this.props.label.map(label =>
                                        <Label type={label.name} color={label.color} close={true} removeLabel={this.removeLabel}/>
                                        )}
                                        <input type="button" className="btn btn-small" value="Add label"/>
                                    </p><br/>
                                    <span className="bold">Assigned</span>
                                    <div className="row">


                                        {this.state.issue.assignees != null && this.state.issue.assignees != 0 ? this.state.issue.assignees.map(issue =>
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
                                    {this.state.created_date}
                                    </p><br/>
                                    <p><b>Last updated:</b><br/>
                                    {this.state.updated_date}
                                    </p>
                                    <br/>
                                    <input type="button" className="btn btn-small red" value="Close issue" onClick={this.closeIssue}/>
                                </div>
                            </div>
                        </div>
                        <div className="">


                        </div>
                        <div className="divider"></div>
                        <div className="">
                            <CommentField issueId={this.props.issueId}/>
                        </div>
                    </Card>

            </div>

            </div>
        )
    }

    removeLabel = (labelName) => {
        let labelsRemaining = [];
        console.log(this.state.labels);
        this.props.label.filter(e => e.name !== labelName).map(label => labelsRemaining.push(label.name));

        issueService.removeLabel(this.props.issueId, labelsRemaining);
    };

    componentDidMount() {
        let created_at = this.props.issue.created_at.replace(/Z/g, '').replace(/T/g, ' at ');
        let updated_at = this.props.issue.updated_at.replace(/Z/g, '').replace(/T/g, ' at ');
        this.setState({
            issue : this.props.issue,
            created_date : created_at,
            updated_date : updated_at,
        });
    }

    closeIssue = () => {
        issueService.closeIssue(this.props.issueId).then(res => console.log(res));
        alert("Issue closed");
    }


}

/**
 * @class CommentField
 * @classdesc CommentField is the parent component of the comments, it both shows submitted comments, and also holds the
 * input form for submitting new comments
 */
export class CommentField extends Component{
    constructor(props){
        super(props);

        this.state = {
            comments : [],
            newComment : "",
        };
    }

    render(){
        return(
            <div className="addForm">
                {this.state.comments.length>0?this.state.comments.map(comment =>
                    <Comment user={comment.user.login} date_comment={comment.created_at} comment={comment.body} avatar={comment.user.avatar_url}/>
                ):"No comments"}

                <textarea onChange={this.commentHandler}>

                </textarea>

                <button className="btn teal" onClick={this.postComment}>Comment</button>
            </div>
        )
    }

    componentDidMount() {
        issueService.getAllCommentsPerIssue(this.props.issueId).then(res => this.setState({comments: res.data}));
    }

    commentHandler = (event) => {
        this.setState({newComment : event.target.value}, () => {
            console.log(this.state.newComment);
        })
    };

    postComment = () => {
        let json = {
            body : this.state.newComment
        };

        issueService.postComment(json, this.props.issueId);
    }

}

/**
 * @class Comment
 * @classdesc Comment is the component that holds information on one comment. This component is usually mapped
 * and shows comment information through props
 */
export class Comment extends Component{

    constructor(props){
        super(props);

        this.state = {
            comment_days_ago : 0,
        };
    }

    render(){
        return(
            <div>
                <div className="card grey lighten-4">
                    <div className="row">
                        <div className="col l1 center-align">
                            <img src={this.props.avatar} className="avatar-comments"/>
                        </div>
                        <div className="col l11">
                            <b>{this.props.user}</b> commented {this.state.comment_days_ago} days ago
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

    componentDidMount() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();


        let now = parseInt(year+month+day);


        let commentDateString = this.props.date_comment.replace(/-/g, '').substr(0,8);
        let commentDate = parseInt(commentDateString);
        this.setState({comment_days_ago : now-commentDate});
    }


}