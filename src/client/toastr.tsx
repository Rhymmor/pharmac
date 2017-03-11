
import 'toastr/package/toastr.css';
import toastr = require("toastr");
export {toastr};

toastr.options.preventDuplicates = false;
toastr.options.timeOut = 1000;
toastr.options.extendedTimeOut = 20;

