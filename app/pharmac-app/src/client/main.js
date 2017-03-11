"use strict";
const React = require("react");
const ReactDOM = require("react-dom");
const router_1 = require("./router");
require("react-bootstrap-table/css/react-bootstrap-table.css");
require("bootstrap/less/bootstrap.less");
require("font-awesome/scss/font-awesome.scss");
require("open-sans-fontface/open-sans.scss");
require("./styles/style.scss");
require("./toastr");
ReactDOM.render(React.createElement(router_1.AppRouter, null), document.getElementById("react-root"));
//# sourceMappingURL=main.js.map