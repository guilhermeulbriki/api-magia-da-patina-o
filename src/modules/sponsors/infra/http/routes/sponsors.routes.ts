import { Router } from 'express';

import SponsorController from '../controllers/SponsorsController';

const sponsorsRouter = Router();
const sponsorController = new SponsorController();

sponsorsRouter.get('/:page', sponsorController.list);
sponsorsRouter.post('/', sponsorController.create);

export default sponsorsRouter;
