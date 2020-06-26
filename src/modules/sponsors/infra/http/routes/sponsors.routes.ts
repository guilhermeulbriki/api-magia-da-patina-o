import { Router } from 'express';

import SponsorController from '../controllers/SponsorsController';

const sponsorsRouter = Router();
const sponsorController = new SponsorController();

sponsorsRouter.get('/', sponsorController.listAll);
sponsorsRouter.post('/', sponsorController.create);
sponsorsRouter.put('/', sponsorController.update);
sponsorsRouter.delete('/', sponsorController.delete);

export default sponsorsRouter;
