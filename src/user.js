import React, {Component} from 'react';

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

                    </div>
                </div>
            </div>
        )
    }
}