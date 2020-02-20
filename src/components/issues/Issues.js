import * as React from 'react';
import {useEffect, useState} from 'react';
import {issueService} from "../store/issueService";
import {Card, Chip, Label} from "../widgets/Widgets";
import {CommentField} from '../comments/comments';
import {createHashHistory} from 'history';

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
        issueService.storeAllLabels(() => {
            setLabels(issueService.allLabels);
            setSelectedLabel(issueService.allLabels[0].name);
        });
    }, []);

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
export function IssueView({issue, removeHandler, updateIssues}){
    const [createdDate, setCreatedDate] = useState("");
    const [updatedDate, setUpdatedDate] = useState("");
    const [labels, setLabels] = useState([issue.label]);

    console.log(issue);
    const onLoad = useEffect(() => {
        //TODO: Restructure into smaller components.
        console.log("Refresh issue");
    }, [issue]);

    function closeIssue(){
        issueService.closeIssue(issue.number).then(res => {
            alert("Issue closed");
            history.push("/");
            removeHandler(res.data);
        }).catch(req => alert("Something went wrong"));
    }

    function assignMe(){
        issueService.addAssignees(issue.number, [issueService.user])
            .then(res => {
                issue.assignees = issue.assignees.concat(res.data.assignees);
                let newIssue = issue;
                issueService.allIssues = issueService.allIssues.filter(e => e.number !== issue.number);
                issueService.allIssues.push(newIssue);
                updateIssues();
            });
    }

    function unassignMe(){
        let index = issue.assignees.indexOf(issueService.user);
        issue.assignees.splice(index,1);
        let newIssue = issue;
        issueService.allIssues = issueService.allIssues.filter(e => e.number !== issue.number);
        issueService.allIssues.push(newIssue);
        updateIssues();



        issueService.removeAssignes(issue.number, issue.assignees).then(res => {

        }).catch(reject => console.log(reject));
    }

    function removeLabel(labelToRemove, issue){
        let index = issue.labels.indexOf(labelToRemove);
        issue.labels.splice(index, 1);
        let newIssue = issue;
        issueService.allIssues = issueService.allIssues.filter(e => e.number !== issue.number);
        issueService.allIssues.push(newIssue);
        updateIssues();

        issueService.removeLabel(issue.number, issue.labels).then(res => console.log(res)).catch(rej => console.log(rej));
    }

        return(
            <div className="">
                    <Card title={issue.title} type="simple">
                        <div className="row">
                            <div className="col l9">
                                <div className="divider"> </div>
                            {issue.body}
                            <br/>
                            </div>
                            <div className="col l3">
                              <IssueControlPanel issue={issue} assignMe={assignMe} closeIssue={closeIssue} unassignMe={unassignMe} removeLabel={removeLabel}/>
                            </div>
                        </div>
                        <div className="">


                        </div>
                        <div className="divider"></div>
                        <div className="">
                            <CommentField issueId={issue.number}/>
                        </div>
                    </Card>
            </div>
        )
}

function IssueControlPanel({issue, assignMe, closeIssue, unassignMe, removeLabel}){

    return(
        <div className="card-panel teal lighten-5 ">
            <span className="bold">Labels:</span>
            <p>
                {issue.labels.map(label =>
                    <Label type={label.name} color={label.color} close={true} removeLabel={(type) => {
                        removeLabel(type, issue);
                    }}/>
                )}
                <input type="button" className="btn btn-small" value="Add label"/>
            </p><br/>
            <span className="bold">Assigned</span>
            <div className="row">


                {issue.assignees.length !== 0 ? issue.assignees.map(issue =>
                    <div className="addForm">
                        <Chip type={issue.login} image={issue.avatar_url} unassignMe={unassignMe}/>
                    </div>
                ):<div className="addForm">{"No one assigned"}</div>}


                <div className="addForm">
                    <input type="button" className="btn btn-small" value="Assign me" onClick={assignMe}/>
                    <input type="button" className="btn btn-small" value="Assign someone"/>
                </div>
            </div>

            <p><b>Date created:</b><br/>
                {issue.created_at.replace("T", " / ").replace("Z", " ")}
            </p><br/>
            <p><b>Last updated:</b><br/>
                {issue.updated_at.replace("T", " / ").replace("Z", " ")}
            </p>
            <br/>
            <input type="button" className="btn btn-small red" value="Close issue" onClick={closeIssue}/>
        </div>
    )
}