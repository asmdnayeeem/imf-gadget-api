import { Router } from 'express';
import * as gadgetController from '../controllers/gadgetController';
import { authenticate } from '../middlewares/auth';
const router = Router();
router.use(authenticate)
router.get('/',gadgetController.getAllGadgets);
router.post('/', gadgetController.createGadget);
router.patch('/:id', gadgetController.updateGadget);
router.delete('/:id', gadgetController.decommissionGadget);
router.post('/:id/self-destruct', gadgetController.selfDestruct);
router.get('/filter', gadgetController.getByStatus);
export default router;
