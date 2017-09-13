import "bootstrap/less/bootstrap.less"
import "font-awesome/scss/font-awesome.scss"
import "open-sans-fontface/open-sans.scss"

import './toastr'
import "./styles/style.scss"

import * as React from 'react';
import ReactDOM = require('react-dom');
import {AppRouter} from './router'

import { setGlobalLogger } from '../lib/logger';
import { browserLogger } from './frontend-logger';

 // Init logger
setGlobalLogger(browserLogger);

ReactDOM.render(
    <AppRouter/>,
    document.getElementById("react-root")
);

