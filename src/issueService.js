import Axios from "axios";


let token = require("./token/token.js");

/**
 * @class IssueService
 * @classdesc IssueService is a class that holds all methods for communicating with GitHub API
 */


class IssueService{
    user = "ericyounger";
    repo = "Kanban-Electron";
    userAvatar = "";
    loggedIn = true;
    tokenAuth = token.token;

    getUser(){
        //TODO: This is not working
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3.raw',
            "Authorization": `token ${this.tokenAuth}`,
        };
        Axios.get(`http://github.com/user/${this.user}`).then(res => console.log(res));
    }

    getAllIssues(){
        //TODO: get methods do not filter out closed or open
        return Axios.get(`https://api.github.com/repos/${this.user}/${this.repo}/issues?state=all`);
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

