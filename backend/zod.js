const zod = require("zod");

const signUpSchema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

const updateSchema = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

const signInSchema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

module.exports = {
    signUpSchema,
    updateSchema,
    signInSchema,
  };