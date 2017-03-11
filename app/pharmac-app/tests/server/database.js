"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const agent_node_1 = require("../../src/server/database/collections/agent_node");
const helper_1 = require("../helper");
describe('AgentNode', () => {
    before(helper_1.dbInit);
    it("should serialize nodes", () => __awaiter(this, void 0, void 0, function* () {
        const url = "http://localhost";
        const res = yield agent_node_1.AgentNode.create({ host: "127.0.0.1", url });
        helper_1.expect(res).to.be.ok;
        const nodes = yield agent_node_1.AgentNode.findAll();
        helper_1.expect(nodes[0].url).to.equal(url);
        helper_1.expect(nodes.length).to.equal(1);
    }));
    it("should require url", () => __awaiter(this, void 0, void 0, function* () {
        helper_1.expect(agent_node_1.AgentNode.create({ host: "127.0.0.1" })).to.eventually.be.rejected;
    }));
});
//# sourceMappingURL=database.js.map