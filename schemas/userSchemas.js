const JOI = require("joi");

const signUpSchema = JOI.object({
  name: JOI.string().required(),
  email: JOI.string().required(),
  password: JOI.string().required(),
});

const signInSchema = JOI.object({
  email: JOI.string().required(),
  password: JOI.string().required(),
});

module.exports = { signUpSchema, signInSchema };
