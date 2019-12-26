import Axios from "axios";
import {sharedComponentData} from "react-simplified";

class IssueService{
    user = "ericyounger";
    repo = "Kanban-Electron";
    issues = [];
    loggedIn = false;

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
}

export let issueService = sharedComponentData(new IssueService());
