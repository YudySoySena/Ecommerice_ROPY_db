import express from 'express';
import { getAllNotifications, getNotificationsByUser, createNotification, updateNotificationStatus } from './controllers/notificationsController.js';

const router = express.Router();

router.get('/allNotifications', getAllNotifications);
router.get('/user', getNotificationsByUser);

export default router;