const express = require('express');
const router = express.Router();

const adminController = require('../../controller/admin/about.admin.controller');
const uploadAbout = require('../../multer/about.multer');


router.post('/create',uploadAbout.single('image'),adminController.create); // POST /admin/about/create
router.post('/update/:id',uploadAbout.single('image'), adminController.updateAboutUsPage); // POST /admin/about/update/:id

module.exports = router;