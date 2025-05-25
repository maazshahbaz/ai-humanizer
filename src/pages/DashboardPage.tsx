import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, User, CreditCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import RewriteHistory from '../components/RewriteHistory';
import { motion } from 'framer-motion';

const DashboardPage = () => {
  const { user, userCredits, userPlan } = useAuth();
  
  useEffect(() => {
    document.title = "Dashboard - AI Humanizer";
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your AI humanizer account</p>
          </div>
          <Link to="/" className="btn-primary mt-4 md:mt-0">
            Humanize New Text
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <motion.div 
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="flex items-center space-x-4">
              <div className="bg-primary-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Current Plan</p>
                <h3 className="text-2xl font-bold text-gray-900">{userPlan}</h3>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/pricing" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Upgrade Plan →
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="flex items-center space-x-4">
              <div className="bg-primary-100 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Credits Remaining</p>
                <h3 className="text-2xl font-bold text-gray-900">{userCredits}</h3>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/payment" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Purchase Credits →
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="flex items-center space-x-4">
              <div className="bg-primary-100 p-3 rounded-full">
                <User className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Account</p>
                <h3 className="text-lg font-bold text-gray-900 truncate max-w-[200px]">
                  {user?.email}
                </h3>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/profile" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Manage Profile →
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Rewrite History */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <RewriteHistory />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;