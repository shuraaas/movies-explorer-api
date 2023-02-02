import { Router } from 'express';
import {
  getMovies,
  createMovie,
  deleteMovie,
} from '../controllers/movies.js';
import {
  validateMovieBody,
  validateMovieId,
} from '../middlewares/validation.js';

const router = Router();

router.get('/', getMovies);
router.post('/', validateMovieBody, createMovie);
router.delete('/:movieId', validateMovieId, deleteMovie);

export { router };
