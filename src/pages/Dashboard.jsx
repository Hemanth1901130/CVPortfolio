import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChartBar, FaUsers, FaGlobe, FaClock, FaLock, FaUnlock } from 'react-icons/fa';
import SkeletonLoader from '../components/SkeletonLoader';

/**
 * Dashboard page for displaying analytics data
 * This page is protected with a simple authentication mechanism
 * 
 * @returns {JSX.Element} The Dashboard page component
 */
const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({
    pageViews: 0,
    uniqueVisitors: 0,
    topPages: [],
    topCountries: [],
    averageTime: '0:00'
  });

  
  const handleLogin = (e) => {
    e.preventDefault();
    
    if (password === 'Hemanth1234') {
      setIsAuthenticated(true);
      setError('');
      localStorage.setItem('dashboardAuth', 'true');
    } else {
      setError('Invalid password');
    }
  };

  // Check if user is already authenticated
  useEffect(() => {
    const auth = localStorage.getItem('dashboardAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    
    // Simulate loading analytics data
    const timer = setTimeout(() => {
      // In a real app, this would be fetched from the Umami API
      setAnalyticsData({
        pageViews: 1254,
        uniqueVisitors: 487,
        topPages: [
          { path: '/', views: 523, title: 'Home' },
          { path: '/projects', views: 215, title: 'Projects' },
          { path: '/about', views: 189, title: 'About' },
          { path: '/contact', views: 142, title: 'Contact' },
          { path: '/skills', views: 98, title: 'Skills' }
        ],
        topCountries: [
          { name: 'United States', visitors: 203 },
          { name: 'India', visitors: 156 },
          { name: 'United Kingdom', visitors: 87 },
          { name: 'Canada', visitors: 41 },
          { name: 'Germany', visitors: 32 }
        ],
        averageTime: '2:34'
      });
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('dashboardAuth');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-black/25 backdrop-blur-sm p-8 rounded-lg shadow-lg max-w-md w-full"
        >
          <div className="flex justify-center mb-6">
            <FaLock className="text-5xl text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-center mb-6 text-white">
            Dashboard Login
          </h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-200 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-black/30 text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors"
            >
              Login
            </button>
          </form>
          
          <div className="mt-4 text-center text-sm text-gray-300">
            <p>This is a protected area. Please enter the dashboard password.</p>
            <p className="mt-2">Hint: For demo purposes, use "admin123"</p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Dashboard content
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center">
            <FaChartBar className="mr-2" /> Analytics Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center bg-black/50 hover:bg-black/60 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            <FaUnlock className="mr-2" /> Logout
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[...Array(3)].map((_, i) => (
              <SkeletonLoader key={i} type="card" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            <motion.div
              variants={itemVariants}
              className="bg-black/25 backdrop-blur-sm rounded-lg shadow-md p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Page Views</h2>
                <FaChartBar className="text-primary text-2xl" />
              </div>
              <p className="text-4xl font-bold text-white">{analyticsData.pageViews}</p>
              <p className="text-gray-300 mt-2">Total page views</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-black/25 backdrop-blur-sm rounded-lg shadow-md p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Unique Visitors</h2>
                <FaUsers className="text-primary text-2xl" />
              </div>
              <p className="text-4xl font-bold text-white">{analyticsData.uniqueVisitors}</p>
              <p className="text-gray-300 mt-2">Unique visitors</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-black/25 backdrop-blur-sm rounded-lg shadow-md p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Avg. Time on Site</h2>
                <FaClock className="text-primary text-2xl" />
              </div>
              <p className="text-4xl font-bold text-white">{analyticsData.averageTime}</p>
              <p className="text-gray-300 mt-2">Minutes:Seconds</p>
            </motion.div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {loading ? (
            <>
              <SkeletonLoader type="table" />
              <SkeletonLoader type="table" />
            </>
          ) : (
            <>
              <motion.div
                variants={itemVariants}
                className="bg-black/25 backdrop-blur-sm rounded-lg shadow-md p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white">Top Pages</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Page</th>
                        <th className="py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Views</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analyticsData.topPages.map((page, index) => (
                        <tr key={index} className="border-b border-gray-700">
                          <td className="py-4 text-sm text-gray-200">{page.title}</td>
                          <td className="py-4 text-sm text-right text-gray-200">{page.views}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-black/25 backdrop-blur-sm rounded-lg shadow-md p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white">Top Countries</h2>
                  <FaGlobe className="text-primary text-2xl" />
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Country</th>
                        <th className="py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Visitors</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analyticsData.topCountries.map((country, index) => (
                        <tr key={index} className="border-b border-gray-700">
                          <td className="py-4 text-sm text-gray-200">{country.name}</td>
                          <td className="py-4 text-sm text-right text-gray-200">{country.visitors}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </>
          )}
        </div>

        <div className="mt-8 bg-black/25 backdrop-blur-sm rounded-lg shadow-md p-6">
          <div className="text-center text-gray-300">
            <p>This is a demo dashboard with simulated data.</p>
            <p className="mt-2">In a production environment, this would connect to the Umami Analytics API to fetch real-time data.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;