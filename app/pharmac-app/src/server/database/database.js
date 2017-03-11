"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const async_file_1 = require("async-file");
const umzug = require("umzug");
const logger_1 = require("../modules/logger");
const connection_1 = require("./connection");
/**
 * Should be called before DB access
 *
 * @export
 */
function synchronize() {
    return __awaiter(this, void 0, void 0, function* () {
        yield connection_1.sequelize.sync();
    });
}
exports.synchronize = synchronize;
const migrations_path = './app/web/src/server/database/migrations';
const migrator = new umzug({
    storage: 'sequelize',
    storageOptions: {
        sequelize: connection_1.sequelize,
        tableName: '_migrations'
    },
    upName: 'up',
    downName: 'down',
    migrations: {
        // The params that gets passed to the migrations.
        // Might be an array or a synchronous function which returns an array.
        params: [connection_1.sequelize.getQueryInterface()],
        path: migrations_path,
        pattern: /^\d+[\w-]+\.js$/
    }
});
/**
 * Migrate DB schema to latest version (rules are in 'database/migrations' directory)
 *
 * @export
 */
function migrate() {
    return __awaiter(this, void 0, void 0, function* () {
        yield async_file_1.lstat(migrations_path)
            .then((stats) => __awaiter(this, void 0, void 0, function* () {
            if (stats.isDirectory()) {
                yield migrator.up()
                    .then(() => {
                    logger_1.logger.info('DB successfully migrated to latest schema');
                })
                    .catch((err) => {
                    logger_1.logger.error('DB migration error: ' + String(err));
                });
            }
        }))
            .catch(() => { });
    });
}
exports.migrate = migrate;
//# sourceMappingURL=database.js.map