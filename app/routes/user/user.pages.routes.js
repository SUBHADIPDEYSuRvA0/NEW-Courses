const express = require('express');
const router = express.Router();


const userpagesController = require('../../controller/user/user.pages.controller');
const {authMiddleware} = require("../../middleware/middleware")
// User Pages Routes
router.get('/login', userpagesController.login);
router.get('/', authMiddleware,userpagesController.index);
router.get('/profile',authMiddleware, userpagesController.profile);
router.get('/contact',authMiddleware, userpagesController.contact);
router.get('/about',authMiddleware ,userpagesController.about);
router.get('/courses',authMiddleware, userpagesController.courses);







// Export the router
module.exports = router;