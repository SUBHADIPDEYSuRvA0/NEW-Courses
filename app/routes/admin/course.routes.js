const express = require('express');
const router = express.Router();

const courseController = require('../../controller/admin/admin.course.controller');
const uploadCourse = require('../../multer/course.multer'); // Adjust the path as necessary

router.post('/add',uploadCourse.single('image'),courseController.createCourse); // POST /course/add
router.post('/update/:id',uploadCourse.single('image'), courseController.updateCourse); // POST /course/update/:id
router.get('/delete/:id', courseController.deleteCourse); // GET /course/delete/:id


module.exports = router;