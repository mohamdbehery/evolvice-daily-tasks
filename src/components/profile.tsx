import React, { Component } from "react";
import { Helper } from "../helpers/helper";
import { User } from "../types/User";

interface ProfileState {
    user: User
}

export class Profile extends Component<any, ProfileState> {

    helper = new Helper();
    constructor(props: any) {
        super(props);
        this.initState();        
    }

    initState(){
        this.state = {
            user:{
                id: 0,
                name: '',
                about: '',
                mail: '',
                username: '',
                password: '',
                address: '',
                fb: '',
                in: '',
                picture: '',
            }
        };
    }

    componentDidMount() {
        this.setState({
            user: this.helper.getLoggedInUser()
        });
    }

    render() {
        return (
            <section className="section-property section-t8">
                <div className="container">
                    <div className="row profile">
                        <div className="col-sm-6 col-md-4">
                            <img src={this.state.user.picture} alt="" className="img-profile" />
                        </div>
                        <div className="col-sm-6 col-md-8">
                            <h4>
                                {this.state.user.name}
                            </h4>
                            <div className="profile-address">
                                <i className="fa fa-location-arrow"></i> {this.state.user.address}
                            </div>
                            <p>
                                {this.state.user.about}
                            </p>
                            <p className="profile-links">
                                <i className="mail">
                                    {this.state.user.mail}
                                </i>
                                <br />
                                <i className="fa fa-linkedin"></i> {this.state.user.in}
                                <br />
                                <i className="fa fa-facebook"></i> {this.state.user.fb}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Profile;