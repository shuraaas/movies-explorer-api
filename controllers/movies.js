import { Movie } from '../models/movies.js';
import {
  BadRequestErr,
  NotFoundError,
  ForbiddenErr,
} from '../errors/index.js';
import {
  MOVIE_NOT_FOUND,
  MOVIE_BAD_REQUEST,
} from '../utils/constants.js';

const getMovies = async (req, res, next) => {
  const owner = req.user._id;

  try {
    const movies = await Movie.find({ owner }).populate('owner');
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create({ ...req.body, owner: req.user._id });
    res.send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestErr(MOVIE_BAD_REQUEST));
    } else {
      next(err);
    }
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) {
      return next(new NotFoundError(MOVIE_NOT_FOUND));
    }

    if (movie.owner.toString() !== req.user._id) {
      return next(new ForbiddenErr('Вы можете удалить только свой фильм'));
    }

    await Movie.deleteOne(movie._id);
    return res.send({ message: 'Фмльм удален из избранных' });
  } catch (err) {
    return next(err);
  }
};

export {
  getMovies,
  createMovie,
  deleteMovie,
};
