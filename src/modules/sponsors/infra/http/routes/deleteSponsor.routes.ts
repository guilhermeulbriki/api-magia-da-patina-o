import { Router } from 'express';

import checkAuthenticated from '@shared/infra/http/middlewares/checkAuthenticated';
import SponsorController from '../controllers/SponsorsController';

const deleteSponsorRouter = Router();
const sponsorController = new SponsorController();

deleteSponsorRouter.use(checkAuthenticated);

deleteSponsorRouter.delete('/', sponsorController.delete);

export default deleteSponsorRouter;
