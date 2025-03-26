import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import {
	postReducer,
	postsReducer,
	userReducer,
	usersReducer,
} from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
	users: usersReducer,
	user: userReducer,
	post: postReducer,
	posts: postsReducer,
});

export const store = createStore(
	reducer,
	composeEnhancers(applyMiddleware(thunk)),
);
