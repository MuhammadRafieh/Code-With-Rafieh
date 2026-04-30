const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Course = require('../models/Course');

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().populate('enrolledCourses');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single student by email (for simple login/auth simulation)
router.post('/login', async (req, res) => {
  try {
    const { email } = req.body;
    let student = await Student.findOne({ email }).populate('enrolledCourses');
    if (!student) {
      // For testing, just create the student if they don't exist
      student = new Student({ email, name: email.split('@')[0] });
      await student.save();
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Enroll a student in a course
router.post('/:studentId/enroll/:courseId', async (req, res) => {
  try {
    const { studentId, courseId } = req.params;
    
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (student.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    student.enrolledCourses.push(courseId);
    await student.save();

    const updatedStudent = await Student.findById(studentId).populate('enrolledCourses');
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
