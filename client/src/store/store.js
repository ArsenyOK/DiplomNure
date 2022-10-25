import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/indexReducer';

const initState = {};

const middleware = [thunk];

const store = createStore(rootReducer, initState,
    compose(
        applyMiddleware(...middleware),
    )
)

window.store = store;

export default store;