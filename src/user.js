import React, {Component, useState, useEffect} from 'react';
import { createHashHistory } from 'history';
import { issueService } from './issueService';


let history = createHashHistory();


function UserSetting({logOut}){
    const [username, setUsername] = useState("");
    const [userImage, setAvatar] = useState("");
    const onLoad = useEffect(() => {
        setUsername(issueService.user);
        setAvatar(issueService.userAvatar);
    }, []);
        return(
            <div>
                <div className="card">

                    <div className="card-content">
                        <div className="card-title">User settings</div>
                        <div className="row">
                            <div className="col l4">
                                {username}
                            </div>

                            <div className="col l2">
                                {userImage}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-4">
                                <button className="btn" onClick={() => {
                                    localStorage.setItem("loggedIn", "false");
                                    logOut();
                                    history.push("/");
                                }}>Log out</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default UserSetting;