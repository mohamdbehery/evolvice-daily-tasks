import { User } from "../types/User";

/**
 * all action types enum
 */
export enum ActionTypes {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT'
} 

export interface ILoginAction{
    type: ActionTypes.LOGIN,
    payload: User
};
export interface ILogoutAction{
    type: ActionTypes.LOGOUT
};

export type UserActionTypes = ILoginAction | ILogoutAction;
export type AppActions = UserActionTypes;

export const loginAction = (user: User): AppActions => ({
    type: ActionTypes.LOGIN,
    payload: user
});
export const logoutAction = (): AppActions => ({
    type: ActionTypes.LOGOUT
});

