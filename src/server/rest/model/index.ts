import { InverseProblemRest } from './inverse-problem-rest';
import { IdentifiabilityRest } from './identifiability-rest';
import { DirectProblemRest } from './direct-problem-rest';
import {Router} from 'express';

export const modelRouter = Router();

const directProblemRest = new DirectProblemRest();
const identifiabilityRest = new IdentifiabilityRest();
const inverseProblemRest = new InverseProblemRest();

modelRouter.post("/api/model/direct-problem", directProblemRest.solveModel());
modelRouter.post("/api/model/identifiability", identifiabilityRest.solveModel());
modelRouter.post("/api/model/inverse-problem", inverseProblemRest.solveModel());