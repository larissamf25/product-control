import Joi from 'joi';
import statusCodes from '../../statusCode';

const userDataExist = (body: object) => {
  const schema = Joi.object({
    username: Joi.required(),
    classe: Joi.required(),
    level: Joi.required(),
    password: Joi.required(),
  });
  const { error } = schema.validate(body);
  return error;
};

const validateUser = (body: object): [number, string] | undefined => {
  const result = userDataExist(body);
  if (result) return [statusCodes.BAD_REQUEST, result.message];

  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    classe: Joi.string().min(3).required(),
    level: Joi.number().min(1),
    password: Joi.string().min(8),
  });
  const { error } = schema.validate(body);
  if (error) return [statusCodes.INCORRECT, error.message];
};

export default validateUser;