
import * as React from 'react';
import { Label, Card } from '../widgets/Widgets.js';
import { Component, useState, useEffect } from 'react';
import { issueService } from "../store/issueService";
import { Chip } from "../widgets/Widgets";
import { createHashHistory } from 'history';
let history = createHashHistory();

/**
 * @function CommentField
 * CommentField is the parent component of the comments, it both shows submitted comments, and also holds the
 * input form for submitting new comments
 */
export function CommentField({ issueId, updateIssues }) {
    const [comments, setComments] = useState([]);
    const [newComment, setCommentInput] = useState("");

    const onLoad = useEffect(() => {
        issueService.getAllCommentsPerIssue(issueId).then(res => setComments(res.data));
    }, []);

    const onNewIssue = useEffect(() => {
    },[comments]);

    function addComment(){
        let json = {
            body: newComment
        };

        issueService.postComment(json, issueId).then(response => {
            setComments([...comments, response.data]);
            setCommentInput("");
        });
    }
    return (
        <div className="addForm">
            {comments.length > 0 ? comments.map(comment =>
                <Comment user={comment.user.login} date_comment={comment.created_at} comment={comment.body} avatar={comment.user.avatar_url} />
            ) : "No comments"}

            <textarea onChange={(event) => setCommentInput(event.target.value)}>

            </textarea>

            <button className="btn teal" onClick={addComment}>Comment</button>
        </div>
    )
}

/**
 * @function Comment
 * Comment is the component that holds information on one comment. This component is usually mapped
 * and shows comment information through props
 */
export function Comment({ date_comment, avatar, user, comment }) {
    const [comment_days_ago, setCommentDate] = useState("");
    const onLoad = useEffect(() => {
        let commentDateString = date_comment.replace(/-/g, '').substr(0, 8);
        setCommentDate(commentDateString);
    }, []);

    return (
        <div>
            <div className="card grey lighten-4">
                <div className="row">
                    <div className="col l1 center-align">
                        <img src={avatar} className="avatar-comments" alt="" />
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