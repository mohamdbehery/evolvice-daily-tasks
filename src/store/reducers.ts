import { User } from "../types/User";
import { UserActionTypes, ActionTypes } from "./actions";

const loginInitialState: User = {
    username: '',
    password: ''
};

export const loginReducer = (state = loginInitialState, action: UserActionTypes): User => {
    switch (action.type) {
        case ActionTypes.LOGIN:
            return {
                ...state,
                ...action.payload
            };
        case ActionTypes.LOGOUT:
            return loginInitialState;
        default:
            return state;
    }
};