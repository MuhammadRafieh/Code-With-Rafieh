import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { BookOpen, User, Clock, ShieldCheck, PlayCircle } from 'lucide-react';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState('');
  
  const { user, updateUserData } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/courses/${id}`);
        setCourse(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch course details');
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setEnrolling(true);
    try {
      await axios.post(`http://localhost:5001/api/students/${user._id}/enroll/${course._id}`);
      await updateUserData();
      alert('Successfully enrolled!');
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to enroll');
      setEnrolling(false);
    }
  };

  const isEnrolled = user && user.enrolledCourses && user.enrolledCourses.some(c => c._id === id || c === id);

  if (loading) return <div className="page text-center"><div className="loader mt-8">Loading...</div></div>;
  if (error) return <div className="page text-center"><p className="text-error mt-8">{error}</p></div>;
  if (!course) return <div className="page text-center"><p className="mt-8">Course not found</p></div>;

  return (
    <div className="page">
      <div className="container">
        <div className="grid grid-cols-1" style={{ gap: '3rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          
          <div className="animate-fade-in">
            <img 
              src={course.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop'} 
              alt={course.title}
              style={{ width: '100%', borderRadius: '1rem', border: '1px solid var(--border)', objectFit: 'cover', height: '400px' }}
            />
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.2s', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="badge mb-4" style={{ alignSelf: 'flex-start' }}>{course.category || 'Development'}</span>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{course.title}</h1>
            
            <div className="flex gap-4 mb-6 text-muted" style={{ flexWrap: 'wrap' }}>
              <div className="flex items-center gap-2"><User size={18} className="text-primary"/> <span>Instructor: {course.instructor}</span></div>
              <div className="flex items-center gap-2"><Clock size={18} className="text-primary"/> <span>Self-paced</span></div>
              <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-primary"/> <span>Certificate of completion</span></div>
            </div>

            <p className="mb-8 text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
              {course.description}
            </p>

            {course.lessons && course.lessons.length > 0 && (
              <div className="mb-8 p-6" style={{ background: 'var(--surface-light)', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                <h3 className="mb-4">Course Syllabus</h3>
                <ul className="grid grid-cols-1 gap-2">
                  {course.lessons.map((lesson, index) => (
                    <li key={index} className="flex justify-between items-center p-3" style={{ background: 'var(--surface)', borderRadius: '0.5rem' }}>
                      <div className="flex items-center gap-3">
                        <PlayCircle size={18} className="text-primary" />
                        <span>{lesson.title}</span>
                      </div>
                      <span className="text-muted" style={{ fontSize: '0.9rem' }}>{lesson.duration}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-6 mb-8" style={{ background: 'var(--surface)', borderRadius: '1rem', border: '1px solid var(--border)' }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted" style={{ fontSize: '1.2rem' }}>Price</span>
                <span style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--success)' }}>Rs. {course.price}</span>
              </div>
              
              {isEnrolled ? (
                <button className="btn btn-secondary w-100" style={{ width: '100%' }} disabled>
                  <ShieldCheck size={20} /> Already Enrolled
                </button>
              ) : (
                <button 
                  className="btn btn-primary w-100" 
                  style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }}
                  onClick={handleEnroll}
                  disabled={enrolling}
                >
                  <BookOpen size={20} />
                  {enrolling ? 'Enrolling...' : 'Enroll Now'}
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
