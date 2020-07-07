import { Router } from 'express';

import checkAuthenticated from '@shared/infra/http/middlewares/checkAuthenticated';
import SponsorStudentsController from '../controllers/SponsorStudentsController';

const sponsorStudentsRouter = Router();
const sponsorStudentsController = new SponsorStudentsController();

sponsorStudentsRouter.use(checkAuthenticated);

sponsorStudentsRouter.get('/:sponsor_id', sponsorStudentsController.find);

export default sponsorStudentsRouter;
