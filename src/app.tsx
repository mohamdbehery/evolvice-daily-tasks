import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Helper } from './helpers/helper';
import { store } from './store/store';
import { connect } from 'react-redux';
import { loginMapStateToProps, loginMapDispatchToProps } from './store/mapper';
import { User } from './types/User';

interface AppState {
    authUser: User
}

export class App extends Component<any, AppState> {

    helper = new Helper();
    constructor(props: any) {
        super(props);
        this.initState();
        this.logout_Click = this.logout_Click.bind(this);
    }

    initState() {
        this.state = {
            authUser: {
                id: 0,
                name: '',
                picture: '',
                username: '',
                password: ''
            }
        };
    }

    componentDidMount() {
        store.subscribe(() => {
            let login: User = store.getState().login;
            if (login) {
                this.setState({
                    authUser: login,
                });
            }
        });

        let authUser: User = this.helper.getLoggedInUser();
        if (authUser)
            this.setState({ authUser });
    }

    logout_Click() {
        this.props.logoutUser();
        this.helper.removeFromLocalStorage("userData");
        this.helper.redirectToPage('login');
    }

    render() {
        let loginStatusView: JSX.Element = this.state.authUser.name ?
            (
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle login-status" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        {this.state.authUser.name} <img className="navbar-profile-img" src={this.state.authUser.picture} />
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <NavLink className="dropdown-item" to={'/profile'}>Profile</NavLink>
                        <a className="dropdown-item logout" onClick={this.logout_Click}>Log out</a>
                    </div>
                </li>
            ) : (
                <li className="nav-item">
                    <NavLink className="nav-link" to={'/login'}>Login</NavLink>
                </li>
            );

        return (
            <div>
                <nav className="navbar navbar-default navbar-trans navbar-expand-lg fixed-top">
                    <div className="container">
                        <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarDefault"
                            aria-controls="navbarDefault" aria-expanded="false" aria-label="Toggle navigation">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        <a className="navbar-brand text-brand" href="/">Daily <span className="color-b">Tasks</span></a>
                        <div className="navbar-collapse collapse" id="navbarDefault">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={'/tasks'}>Tasks</NavLink>
                                </li>
                                {loginStatusView}
                            </ul>
                        </div>
                    </div>
                </nav>
                {this.props.children}
            </div>
        )
    }
}

export default connect(loginMapStateToProps, loginMapDispatchToProps)(App);