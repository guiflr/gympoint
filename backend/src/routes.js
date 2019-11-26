import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentsController from './app/controllers/StudentsController';
import PlanController from './app/controllers/PlanController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';

import authMiddleware from './app/middlewares/auth';
import MatriculationController from './app/controllers/MatriculationController';
import AnswerController from './app/controllers/AnswerController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/students/:id/checkins', CheckinController.store);
routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/help-orders', HelpOrderController.store);
routes.get('/students/:id/help-orders', HelpOrderController.index);

routes.use(authMiddleware);
routes.get('/students', StudentsController.index);
routes.post('/students', StudentsController.store);
routes.put('/students/:id', StudentsController.update);
routes.get('/students/:id', StudentsController.show);

routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.post('/matriculation', MatriculationController.store);

routes.put('/help-orders/:id/answer', AnswerController.update);
routes.get('/help-orders', AnswerController.index);
export default routes;
