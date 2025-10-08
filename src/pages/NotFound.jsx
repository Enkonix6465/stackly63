import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { debugRoute } from '../utils/debug';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Debug the route when 404 page is shown
    debugRoute(location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Requested path: <code className="bg-gray-200 px-2 py-1 rounded">{location.pathname}</code>
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/home"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Home
          </Link>
          <div>
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Back to Login
            </Link>
          </div>
        </div>
        
        <div className="mt-8 text-xs text-gray-400">
          <p>Check the browser console for debug information.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
