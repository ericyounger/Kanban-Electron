import Axios from "axios";

let token = require("./token/token.js");

/**
 * @class IssueService
 * @classdesc IssueService is a class that holds all methods for communicating with GitHub API
 */
class IssueService{
    user = "ericyounger";
    repo = "Kanban-Electron";
    loggedIn = true;
    tokenAuth = token.token;

    getAllIssues(){
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
        let packed = this.packPost(json);
        return Axios.post(`http://api.github.com/${this.repo}/${this.user}/repo/issues`, packed);
    }

    packPost(json) {
        let headers = {
            "url": `http://api.github.com/${this.repo}/${this.user}/repo/issues`,
            "method": "POST",
            "headers": {"Authorization": `token ${this.tokenAuth}`},
            "body": JSON.stringify({title: json.title, body: json.body})
        };
        return headers;
    }

}

export let issueService = new IssueService();

