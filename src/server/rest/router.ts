import { logger } from '../modules/logger';
import {Router} from 'express';
import {app_router} from './application';
export const router = Router();

router.use(app_router);

