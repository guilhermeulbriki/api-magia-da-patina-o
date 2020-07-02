import { Router } from 'express';

import SponsorController from '../controllers/SponsorsController';

const sponsorsRouter = Router();
const sponsorController = new SponsorController();

sponsorsRouter.get('/', sponsorController.list);
sponsorsRouter.post('/', sponsorController.create);

export default sponsorsRouter;
