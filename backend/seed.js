require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('./models/Course');
const Student = require('./models/Student');

const courses = [
  {
    title: 'Advanced React Patterns',
    description: 'Learn advanced design patterns for scalable React applications.',
    instructor: 'Ayesha Khan',
    price: 15000,
    category: 'Web Development',
    level: 'Advanced',
    requirements: ['Basic React knowledge', 'JavaScript ES6+', 'HTML/CSS basics'],
    rating: 4.8,
    reviews: [
      { user: 'Zain', rating: 5, comment: 'Amazing course! Very detailed.' },
      { user: 'Sarah', rating: 4.5, comment: 'Great patterns, helped me a lot.' }
    ],
    lessons: [
      { title: 'Introduction to Patterns', duration: '12:00' },
      { title: 'Render Props and HOCs', duration: '25:30' },
      { title: 'Custom Hooks', duration: '18:45' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Node.js Masterclass',
    description: 'Build fast and scalable backend applications with Node.js and Express.',
    instructor: 'Ali Ahmed',
    price: 12500,
    category: 'Backend',
    level: 'Intermediate',
    requirements: ['JavaScript knowledge', 'Basic HTTP understanding'],
    rating: 4.6,
    reviews: [
      { user: 'Kamran', rating: 5, comment: 'Best Node.js course out there.' },
      { user: 'Hira', rating: 4, comment: 'Good explanations but fast paced.' }
    ],
    lessons: [
      { title: 'Node.js Architecture', duration: '15:20' },
      { title: 'Building REST APIs', duration: '30:00' },
      { title: 'Authentication with JWT', duration: '22:15' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'MongoDB for Beginners',
    description: 'A comprehensive guide to NoSQL databases using MongoDB.',
    instructor: 'Fatima Tariq',
    price: 8500,
    category: 'Database',
    level: 'Beginner',
    requirements: ['No prior database knowledge required'],
    rating: 4.9,
    reviews: [
      { user: 'Bilal', rating: 5, comment: 'Perfect for complete beginners!' }
    ],
    lessons: [
      { title: 'What is NoSQL?', duration: '10:00' },
      { title: 'CRUD Operations', duration: '28:10' },
      { title: 'Aggregation Framework', duration: '35:00' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Fullstack MERN Development',
    description: 'Become a fullstack developer by building real-world MERN apps.',
    instructor: 'Usman Sheikh',
    price: 25000,
    category: 'Full Stack',
    level: 'Intermediate',
    requirements: ['HTML/CSS/JS', 'Basic React', 'Basic Node.js'],
    rating: 4.7,
    reviews: [
      { user: 'Ali', rating: 4.5, comment: 'Covers everything you need to know.' },
      { user: 'Nadia', rating: 5, comment: 'The capstone project is phenomenal.' }
    ],
    lessons: [
      { title: 'Project Setup', duration: '20:00' },
      { title: 'Connecting React with Node', duration: '45:00' },
      { title: 'Deployment Strategies', duration: '30:30' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop'
  }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/online-learning')
  .then(async () => {
    console.log('Connected to MongoDB for seeding');
    
    // Clear existing data
    await Course.deleteMany({});
    await Student.deleteMany({});
    
    // Insert courses
    const insertedCourses = await Course.insertMany(courses);
    console.log(`${insertedCourses.length} courses inserted.`);
    
    // Create a demo student
    const demoStudent = new Student({
      name: 'Omar Malik',
      email: 'demo@example.com',
      enrolledCourses: []
    });
    await demoStudent.save();
    console.log('Demo student created: demo@example.com');
    
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Seeding error:', err);
    mongoose.connection.close();
  });
