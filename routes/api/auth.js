const express = require("express");


const router = express.Router();
const {validateBody, authenticate, upload} = require("../../middlewares/index");
const  { schemas }  = require("../../models/user");
const { register,
    login,
    getCurrent,
    logout,
    updateAvatar,
    verifyEmail,
    resendVerifyEmail,
    updateSubscription,
    forgotPassword
} = require("../../controllers/auth/index")


router.post("/register", validateBody(
    schemas.registerSchema), register.register);

router.get("/verify/:verificationToken", verifyEmail.verifyEmail);

router.post("/verify", validateBody(
    schemas.verifySchema), resendVerifyEmail.resendVerifyEmail );

router.post("/login", validateBody(
    schemas.loginSchema), login.login);

router.patch("/subscription", authenticate, validateBody(
    schemas.updateSubscriptionSchema), updateSubscription.updateSubscription);

router.get("/current", authenticate, getCurrent.getCurrent);

router.post("/logout", authenticate, logout.logout);

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar.updateAvatar);

router.post("/forgotPassword", validateBody(schemas.userResetPasswordSchema), forgotPassword.forgotPassword);



module.exports = router;