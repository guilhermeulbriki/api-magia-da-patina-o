import { Router } from 'express';

import SponsorController from '../controllers/SponsorsController';

const sponsorsRouter = Router();
const sponsorController = new SponsorController();

sponsorsRouter.post('/', sponsorController.create);
sponsorsRouter.get('/', sponsorController.listAll);

export default sponsorsRouter;
