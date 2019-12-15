import Axios from "axios";
class IssueService{
    user = "ericyounger";
    repo = "Kanban-Electron";
    issues = [];
    categories = [];

    getAllIssues(){
        return Axios.get(`https://api.github.com/repos/${this.user}/${this.repo}/issues?state=all`);
    }

    getAllLabels(){
        return Axios.get(`https://api.github.com/repos/${this.user}/${this.repo}/labels?state=all` );

    }
}

export let issueService = new IssueService();
