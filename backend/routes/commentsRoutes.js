import express from 'express';
import commentsController from '../controllers/commentsController';

const router = express.router();

router.get('/comments/:productId', commentsController.getCommentsById)
router.get('/comments/:productId/loadMore', commentsController.getCommentsByIdMore)

export default Router;