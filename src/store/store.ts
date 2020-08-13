import { createStore, applyMiddleware, combineReducers, Store } from 'redux';
import { loginReducer } from './reducers';
import { AppActions } from './actions';

const rootReducer = combineReducers({
    login: loginReducer
});

export type AppState = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer, applyMiddleware(
    () => (next: any) => (action: AppActions)=> {
    console.log("Middleware Logger: " + action.type);
    next(action);
}));