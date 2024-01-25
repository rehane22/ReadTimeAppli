const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/resetPassword', authController.resetPassword);
router.post('/resetPasswordConfirm', authController.resetPasswordConfirm);
//router.post('/update', authController.update);
    
module.exports = router;
