import Joi from 'joi';

const blogSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(200)
    .required()
    .messages({
      'string.empty': 'Title is required',
      'string.min': 'Title must be at least 3 characters',
      'string.max': 'Title must be less than 200 characters'
    }),
  
  content: Joi.string()
    .trim()
    .min(10)
    .required()
    .messages({
      'string.empty': 'Content is required',
      'string.min': 'Content must be at least 10 characters'
    })
});

export const validateBlog = (req, res, next) => {
  const { error } = blogSchema.validate(req.body, { abortEarly: false });
  
  if (error) {
    // Return only the first error message
    const firstErrorMessage = error.details[0].message;
    return res.status(400).json({ error: firstErrorMessage });
  }
  
  next();
};