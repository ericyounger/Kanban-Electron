import React, {useState, useEffect } from 'react';
import {NavLink} from "react-router-dom";
import {issueService} from '../store/issueService';


/**
 * @function UserNameInput
 * UserNameInput is the first component the user sees, that lets user write in their username.
 *  RepoSelection uses the user input from this component to get their repos listed out.
 */
export function UserNameInput() {
    const [username, setUsername] = useState("");

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


export function AuthorizationInput() {
    const [tokenInput, setToken] = useState("");

    return (
        <div>
            <div className="card">
                <div className="card-content">
                    <div className="card-title">Add token</div>
                    <label>Add Github personal token</label>
                    <input type="text" className="input-field" id="usernameInput" onChange={(event) => setToken(event.target.value)} />
                    <NavLink to="/repos">
                        <button className="btn" onClick={() => issueService.token = tokenInput}>Next</button>
                    </NavLink>
                </div>
            </div>
        </div>
    )

}