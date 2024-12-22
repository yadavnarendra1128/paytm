const zod = require("zod");

const signUpSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().max(20),
  firstName: zod.string(),
  lastName: zod.string(),
});

const updateSchema = zod.object({
  password: zod.string().max(20).optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

const signInSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().max(20),
});

module.exports = {
    signUpSchema,
    updateSchema,
    signInSchema,
  };