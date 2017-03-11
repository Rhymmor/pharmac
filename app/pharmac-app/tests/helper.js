"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const chai = require("chai");
exports.chai = chai;
const chaiAsPromised = require("chai-as-promised");
const connection_1 = require("../src/server/database/connection");
exports.sequelize = connection_1.sequelize;
const expect = chai.expect;
exports.expect = expect;
chai.use(chaiAsPromised);
function dbInit() {
    return __awaiter(this, void 0, void 0, function* () {
        connection_1.sequelize.sync();
    });
}
exports.dbInit = dbInit;
//# sourceMappingURL=helper.js.map