// courseController.js


const Course = require("../../models/courses");
const fs = require("fs"); // For file system operations
const path = require("path"); // For path operations

class CourseController {
  // Create a new course
  async createCourse(req, res) {
    try {
      const { title, description, features, price, validated} = req.body;
      const image = req.file ? req.file.path : null; // Assuming you're using multer for file uploads
      const course = new Course({
        title,
        description,
        features,
        image,
        price,
        validated,

        
      });
      
      const savedCourse = await course.save();
      res.redirect("/admin/courses"); // Redirect to the course page after saving
    } catch (error) {
    res.redirect("/admin/courses"); // Redirect to the course page on error
    }
  }

  
  // Update a course by ID
  // async updateCourse(req, res) {
  //    try {
  //   const { id } = req.params;
  //   const {
  //     title,
  //     description,
  //     features,
  //     price,
  //     referalbouns,
  //     validated
  //   } = req.body;

  //   const course = await Course.findById(id);
    
  //   const image = req.file ? req.file.path : null; // Assuming you're using multer for file uploads
  //   if (image && course) {
  //     // Safely remove the old image if it exists
  //     const oldImagePath = course.image;
  //     if (oldImagePath && fs.existsSync(oldImagePath)) {
  //       fs.unlinkSync(oldImagePath);
  //     }
  //     console.log("Old image deleted successfully: " + oldImagePath);

  //     // Update the image path in the course
  //     course.image = image;
  //   }
  //   const updatedCourse = await Course.findByIdAndUpdate(
  //     id,
  //     {
  //       title,
  //       description,
  //       features,
  //       price,
  //       referalbouns,
  //       validated,
  //       image: course.image, // Use the updated image path
  //     },
  //     { new: true }
  //   );
  //   console.log("Course updated successfully:", updatedCourse);
  //   res.redirect("/admin/courses"); // Redirect to the course page after updating
  // } catch (error) {
  //  res.redirect("/admin/courses"); // Redirect to the course page on error
  // }

  // }
  async  updateCourse(req, res) {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        features,
        price,
      
        validated
      } = req.body;
  
      const course = await Course.findById(id);
      if (!course) {
        return res.status(404).send("Course not found");
      }
  
      // Handle image update
      const image = req.file ? req.file.path : null;
      if (image) {
        const oldImagePath = course.image;
        if (oldImagePath && fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
         
        }
        course.image = image;
      }
  
      // Update fields
      course.title = title;
      course.description = description;
      course.price = price;
      course.validated = validated; // string, e.g. "30 days", "yes", etc.
  
      // Features: convert to array if string
      if (typeof features === "string") {
        course.features = [features];
      } else if (Array.isArray(features)) {
        course.features = features;
      }
  
      await course.save();
  
      
      res.redirect("/admin/courses");
    } catch (error) {
      console.error("Error updating course:", error);
      res.redirect("/admin/courses");
    }
  }
  

  // Delete a course by ID
  async  deleteCourse(req, res) {
    try {
      const { id } = req.params;
  
      // Find the course before deleting
      const course = await Course.findById(id);
      if (!course) {
       res.redirect("/admin/courses"); // Redirect to the course page if not found
      }
  
      // Safely remove the image file if it exists
      if (course.image && fs.existsSync(course.image)) {
        fs.unlinkSync(course.image);
        
      }
  
      // Delete the course
      await Course.findByIdAndDelete(id);
  
      res.redirect("/admin/courses"); // Redirect to the course page after deletion
    } catch (error) {
     res.redirect ("/admin/courses"); // Redirect to the course page on error
    }
  }
}


module.exports = new CourseController();