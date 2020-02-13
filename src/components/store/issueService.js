import Axios from "axios";


let token = require("../../token/token.js");

/**
 * @class IssueService
 * @classdesc IssueService is a class that holds all methods for communicating with GitHub API
 */


class IssueService{
    user = "";
    authenticatedUser = "";
    repo = "";
    token = "";
    userAvatar = "";
    tokenAuth = token; // token.token
    allIssues = [];

    storeAuthenticatedUser(){
        //TODO: This is not working
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3.raw',
            "Authorization": `token ${this.tokenAuth}`,
        };
        Axios.get(`http://github.com/user/`, {headers: headers}).then(res => console.log(res)).catch(req => console.log(req));
    }

    storeAllIssues(callback){
        //TODO: get methods do not filter out closed or open
        Axios.get(`https://api.github.com/repos/${this.user}/${this.repo}/issues?state=all`).then(res => {
            this.allIssues = res.data;
            callback();
        });
    }

    getAllLabels(){
        return Axios.get(`https://api.github.com/repos/${this.user}/${this.repo}/labels?state=all` );
    }

    getAllRepos(){
        return Axios.get(`https://api.github.com/users/${this.user}/repos`);
    }

    getAllCommentsPerIssue(issueId){
        return Axios.get(`https://api.github.com/repos/${this.user}/${this.repo}/issues/${issueId}/comments`);
    }

    postIssue(json){
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3.raw',
            "Authorization": `token ${this.tokenAuth}`,
        };

        return Axios.post(`https://api.github.com/repos/${this.user}/${this.repo}/issues`, json , {headers: headers});
    }

    closeIssue(issueID){
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3.raw',
            "Authorization": `token ${this.tokenAuth}`,
        };

        let json = {
            state : "closed",
        };

        return Axios.patch(`https://api.github.com/repos/${this.user}/${this.repo}/issues/${issueID}`, json, {headers: headers});
    }

    removeLabel(issueID, list){
        let json = {
            labels: list
        };

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3.raw',
            "Authorization": `token ${this.tokenAuth}`,
        };

        Axios.patch(`https://api.github.com/repos/${this.user}/${this.repo}/issues/${issueID}`, json, {headers: headers}).then(res => console.log(res));
    }

    removeAssignes(issueID, list){
        let json = {
            assignees: list
        };

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3.raw',
            "Authorization": `token ${this.tokenAuth}`,
        };

        Axios.patch(`https://api.github.com/repos/${this.user}/${this.repo}/issues/${issueID}`, json, {headers: headers}).then(res => console.log(res));
    }

    addAssignees(issueID, list){
        let json = {
            assignees: list
        };

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3.raw',
            "Authorization": `token ${this.tokenAuth}`,
        };

        Axios.patch(`https://api.github.com/repos/${this.user}/${this.repo}/issues/${issueID}`, json, {headers: headers}).then(res => console.log(res));
    }



    postComment(json, issueID){
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3.raw',
            "Authorization": `token ${this.tokenAuth}`,
        };

        return Axios.post(`https://api.github.com/repos/${this.user}/${this.repo}/issues/${issueID}/comments`, json, {headers: headers});
        };



}

export let issueService = new IssueService();

