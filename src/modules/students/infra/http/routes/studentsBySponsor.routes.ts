import { Router } from 'express';

import checkAuthenticated from '@shared/infra/http/middlewares/checkAuthenticated';
import StudentsBySponsorController from '../controllers/StudentsBySponsorController';

const sponsorStudentsRouter = Router();
const studentsBySponsorController = new StudentsBySponsorController();

sponsorStudentsRouter.use(checkAuthenticated);

sponsorStudentsRouter.get('/:sponsor_id', studentsBySponsorController.find);

export default sponsorStudentsRouter;
