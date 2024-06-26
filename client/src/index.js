import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import store from './store';

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);