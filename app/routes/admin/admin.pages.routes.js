const express = require('express');
const router = express.Router();


const AdminPagesController = require('../../controller/admin/admin.pagescontroller');
const User = require('../../models/user');

// Admin Pages Routes
router.get('/', AdminPagesController.login);
router.get('/dashboard', AdminPagesController.index);
router.get('/banner', AdminPagesController.banner);
router.get('/editbanner/:id', AdminPagesController.edtBanner);
router.get('/about', AdminPagesController.about);
router.get('/contact', AdminPagesController.contact);
router.get('/users', AdminPagesController.user);
router.get('/courses', AdminPagesController.course);
router.get('/editcourse/:id', AdminPagesController.editcourse);
router.get('/courseDocuments/:id', AdminPagesController.attachmentsfile);
router.get('/viewQue/:id', AdminPagesController.getCourseDocuments); // Uncomment if needed

// AJAX user list with search and pagination
// Example Express route
router.get('/users', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
  
    const query = {
      $or: [
        { name: new RegExp(search, 'i') },
        { phone: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') }
      ]
    };
  
    const users = await User.find(search ? query : {}).skip((page - 1) * limit).limit(limit);
    const total = await User.countDocuments(search ? query : {});
    
    res.json({ users, total });
  });
  

module.exports = router;