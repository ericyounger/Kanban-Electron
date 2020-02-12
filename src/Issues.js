import * as React from 'react';
import {Label, Card} from './Widgets.js';
import { Component, useState, useEffect} from 'react';
import {issueService} from "./issueService";
import {Chip} from "./Widgets";
import { createHashHistory } from 'history';
let history = createHashHistory();


/**
 * @function Add
 * Add is the component where user can add new issues. Holds the forms for submission.
 */
export function Add({title, addHandler}){
    const [labels, setLabels] = useState([]);
    const [issueTitle, setIssueTitle] = useState("");
    const [body, setIssueBody] = useState("");
    const [selectedLabel, setSelectedLabel] = useState("");
    const onLoad = useEffect(() => {
        issueService.getAllLabels().then(res => {
            setLabels(res.data);
            setSelectedLabel(res.data[0].name);
        })},[]);

        return (
            <div>
                <Card title={title} type="simple">
                    <div className="addForm">
                        <div className="row">
                            <div className="col l12 m12">
                                <label>Title</label>
                                <input type="text" className="active" id="issueTitle" onChange={(event) => setIssueTitle(event.target.value)} name="title"/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col l12 m12">
                                <label>Description</label>
                                <textarea name="body" onChange={(event) => setIssueBody(event.target.value)}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col l6">
                                <label>Label:</label>
                                <select className="browser-default" id="selectIssue" onChange={(event) => setSelectedLabel(event.target.value)}>
                                    {labels.map(label =>
                                    <option>{label.name}</option>
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <button className="btn" onClick={() => {

                                let json = {
                                    title: issueTitle,
                                    body: body,
                                    labels: [selectedLabel]
                                };

                                addHandler(json);
                            }}>Add issue</button>
                        </div>
                    </div>
                </Card>

            </div>
        );
}

/**
 * @class IssueView
 * @classdesc IssueView is for display all information about a specific issue
 */
export class IssueView extends Component{

    constructor(props){
        super(props);

        this.state = {
            issue : this.props.issue,
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


                                        {this.state.issue.assignees !== null && this.state.issue.assignees !== 0 ? this.state.issue.assignees.map(issue =>
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
            created_date : created_at,
            updated_date : updated_at,
        });
    }

    closeIssue = () => {
        issueService.closeIssue(this.props.issue.number).then(res =>{
            alert("Issue closed");
            history.push("/");
            this.props.removeHandler(res.data);
        }).catch(req => console.log(req));


    }


}

/**
 * @function CommentField
 * CommentField is the parent component of the comments, it both shows submitted comments, and also holds the
 * input form for submitting new comments
 */
export function CommentField({issueId, }){
    const [comments, setComments] = useState([]);
    const [newComment,setCommentInput] = useState("");
    const onLoad = useEffect(() => {

        issueService.getAllCommentsPerIssue(issueId).then(res => setComments(res.data));

    }, []);

        return(
            <div className="addForm">
                {comments.length>0?comments.map(comment =>
                    <Comment user={comment.user.login} date_comment={comment.created_at} comment={comment.body} avatar={comment.user.avatar_url}/>
                ):"No comments"}

                <textarea onChange={(event) => setCommentInput(event.target.value)}>

                </textarea>

                <button className="btn teal" onClick={() => {
                    let json = {
                        body: this.state.newComment
                    };

                    issueService.postComment(json, this.props.issueId);

                }}>Comment</button>
            </div>
        )
}

/**
 * @function Comment
 * Comment is the component that holds information on one comment. This component is usually mapped
 * and shows comment information through props
 */
export function Comment({date_comment, avatar, user, comment}){
    const [comment_days_ago, setCommentDate] = useState("");
    const onLoad = useEffect(() => {
        let commentDateString = date_comment.replace(/-/g, '').substr(0, 8);
        setCommentDate(commentDateString);
    },[]);

        return(
            <div>
                <div className="card grey lighten-4">
                    <div className="row">
                        <div className="col l1 center-align">
                            <img src={avatar} className="avatar-comments" alt=""/>
                        </div>
                        <div className="col l11">
                            <b>{user}</b> commented {comment_days_ago} days ago
                            <hr></hr>
                            <div className="row">
                            <div className="col l12">
                                {comment}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}