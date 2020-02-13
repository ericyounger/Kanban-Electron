import * as React from 'react';
import { Component, useState, useEffect} from 'react';
import {issueService} from "../store/issueService";
import {Chip, Label, Card} from "../widgets/Widgets";
import { createHashHistory } from 'history';
import { CommentField } from '../comments/comments';
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
 * @function IssueView
 * IssueView is for display all information about a specific issue
 */
export function IssueView({title, body, label, issueId, labelName, removeHandler}){
    const [issue, setIssue] = useState({});
    const [createdDate, setCreatedDate] = useState("");
    const [updatedDate, setUpdatedDate] = useState("");

    const onLoad = useEffect(() => {
        let created_at = issue.created_at.replace(/Z/g, '').replace(/T/g, ' at ');
        let updated_at = issue.updated_at.replace(/Z/g, '').replace(/T/g, ' at ');
        setCreatedDate(created_at);
        setUpdatedDate(updated_at);
    }, []);

        return(
            <div className="">
                    <Card title={title} type="simple">
                        <div className="row">
                            <div className="col l9">
                                <div className="divider"> </div>
                            {body}
                            <br/>
                            </div>
                            <div className="col l3">
                                <div className="card-panel teal lighten-5 ">
                                    <span className="bold">Labels:</span>
                                    <p>
                                    {label.map(label =>
                                        <Label type={label.name} color={label.color} close={true} removeLabel={() => {
                                            let labelsRemaining = [];
                                             label.filter(e => e.name !== labelName).map(label => labelsRemaining.push(label.name));
                                             issueService.removeLabel(issueId, labelsRemaining);
                                        }}/>
                                        )}
                                        <input type="button" className="btn btn-small" value="Add label"/>
                                    </p><br/>
                                    <span className="bold">Assigned</span>
                                    <div className="row">


                                        {issue.assignees !== null && issue.assignees !== 0 ? issue.assignees.map(issue =>
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
                                    {createdDate}
                                    </p><br/>
                                    <p><b>Last updated:</b><br/>
                                    {updatedDate}
                                    </p>
                                    <br/>
                                    <input type="button" className="btn btn-small red" value="Close issue" onClick={() => {
                                    issueService.closeIssue(issue.number).then(res => {
                                        alert("Issue closed");
                                        history.push("/");
                                        removeHandler(res.data);
                                    }).catch(req => console.log(req));
                                    }}/>
                                </div>
                            </div>
                        </div>
                        <div className="">


                        </div>
                        <div className="divider"></div>
                        <div className="">
                            <CommentField issueId={issueId}/>
                        </div>
                    </Card>
            </div>
        )
}
