import express from 'express';
import notificationsController from '../controllers/notificationsController.js';

const router = express.Router();

router.get('/allNotifications', notificationsController.getAllNotifications);
router.post('/newNotification', notificationsController.createNotification)
router.get('/user', notificationsController.getNotificationsByUser);

export default router;