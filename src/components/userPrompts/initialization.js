import React, {useState, useEffect } from 'react';
import {NavLink} from "react-router-dom";
import {issueService} from '../store/issueService';

import { createHashHistory } from 'history';
import {LoadingContent} from "../widgets/Widgets";

let history = createHashHistory();

/**
 * @function UserNameInput
 * UserNameInput is the first component the user sees, that lets user write in their username.
 *  RepoSelection uses the user input from this component to get their repos listed out.
 */
export function UserNameInput() {
    const [username, setUsername] = useState("");

    const onLoad = useEffect(() => {
        issueService.token = sessionStorage.getItem("token");
        console.log(issueService.token);
        issueService.storeAuthenticatedUser();
        if(issueService.token === null) history.push("/");



    },[]);

    return (
        <div>
            <div className="card">
                <div className="card-content">
                    <div className="card-title">Login</div>
                    <label>GitHub User-name</label>
                    <input type="text" className="input-field" id="usernameInput" onChange={(event) => setUsername(event.target.value)} />
                    <NavLink to="/repos">
                        <button className="btn" onClick={() => {
                            issueService.user = username;
                        }}>Next</button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

/**
 * @function RepoSelection
 *  RepoSelection lists up all repos associated with user, and lets user select repo.
 */
export function RepoSelection(props) {
    const [repos, setRepos] = useState([]);
    const onLoadEffect = useEffect(() => {

        issueService.getAllRepos().then(res => setRepos(res.data));
    }, [])


    return (
        <div>
            <div className="card width-30 login-form">
                <div className="card-content">
                    <div className="card-title">Choose repo</div>
                    {repos.map((repos, index) =>
                        <p>
                            <label>
                                <input name="group1" type="radio" id="radioRepo" value={repos.name} />
                                <span>{repos.name}</span>
                            </label>
                        </p>
                    )}
                    <button className="btn" onClick={() => {
                        let selectedRepo = document.querySelector("input[name = group1]:checked").value;
                        issueService.repo = selectedRepo;
                        props.handleLogin();
                    }}>Next</button>
                </div>
            </div>
        </div>
    )

}

export function Callback(){
    const onLoad = useEffect(() => {
        let code = window.location.href.match(/\?code=(.{20})/)[1];
        issueService.getAuthToken(code);
    }, []);

    return(
        <div>
            <LoadingContent title={"Authorizing"} />
        </div>
    )
}

export function AuthorizationInput() {

    return (
			<div>
				<div className="card">
					<div className="card-content center-align">
						<div className="card-title">Connect with GitHub</div>
						<img
							src="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
							width={400}
						/>
						<button
							className="btn"
							onClick={() =>
								window.location.assign(
									"https://github.com/login/oauth/authorize?client_id=ee428610bc357f539e6d&scope=repo read:user&redirect_uri=http://localhost:3000/#/authorization/callback"
								)
							}
						>
							Connect
						</button>
					</div>
				</div>
			</div>
		);

}