import { Joi, celebrate } from "celebrate";

export const createTest = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).required().messages({
        "string.base": "Name must be a string",
        "string.empty": "Name cannot be empty",
        "any.required": "Name is required",
      }),
      description: Joi.string().optional().allow(""),
      isActive: Joi.boolean().optional(),
    })
    .options({ abortEarly: false }),
});
