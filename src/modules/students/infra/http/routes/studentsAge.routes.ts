import { Router } from 'express';

import checkAuthenticated from '@shared/infra/http/middlewares/checkAuthenticated';
import StudentsAgeController from '../controllers/StudentsAgeController';

const studentsAgeRoutes = Router();
const studentsAgeController = new StudentsAgeController();

studentsAgeRoutes.use(checkAuthenticated);

studentsAgeRoutes.get('/', studentsAgeController.list);

export default studentsAgeRoutes;
