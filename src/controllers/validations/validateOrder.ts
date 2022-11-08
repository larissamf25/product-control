import Joi from 'joi';

const validateOrder = (productsIds: number[]) => {
  const schema = Joi.array().items(Joi.number()).min(1).required()
    .messages({
      'array.base': '"productsIds" must be an array',
      'array.min': '"productsIds" must include only numbers',
    });
  const { error } = schema.validate(productsIds);
  return error;
};

export default validateOrder;