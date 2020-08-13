import { AppState } from "./store";
import { Dispatch } from "redux";
import { User } from "../types/User";
import { ActionTypes } from "./actions";

export const loginMapStateToProps = (state: AppState) => {
    return {
        login: state.login
    };
};

export const loginMapDispatchToProps = (dispatch: Dispatch) => {
    return {
        loginUser: (user: User) => {
            dispatch({
                type: ActionTypes.LOGIN,
                payload: user
            })
        },
        logoutUser: () => {
            dispatch({
                type: ActionTypes.LOGOUT,
            })
        }
    };
};