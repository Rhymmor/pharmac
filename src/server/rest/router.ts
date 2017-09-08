import { modelRouter } from './model';
import {Router} from 'express';
import {app_router} from './application';
export const router = Router();

router.use(app_router);
router.use(modelRouter);
