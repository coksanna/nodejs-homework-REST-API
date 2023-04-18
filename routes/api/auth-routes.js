const express = require("express");

const ctrl = require("../../controllers/auth-controllers");

const { validateBody } = require("../../utils");

const { authenticate } = require("../../middlewares");

const { authSchema } = require("../../models/user");

const router = express.Router();

// signup
router.post("/register", validateBody(authSchema), ctrl.register);

// signin
router.post("/login", validateBody(authSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/",
  authenticate,
  validateBody(authSchema),
  ctrl.updateUserSubscription
);

module.exports = router;
