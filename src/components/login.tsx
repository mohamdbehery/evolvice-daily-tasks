import React, { Component } from "react";
import { connect } from 'react-redux';
import Input from "../styled-components/input";
import Button from "../styled-components/button";
import { Helper } from "../helpers/helper";
import { AppBusiness } from "../helpers/app-business";
import { User } from "../types/User";
import { confirmAlert } from "react-confirm-alert";
import { loginMapStateToProps, loginMapDispatchToProps } from "../store/mapper";

interface LoginState {
    user: User
}
export class Login extends Component<any, LoginState> {

    appBusiness = new AppBusiness(this.props);
    helper = new Helper();

    constructor(props: any) {
        super(props);
        this.initState();
        this.username_Change = this.username_Change.bind(this);
        this.password_Change = this.password_Change.bind(this);
        this.login_Click = this.login_Click.bind(this);
    }

    initState() {
        this.state = {
            user: {
                username: '',
                password: ''
            }
        };
    }

    componentDidMount() {
        if (this.helper.getLoggedInUser())
            this.helper.redirectToPage('tasks');
    }

    login_Click() {
        let guest: User = this.state.user;
        if (guest && guest.username && guest.password) {
            this.appBusiness.Login(guest, (foundedUser: User) => {
                if (foundedUser) {
                    this.props.loginUser(foundedUser);
                    this.helper.setToLocalStorage("userData", foundedUser);
                    this.helper.redirectToPage('tasks');
                }
                else {
                    confirmAlert({
                        title: 'Invalid credentials',
                        message: 'Sorry, you have entered a wrong username or password',
                        buttons: [
                            {
                                label: 'Ok',
                                onClick: () => true
                            }
                        ]
                    });
                }
            });
        }
        else {
            confirmAlert({
                title: 'Data required',
                message: 'Please enter a valid username and password',
                buttons: [
                    {
                        label: 'Ok',
                        onClick: () => true
                    }
                ]
            });
        }
        if (this.props.login_Click)
            this.props.login_Click();
    }

    username_Change(event: any) {
        this.setState(
            {
                user:
                {
                    ...this.state.user,
                    username: event.target.value
                }
            });

        if (this.props.username_Change)
            this.props.username_Change();
    }

    password_Change(event: any) {
        this.setState(
            {
                user:
                {
                    ...this.state.user,
                    password: event.target.value
                }
            });
        if (this.props.password_Change)
            this.props.password_Change();
    }

    hendleEnterKey(e: any) {
        if (e.key == 'Enter')
            this.login_Click();
    }

    render() {
        return (
            <section className="section-property section-t8" data-testid="login-form">
                <div className="container">
                    <div className="login-form" onKeyPress={this.hendleEnterKey.bind(this)}>
                        <h2 className="text-center">Log in</h2>
                        <div className="form-group">
                            <Input data-testid="username" autoFocus type="text" className="form-control" placeholder="Username" value={this.state.user.username} onChange={this.username_Change} />
                        </div>
                        <div className="form-group">
                            <Input data-testid="password" type="password" className="form-control" placeholder="Password" value={this.state.user.password} onChange={this.password_Change} />
                        </div>
                        <div className="form-group">
                            <Button data-testid="login" type="submit" className="login-button" onClick={this.login_Click}>Log in</Button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default connect(loginMapStateToProps, loginMapDispatchToProps)(Login);