import express from 'express';
import {
  createPost,
  getPost,
  updatePost,
  deletePost,
  getPostiD,
  likePost,
} from '../controllers/post';

const router = express.Router();

router.get('/', getPost);
router.post('/', createPost);
router.get('/:id', getPostiD);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);

export default router;
