const aboutus = require("../../models/aboutus");
const banner = require("../../models/banner");
const contactus = require("../../models/contactus");
const coursedocuments = require("../../models/coursedocuments");
const courses = require("../../models/courses");
const User = require("../../models/user");

const shuffleArray = (array) => {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };
class AdminPagesController {
    login(req, res) {
        const message = req.session.message;
        req.session.message = null;
        res.render('admin/login', { message });
    }
    index(req, res) {
        res.render('admin/index')
    }

    // banner page
    banner=async(req, res)=> {
        const banners =await banner.find({}).sort({ createdAt: -1 });
        res.render('admin/banner', { banners });
    }
    edtBanner=async(req, res)=> {
        const { id } = req.params;
        const banners = await banner.findById(id);
        res.render('admin/editbanner', { banners });
    }

    // about page
    about=async(req, res)=> {

              const aboutUs = await aboutus.findOne();
        
        res.render('admin/about', { aboutUs });
    }

    // contact page
    contact=async(req, res)=>{

      const contacts = await contactus.find()
        res.render('admin/contact',{contacts})
    }

    // user page
    user=async(req, res)=>{
          const users = await User.find()
        res.render('admin/users',{users})
    }
    // course page
    course=async(req, res)=> {
        const cours = await courses.find({})
        res.render('admin/courses',{
            cours
        })
    }
    editcourse=async(req, res)=> {
        const { id } = req.params;
        const course = await courses.findById(id);
        res.render('admin/editCourse', { course });
    }
    attachmentsfile=async(req, res)=> {  
        const Courses = await courses.findById(req.params.id);
        res.render('admin/courseDocuments', { Courses });
    }
    
      
      async  getCourseDocuments(req, res) {
        try {
          const { id } = req.params;
      
          // Fetch course document by courseId
          const courseDocument = await coursedocuments.findOne({ courseId: id });
      
          // If courseDocument not found, render with no data
          if (!courseDocument) {
            return res.render('admin/viewQues', { courseDocument: null });
          }
      
          // Shuffle assignments and answers
          courseDocument.assignments = courseDocument.assignments.map(assignment => ({
            ...assignment,
            answers: shuffleArray(assignment.answers),
          }));
      
          courseDocument.assignments = shuffleArray(courseDocument.assignments);
      
          // Render with shuffled data
          res.render('admin/viewQues', { courseDocument });
      
        } catch (error) {
          console.error('Error fetching course document:', error);
          res.redirect('/admin/courses');
        }
      }
      

}

module.exports = new AdminPagesController();