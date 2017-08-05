import { IdentifiabilityRest } from './identifiability-rest';
import { DirectProblemRest } from './direct-problem-rest';
import {Router} from 'express';

export const modelRouter = Router();

const directProblemRest = new DirectProblemRest();
const identifiabilityRest = new IdentifiabilityRest();

modelRouter.post("/api/model/direct-problem", directProblemRest.solveModel);
modelRouter.post("/api/model/identifiability", identifiabilityRest.solveModel);