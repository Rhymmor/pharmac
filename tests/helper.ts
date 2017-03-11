import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { sequelize } from '../src/server/database/connection';

const expect = chai.expect;
chai.use(chaiAsPromised);

export {chai, expect};
export {sequelize};

export async function dbInit() {
    sequelize.sync();
}

