import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCard from '../components/CourseCard';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/courses');
        setCourses(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses', error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="page">
      <div className="hero">
        <div className="container">
          <h1 className="animate-fade-in">Master the Skills of Tomorrow</h1>
          <p className="text-muted animate-fade-in" style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2rem', animationDelay: '0.2s' }}>
            Join our premium learning platform and elevate your career with industry-leading courses taught by experts.
          </p>
        </div>
      </div>
      
      <div className="container" style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2>Available Courses</h2>
        </div>

        {loading ? (
          <div className="text-center mt-8">
            <div className="loader">Loading...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {courses.map(course => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
