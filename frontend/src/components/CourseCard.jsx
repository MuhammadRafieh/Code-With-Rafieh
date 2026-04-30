import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, User } from 'lucide-react';

const CourseCard = ({ course }) => {
  return (
    <div className="card">
      <img 
        src={course.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop'} 
        alt={course.title} 
        className="card-img"
      />
      <div className="card-content">
        <span className="badge" style={{ alignSelf: 'flex-start', marginBottom: '0.75rem' }}>{course.category || 'Development'}</span>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{course.title}</h3>
        <p className="text-muted" style={{ marginBottom: '1rem', flexGrow: 1, fontSize: '0.9rem' }}>
          {course.description.length > 80 ? `${course.description.substring(0, 80)}...` : course.description}
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          <div className="flex items-center gap-2 text-muted">
            <User size={16} />
            <span>{course.instructor}</span>
          </div>
          <div className="flex items-center gap-2" style={{ color: 'var(--success)', fontWeight: '600' }}>
            <span>Rs. {course.price}</span>
          </div>
        </div>
        
        <Link to={`/course/${course._id}`} className="btn btn-secondary" style={{ width: '100%' }}>
          <BookOpen size={18} /> View Details
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
