import React, { Component, useState, useEffect } from 'react';
import { HashRouter, NavLink, Route } from "react-router-dom";
import {issueService} from '../store/issueService';
import {Label, Card} from '../widgets/Widgets';

export function SmallContent({ page }) {
    return (
        <div className="smallContent">
            {page}
        </div>
    )
}


export function Content({ page }) {
    return (
        <div className="content">
            {page}
        </div>
    )
}

/**
 * @function IssueContent
 * IssueContent is the main container for all the content
 */
export function IssueContent({ category, color }) {
    const [issues, setIssues] = useState([]);
    const onLoad = useEffect(() => {

        if (category === "unlabeled") {
            setIssues(issueService.allIssues.filter(e => e.labels.length === 0));
        } else {
            setIssues(issueService.allIssues.filter(e => (e.labels[0] != null) && (e.labels[0].name.trim() === category)));
        }

    }, []);

    return (
        <div>
            <Label type={category} color={color} />
            <div className="fixer">
                {issues.map(issue =>
                    <div className="col l3">
                        <Card title={issue.title} id={issue.id} issueNumber={issue.number} assign={issue.assignees}>
                            {issue.body}
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}