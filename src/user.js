import React, {Component} from 'react';
import { createHashHistory } from 'history';


let history = createHashHistory();


export class UserSetting extends Component{
    render() {
        return(
            <div>
                <div className="card">

                    <div className="card-content">
                        <div className="card-title">User settings</div>
                        <div className="row">
                            <div className="col l4">
                                username
                            </div>

                            <div className="col l2">
                                User image
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-4">
                                <button className="btn" onClick={this.logOut}>Log out</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    logOut = () => {
        localStorage.setItem("loggedIn", "false");
        this.props.logOut();
        history.push("/");
    }
}