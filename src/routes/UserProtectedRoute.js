import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function UserProtectedRoute({ children }) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.user_id) {
      navigate('/');
    }
  }, [user, navigate]);

  if (user.user_id) {
    return children;
  }

  return null;
}

export default UserProtectedRoute;
