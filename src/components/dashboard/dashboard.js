
import React, {Component, useState, useEffect} from 'react';
import {Label, Card, } from '../widgets/Widgets';
import {issueService} from '../store/issueService';
import { FaEllipsisH } from "react-icons/all";
import { FaTh } from "react-icons/all";
import { FaBars } from "react-icons/all";

/**
 * @function Dashboard
 * Dashboard is the landing page when logged in, and displays all issues with labels categorised.
 */

export function Dashboard(){
    const [issues, setIssues] = useState([]);
    const [labels, setLabels] = useState([]);
    const [display, setDisplayMode] = useState("slide");
    const [hideShow, setHideShow] = useState("Hide empty");
    const [labelSize, setLabelSize] = useState(200);

    const onLoad = useEffect(() => {
        issueService.storeAllIssues(() => {
            setIssues(issueService.allIssues);
        });
        issueService.storeAllLabels(() => setLabels(issueService.allLabels));
        setIssues(issueService.allIssues);
        

    }, []);

    const onRangeChange = useEffect(() => {
        let label = document.querySelectorAll(".label-width");
        if (label != null) {
            label.forEach(x => x.setAttribute("style", `width:${labelSize}px`));

        }
    }, [labelSize]);

        if (issues.length === -1) {
            return(
                <LoadingContent/>        
            )
        } else {
            return (
                <div>
                    {display === "slide" ?
                        <SlideDisplay labels={labels} issues={issues}/>
                        : null}

                    {display === "table" ?
                        <TableDisplay labels={labels} issues ={issues}/>
                        : null}


                    {display === "list" ?
                        <ListDisplay labels={labels} issues={issues}/>
                        : null}

                    <FilterBar 
                        displayTable={() => setDisplayMode("table")} 
                        displayList={() => setDisplayMode("list")} 
                        displaySlide={() => setDisplayMode("slide")} 
                        toggleHideEmpty={() => { hideShow === "Hide empty" ? setHideShow("Show empty") : setHideShow("Hide empty")}} 
                        hideShow={hideShow} 
                        handleRange={(event) => setLabelSize(event.target.value)} 
                        labelSize={labelSize}
                    />
                    
                </div>
            )
        }
    }

export function LoadingContent(){
    return (
        <div className="center-progress center">
            Building skynet
					<div className="progress">
                <div className="indeterminate"> </div>
            </div>
        </div>
    )
}

export function SlideDisplay({labels, issues }){
    return(
        <div className="flex">
            {labels.map(e =>
                <div className="label-width">
                    <Label type={e.name} color={e.color} id={e.id} />

                    {issues.filter(filt => filt.labels[0] != null && e.name === filt.labels[0].name).map((issue, index) =>
                        <Card key={issue} title={issue.title} issueNumber={issue.number} assign={issue.assignees}>
                            {issue.body}
                        </Card>
                    )}
                </div>
            )}
            <div className="label-width">
                <Label type={"unlabeled"} color={"FF7F00"} id={0} />
                {issues.filter(e => e.labels.length === 0).map(issue =>
                    <Card title={issue.title} id={issue.id} issueNumber={issue.number} assign={issue.assignees}>
                        {issue.body}
                    </Card>
                )}
            </div>
        </div>
    )
}

export function TableDisplay({labels, issues}){
    return(
        <div className="row">
            {labels.map(e =>
                <div className="col l3">
                    <Label type={e.name} color={e.color} id={e.id} />

                    {issues.filter(filt => filt.labels[0] != null && e.name === filt.labels[0].name).map(issue =>
                        <Card title={issue.title} id={issue.id} issueNumber={issue.number} assign={issue.assignees}>
                            {issue.body}
                        </Card>
                    )}
                </div>
            )}
            <div className="col l3">
                <Label type={"unlabeled"} color={"FF7F00"} id={0} />
                {issues.filter(e => e.labels.length === 0).map(issue =>
                    <Card title={issue.title} id={issue.id} issueNumber={issue.number} assign={issue.assignees}>
                        {issue.body}
                    </Card>
                )}
            </div>
        </div>
    )
}

export function ListDisplay({labels, issues}){
    return(
        <div className="padding-bottom-50">
            {labels.map(e =>
                <div>
                    <Label type={e.name} color={e.color} id={e.id} />

                    {issues.filter(filt => filt.labels[0] != null && e.name === filt.labels[0].name).map(issue =>
                        <Card title={issue.title} id={issue.id} issueNumber={issue.number} assign={issue.assignees}>
                            {issue.body}
                        </Card>
                    )}
                </div>
            )}

            <div>
                <Label type={"unlabeled"} color={"FF7F00"} id={0} />
                {issues.filter(e => e.labels.length === 0).map(issue =>
                    <Card title={issue.title} id={issue.id} issueNumber={issue.number} assign={issue.assignees}>
                        {issue.body}
                    </Card>
                )}
            </div>

        </div>
    )
}

export function FilterBar({displayTable, displayList, displaySlide, toggleHideEmpty, hideShow, handleRange, labelSize}){
    return(
        <div className="filter-bar">
            <div className="flex">
                <div onClick={displayTable} className="pointer filter-icon margin-right-15">
                    <FaTh />
                </div>

                <div onClick={displayList} className="pointer filter-icon margin-right-15">
                    <FaBars />
                </div>

                <div onClick={displaySlide} className="pointer filter-icon margin-right-15">
                    <FaEllipsisH />
                </div>

                <div className="filter-icon pointer margin-right-15" onClick={toggleHideEmpty}>
                    {hideShow}
                </div>

                <div className="range-field">
                    <input type="range" min="200" max="600" value={labelSize} onChange={handleRange} />
                </div>

            </div>
        </div>
    )
}