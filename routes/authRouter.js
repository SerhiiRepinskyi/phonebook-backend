const express = require("express");

const authCtrl = require("../controllers/authController");

const { authenticate } = require("../middlewares");

const validateBody = require("../decorators");

const { signUpSchema, signInSchema } = require("../schemas/userSchemas");

const authRouter = express.Router();

authRouter.post("/signup", validateBody(signUpSchema), authCtrl.signup);

authRouter.post("/login", validateBody(signInSchema), authCtrl.login);

authRouter.post("/logout", authenticate, authCtrl.logout);

authRouter.get("/current", authenticate, authCtrl.getCurrent);

module.exports = authRouter;
