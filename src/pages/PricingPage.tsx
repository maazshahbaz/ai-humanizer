import { useEffect } from 'react';
import { motion } from 'framer-motion';
import PricingCard from '../components/PricingCard';
import { CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PricingPage = () => {
  const { isAuthenticated, userPlan } = useAuth();
  
  useEffect(() => {
    document.title = "Pricing - AI Humanizer";
  }, []);

  return (
    <div className="bg-gray-50 py-16 md:py-24">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Choose the Right Plan for Your Needs
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Whether you're just getting started or need unlimited rewrites, we have a plan that's perfect for you.
          </motion.p>
        </div>

        {/* Toggle annual/monthly pricing (for demonstration) */}
        <div className="flex justify-center mb-10">
          <div className="bg-gray-100 p-1 rounded-full">
            <button className="px-6 py-2 rounded-full bg-primary-600 text-white font-medium">
              Monthly
            </button>
            <button className="px-6 py-2 rounded-full text-gray-700 font-medium">
              Annual
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PricingCard
            title="Free"
            price={0}
            description="Perfect for trying out our AI humanizer."
            features={[
              "50 humanization credits",
              "Standard humanization quality",
              "Basic support",
              "7-day history"
            ]}
            credits={50}
            buttonText={userPlan === 'Free' ? 'Current Plan' : 'Get Started'}
            buttonLink={isAuthenticated ? '/dashboard' : '/register'}
          />
          
          <PricingCard
            title="Pro"
            price={19}
            description="Ideal for regular content creators and students."
            features={[
              "150 humanization credits",
              "High-quality humanization",
              "Priority support",
              "30-day history",
              "API access"
            ]}
            credits={150}
            popular={true}
            buttonText={userPlan === 'Pro' ? 'Current Plan' : 'Upgrade Now'}
            buttonLink={isAuthenticated ? '/payment' : '/register'}
          />
          
          <PricingCard
            title="Premium"
            price={49}
            description="For professionals who need unlimited access."
            features={[
              "Unlimited humanization credits",
              "Premium humanization quality",
              "24/7 priority support",
              "Unlimited history",
              "API access with higher rate limits",
              "Advanced settings"
            ]}
            credits={9999}
            buttonText={userPlan === 'Premium' ? 'Current Plan' : 'Upgrade Now'}
            buttonLink={isAuthenticated ? '/payment' : '/register'}
          />
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What is AI Humanizer?</h3>
              <p className="text-gray-600">
                AI Humanizer is a tool that rewrites AI-generated content to make it sound natural and bypass AI detection tools. It preserves the original meaning while adding human-like writing patterns.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How do credits work?</h3>
              <p className="text-gray-600">
                Each time you humanize a piece of text, one credit is deducted from your account. Credits are refreshed monthly based on your subscription plan.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Can I cancel my subscription anytime?</h3>
              <p className="text-gray-600">
                Yes, you can cancel your subscription at any time. You'll continue to have access to your plan until the end of your current billing cycle.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Does AI Humanizer guarantee to bypass all AI detection?</h3>
              <p className="text-gray-600">
                While our AI Humanizer is highly effective at bypassing most AI detection tools, we cannot guarantee 100% undetectability as detection tools are constantly evolving. We continuously update our algorithms to stay ahead.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "This tool has been a game-changer for my content creation workflow. The humanized text passes all AI detection tools I've tried."
              </p>
              <div>
                <p className="font-medium text-gray-900">Sarah Johnson</p>
                <p className="text-gray-500 text-sm">Content Creator</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "As a student, this helps me use AI for initial drafts while ensuring my final submissions are unique and undetectable."
              </p>
              <div>
                <p className="font-medium text-gray-900">Michael Chen</p>
                <p className="text-gray-500 text-sm">Graduate Student</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "The Premium plan has been worth every penny for our marketing agency. We're able to scale our content production without compromising quality."
              </p>
              <div>
                <p className="font-medium text-gray-900">Emily Rodriguez</p>
                <p className="text-gray-500 text-sm">Marketing Director</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 bg-primary-900 text-white rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already humanizing their AI-generated content.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/register" className="btn-accent py-3 px-8 text-lg">
              Start Free Trial
            </a>
            <a href="/contact" className="btn-outline border-white text-white hover:bg-white/10 py-3 px-8 text-lg">
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;