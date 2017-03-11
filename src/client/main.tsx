import * as React from 'react';
import ReactDOM = require('react-dom');
import {AppRouter} from './router'

import 'react-bootstrap-table/css/react-bootstrap-table.css';
import "bootstrap/less/bootstrap.less"
import "font-awesome/scss/font-awesome.scss"
import "open-sans-fontface/open-sans.scss"

import "./styles/style.scss"
import './toastr'

ReactDOM.render(
    <AppRouter/>,
    document.getElementById("react-root")
);

