import 'react-bootstrap-table/css/react-bootstrap-table.css';
import "bootstrap/less/bootstrap.less"
import "font-awesome/scss/font-awesome.scss"
import "open-sans-fontface/open-sans.scss"

import './toastr'
import "./styles/style.scss"

import * as React from 'react';
import ReactDOM = require('react-dom');
import {AppRouter} from './router'

ReactDOM.render(
    <AppRouter/>,
    document.getElementById("react-root")
);

