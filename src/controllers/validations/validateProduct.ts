import Joi from 'joi';
import statusCodes from '../../statusCode';

const productDataExist = (body: object) => {
  const schema = Joi.object({
    name: Joi.required(),
    amount: Joi.required(),
  });
  const { error } = schema.validate(body);
  return error;
};

const validateProduct = (body: object): [number, string] | undefined => {
  const result = productDataExist(body);
  if (result) return [statusCodes.BAD_REQUEST, result.message];

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    amount: Joi.string().min(3).required(),
  });
  const { error } = schema.validate(body);
  if (error) return [statusCodes.INCORRECT, error.message];
};

export default validateProduct;