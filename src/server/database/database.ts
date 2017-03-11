import { lstat } from 'async-file';
import * as umzug from 'umzug';

import { logger } from '../modules/logger';
import { sequelize } from './connection';

/**
 * Should be called before DB access
 *
 * @export
 */
export async function synchronize() {
    await sequelize.sync();
}

const migrations_path = './app/web/src/server/database/migrations';

const migrator = new umzug({
            storage: 'sequelize',

            storageOptions: {
                sequelize: sequelize,
                tableName: '_migrations'
            },
            upName: 'up',
            downName: 'down',

            migrations: {
                // The params that gets passed to the migrations.
                // Might be an array or a synchronous function which returns an array.
                params: [sequelize.getQueryInterface()],
                path: migrations_path,
                pattern: /^\d+[\w-]+\.js$/
            }
        });


/**
 * Migrate DB schema to latest version (rules are in 'database/migrations' directory)
 *
 * @export
 */
export async function migrate() {
    await lstat(migrations_path)
        .then( async (stats) => {
            if (stats.isDirectory()) {
                await migrator.up()
                    .then( () => {
                        logger.info('DB successfully migrated to latest schema');
                    })
                    .catch( (err) => {
                        logger.error('DB migration error: ' + String(err));
                    });
            }
        })
        .catch( () => {} );
}
