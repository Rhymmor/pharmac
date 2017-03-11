"use strict";
require("toastr/package/toastr.css");
const toastr = require("toastr");
exports.toastr = toastr;
toastr.options.preventDuplicates = false;
toastr.options.timeOut = 1000;
toastr.options.extendedTimeOut = 20;
//# sourceMappingURL=toastr.js.map