import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
    <Router>
        <App />
    </Router>
);