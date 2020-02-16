import Axios from "axios";

import { createHashHistory } from 'history';
let history = createHashHistory();


/**
 * @class IssueService
 * @classdesc IssueService is a class that holds all methods for communicating with GitHub API
 */


class IssueService {
	user = "";
	repo = "";
	token = "";
	userAvatar = "";
	allIssues = [];
	allLabels = [];


	getAuthToken(code){
		const received = {
			'code': code
		};

		Axios.post(`http://localhost:8080/authorization/callback`, received)
			.then(res => {
				sessionStorage.setItem("token", res.data.access_token);
				this.token = res.data.access_token;

				setTimeout(() => {

					window.location.assign("http://localhost:3000/#/repos");

				}, 800);

			})
			.catch(req => console.log(req));
	}



	storeAuthenticatedUser(callback) {

		Axios.get('https://api.github.com/user?access_token=' + this.token)
			.then(response => {
				console.log(response.data.login);
				this.userAvatar = 'https://avatars.githubusercontent.com/' + response.data.login;
				this.user = response.data.login;
				console.log(response);
				callback();
			})
			.catch(reject => console.log(reject));
		/*
		Axios.post('http://localhost:8080/user', {token : this.token}).then(res =>{
			console.log(res);
			}).catch(req => {
				console.log(req);
		})

		 */

	}

	storeAllIssues(callback) {
		//TODO: get methods do not filter out closed or open
		Axios.get(
			`https://api.github.com/repos/${this.user}/${this.repo}/issues?state=open`
		).then(res => {
			this.allIssues = res.data;
			callback();
		});
	}

	storeAllLabels(callback) {
		Axios.get(
			`https://api.github.com/repos/${this.user}/${this.repo}/labels?state=all`
		).then(res => {
			this.allLabels = res.data;
			callback();
		});
	}

	getAllRepos() {
		return Axios.get(`https://api.github.com/users/${this.user}/repos`);
	}

	getAllCommentsPerIssue(issueId) {
		return Axios.get(
			`https://api.github.com/repos/${this.user}/${this.repo}/issues/${issueId}/comments`
		);
	}

	postIssue(json) {

		const headers = {
			"Content-Type": "application/json",
			Accept: "application/vnd.github.v3.raw",
			Authorization: `bearer ${this.token}`,
		};

		return Axios.post(
			`https://api.github.com/repos/${this.user}/${this.repo}/issues`,
			json,
			{ headers: headers }
		);
	}

	closeIssue(issueID) {
		const headers = {
			"Content-Type": "application/json",
			Accept: "application/vnd.github.v3.raw",
			Authorization: `bearer ${this.token}`
		};

		let json = {
			state: "closed"
		};

		return Axios.patch(
			`https://api.github.com/repos/${this.user}/${this.repo}/issues/${issueID}`,
			json,
			{ headers: headers }
		);
	}

	removeLabel(issueID, list) {
		let json = {
			labels: list
		};

		const headers = {
			"Content-Type": "application/json",
			Accept: "application/vnd.github.v3.raw",
			Authorization: `bearer ${this.token}`
		};

		Axios.patch(
			`https://api.github.com/repos/${this.user}/${this.repo}/issues/${issueID}`,
			json,
			{ headers: headers }
		).then(res => console.log(res));
	}

	removeAssignes(issueID, list) {
		let json = {
			assignees: list
		};

		const headers = {
			"Content-Type": "application/json",
			Accept: "application/vnd.github.v3.raw",
			Authorization: `bearer ${this.token}`
		};

		Axios.patch(
			`https://api.github.com/repos/${this.user}/${this.repo}/issues/${issueID}`,
			json,
			{ headers: headers }
		).then(res => console.log(res));
	}

	addAssignees(issueID, list) {
		let json = {
			assignees: list
		};

		const headers = {
			"Content-Type": "application/json",
			Accept: "application/vnd.github.v3.raw",
			Authorization: `bearer ${this.token}`
		};

		return Axios.patch(
			`https://api.github.com/repos/${this.user}/${this.repo}/issues/${issueID}`,
			json,
			{ headers: headers }
		);
	}

	postComment(json, issueID) {
		const headers = {
			"Content-Type": "application/json",
			Accept: "application/vnd.github.v3.raw",
			Authorization: `bearer ${this.token}`
		};

		return Axios.post(
			`https://api.github.com/repos/${this.user}/${this.repo}/issues/${issueID}/comments`,
			json,
			{ headers: headers }
		);
	}
}

export let issueService = new IssueService();

