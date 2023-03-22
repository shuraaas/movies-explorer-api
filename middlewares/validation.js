import { celebrate, Joi } from 'celebrate';
import validator from 'validator';

const validateRegisterBody = celebrate({
  body: {
    email: Joi.string().required().email().messages({
      'any.required': 'Поле email обязательно',
      'string.empty': 'Поле email должно быть заполнено',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Поле password обязательно',
      'string.empty': 'Поле password должно быть заполнено',
    }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.empty': 'Поле name должно быть заполнено',
        'any.required': 'Поле name обязательно',
        'string.min': 'Минимальная длина поля 2 символа',
        'string.max': 'Максимальная длина поля 30 символов',
      }),
  },
});

const validateAuthBody = celebrate({
  body: {
    email: Joi.string().required().email().messages({
      'any.required': 'Поле email обязательно',
      'string.empty': 'Поле email должно быть заполнено',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Поле password обязательно',
      'string.empty': 'Поле password должно быть заполнено',
    }),
  },
});

const validateUpdateUser = celebrate({
  body: {
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.empty': 'Поле name должно быть заполнено',
        'string.min': 'Минимальная длина поля 2 символа',
        'string.max': 'Максимальная длина поля 30 символов',
      }),
    email: Joi.string().email()
      .required()
      .messages({
        'string.empty': 'Поле email должно быть заполнено',
        'string.min': 'Минимальная длина поля 2 символа',
      }),
  },
});

const validateMovieId = celebrate({
  params: {
    movieId: Joi.string().required().custom((value, helpers) => {
      if (validator.isMongoId(value)) {
        return value;
      }
      return helpers.message('ID должен быть строкой из 24 шестнадцатеричных символов или целым числом');
    }),
  },
});

const validateMovieBody = celebrate({
  body: {
    country: Joi.string().required()
      .messages({
        'any.required': 'Поле country обязательно',
        'string.empty': 'Поле country должно быть заполнено',
      }),
    director: Joi.string().required()
      .messages({
        'any.required': 'Поле director обязательно',
        'string.empty': 'Поле director должно быть заполнено',
      }),
    duration: Joi.number().required().messages({
      'any.required': 'Поле duration обязательно',
      'string.empty': 'Поле duration должно быть заполнено',
    }),
    year: Joi.string().required()
      .messages({
        'any.required': 'Поле year обязательно',
        'string.empty': 'Поле year должно быть заполнено',
      }),
    description: Joi.string().required()
      .messages({
        'any.required': 'Поле description обязательно',
        'string.empty': 'Поле description должно быть заполнено',
      }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Не валидная ссылка');
    }).messages({
      'any.required': 'Поле image обязательно',
      'string.empty': 'Поле image должно быть заполнено',
    }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Не валидная ссылка');
    }).messages({
      'any.required': 'Поле trailerLink обязательно',
      'string.empty': 'Поле trailerLink должно быть заполнено',
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Не валидная ссылка');
    }).messages({
      'any.required': 'Поле thumbnail обязательно',
      'string.empty': 'Поле thumbnail должно быть заполнено',
    }),
    movieId: Joi.number().required().messages({
      'any.required': 'Поле movieId обязательно',
      'string.empty': 'Поле movieId должно быть заполнено',
    }),
    nameRU: Joi.string().required()
      .messages({
        'any.required': 'Поле nameRU обязательно',
        'string.empty': 'Поле nameRU должно быть заполнено',
      }),
    nameEN: Joi.string().required()
      .messages({
        'any.required': 'Поле nameEN обязательно',
        'string.empty': 'Поле nameEN должно быть заполнено',
      }),
  },
});

export {
  validateRegisterBody,
  validateAuthBody,
  validateUpdateUser,
  validateMovieId,
  validateMovieBody,
};
