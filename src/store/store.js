import { createStore, combineReducers,applyMiddleware  } from 'redux';
import userReducer from './reducers/user';
import loadingReducer from './reducers/loading';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
const middleware = [thunkMiddleware];

const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
