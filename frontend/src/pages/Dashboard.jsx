import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import CourseCard from '../components/CourseCard';
import { GraduationCap } from 'lucide-react';

const Dashboard = () => {
  const { user, loading, updateUserData } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    } else if (user) {
      updateUserData();
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return <div className="page text-center"><div className="loader mt-8">Loading...</div></div>;
  }

  return (
    <div className="page">
      <div className="container">
        <div className="mb-8 p-6" style={{ background: 'var(--surface)', borderRadius: '1rem', border: '1px solid var(--border)' }}>
          <div className="flex items-center gap-4">
            <div style={{ background: 'rgba(99, 102, 241, 0.2)', padding: '1rem', borderRadius: '50%' }}>
              <GraduationCap size={40} className="text-primary" />
            </div>
            <div>
              <h2>Welcome, {user.name}</h2>
              <p className="text-muted">{user.email}</p>
            </div>
          </div>
        </div>

        <h3 className="mb-4 flex items-center gap-2">
          <BookOpenIcon /> My Enrolled Courses
        </h3>

        {user.enrolledCourses && user.enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {user.enrolledCourses.map(course => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center p-8" style={{ background: 'var(--surface-light)', borderRadius: '1rem', border: '1px dashed var(--border)' }}>
            <p className="text-muted mb-4" style={{ fontSize: '1.2rem' }}>You are not enrolled in any courses yet.</p>
            <button className="btn btn-primary" onClick={() => navigate('/')}>Browse Courses</button>
          </div>
        )}
      </div>
    </div>
  );
};

const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
);

export default Dashboard;
