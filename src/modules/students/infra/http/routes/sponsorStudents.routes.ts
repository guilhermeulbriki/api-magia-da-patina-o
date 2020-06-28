import { Router } from 'express';

import ensureAuthentication from '@modules/sponsors/infra/http/middlewares/ensureAuthenticated';
import SponsorStudentsController from '../controllers/SponsorStudentsController';

const sponsorStudentsRouter = Router();
const sponsorStudentsController = new SponsorStudentsController();

sponsorStudentsRouter.use(ensureAuthentication);

sponsorStudentsRouter.get('/', sponsorStudentsController.find);

export default sponsorStudentsRouter;
