import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle, BarChart, Clock, Shield, Zap } from 'lucide-react';
import HumanizerBox from '../components/HumanizerBox';
import { motion } from 'framer-motion';

const HomePage = () => {
  const [title, setTitle] = useState("AI Humanizer");
  
  useEffect(() => {
    document.title = title;
    
    // Update the title element if it has the default attribute
    const titleElement = document.querySelector('title[data-default]');
    if (titleElement) {
      titleElement.textContent = title;
    }
  }, [title]);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white">
        <div className="container-custom py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Transform AI-Generated Text Into <span className="text-accent-400">Human-Written Content</span>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-200 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Bypass AI detection with our advanced humanizer that rewrites AI-generated content to sound natural and pass as human-written.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link to="/register" className="btn-accent py-3 px-8 text-lg">
                Get Started Free
              </Link>
              <Link to="/pricing" className="btn-outline border-white text-white hover:bg-white/10 py-3 px-8 text-lg">
                View Pricing
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Humanizer Box Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Try Our AI Humanizer</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Paste your AI text below and our humanizer will transform it into natural, human-like content that bypasses AI detection.
            </p>
          </div>
          
          <HumanizerBox />
          
          <div className="mt-10 text-center">
            <p className="text-gray-500 mb-4">
              Need more credits? Check out our pricing plans.
            </p>
            <Link to="/pricing" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
              View pricing plans
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our AI Humanizer</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our advanced AI humanizer provides numerous benefits to help you create authentic content.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              className="bg-white rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Bypass AI Detection</h3>
              <p className="text-gray-600">
                Our humanizer rewrites AI-generated text to bypass detection tools like Turnitin, GPTZero, and AI Content Detector.
              </p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div 
              className="bg-white rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Maintain Quality</h3>
              <p className="text-gray-600">
                Preserves the original meaning while adding natural human writing patterns and variations in style.
              </p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div 
              className="bg-white rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Save Time</h3>
              <p className="text-gray-600">
                Instantly transform AI text into human-like content, saving hours of manual rewriting and editing.
              </p>
            </motion.div>
            
            {/* Feature 4 */}
            <motion.div 
              className="bg-white rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy to Use</h3>
              <p className="text-gray-600">
                Simple interface – just paste your text and get humanized content in seconds with no complex settings.
              </p>
            </motion.div>
            
            {/* Feature 5 */}
            <motion.div 
              className="bg-white rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced Algorithm</h3>
              <p className="text-gray-600">
                Uses cutting-edge AI technology to analyze and transform content with high accuracy and reliability.
              </p>
            </motion.div>
            
            {/* Feature 6 */}
            <motion.div 
              className="bg-white rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your content remains private and secure. We don't store or share your original or humanized text.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-900 text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Humanize Your AI Content?</h2>
            <p className="text-lg text-gray-200 mb-8">
              Sign up today and receive 50 free credits to start humanizing your AI-generated content.
            </p>
            <Link
              to="/register"
              className="btn-accent py-3 px-8 text-lg inline-block"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;