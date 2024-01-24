import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from "react-redux";
// import { createStore, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";
// import reducers from './reducers';
import App from './App';

// const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
    // <Provider store={store}>
    <App />
    // </Provider>
    , document.getElementById('root'));




// import { ConnectedRouter } from "connected-react-router";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { createBrowserHistory } from "history";
// import { composeWithDevTools } from "redux-devtools-extension";