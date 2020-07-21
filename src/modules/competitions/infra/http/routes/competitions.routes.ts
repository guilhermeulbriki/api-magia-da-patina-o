import { Router } from 'express';

import checkAuthenticated from '@shared/infra/http/middlewares/checkAuthenticated';
import CompetitionController from '../controllers/CompetitionController';

const competitionRouter = Router();
const competitionController = new CompetitionController();

competitionRouter.use(checkAuthenticated);

competitionRouter.get('/:id', competitionController.show);
competitionRouter.get('/', competitionController.list);
competitionRouter.post('/', competitionController.create);
competitionRouter.put('/:id', competitionController.update);
competitionRouter.delete('/:id', competitionController.delete);

export default competitionRouter;
