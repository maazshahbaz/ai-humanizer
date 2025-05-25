import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

interface PlanOption {
  id: string;
  name: string;
  price: number;
  credits: number;
  description: string;
}

const PaymentPage = () => {
  const { userPlan, userCredits, updateCredits, updatePlan } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();
  
  const plans: PlanOption[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      credits: 50,
      description: 'Basic plan for occasional use'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 19,
      credits: 150,
      description: 'Perfect for regular content creators'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 49,
      credits: 999,
      description: 'For professionals who need unlimited access'
    }
  ];
  
  useEffect(() => {
    document.title = "Payment - AI Humanizer";
    
    // Set the current plan as selected by default
    const currentPlanId = userPlan.toLowerCase();
    setSelectedPlan(currentPlanId);
  }, [userPlan]);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPlan) {
      toast.error('Please select a plan');
      return;
    }
    
    // For free plan, no payment info needed
    if (selectedPlan === 'free') {
      processPayment();
      return;
    }
    
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      toast.error('Please fill in all payment details');
      return;
    }
    
    if (cardNumber.replace(/\s/g, '').length !== 16) {
      toast.error('Please enter a valid card number');
      return;
    }
    
    if (cvv.length < 3) {
      toast.error('Please enter a valid CVV');
      return;
    }
    
    processPayment();
  };

  const processPayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Get selected plan details
      const plan = plans.find(p => p.id === selectedPlan);
      
      if (plan) {
        // Update user's credits and plan
        await updateCredits(plan.credits);
        updatePlan(plan.name);
        
        setPaymentSuccess(true);
        
        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCardNumber(formatCardNumber(value));
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setExpiryDate(formatExpiryDate(value));
  };

  if (paymentSuccess) {
    return (
      <div className="bg-gray-50 min-h-screen py-16">
        <div className="container-custom max-w-lg">
          <motion.div 
            className="bg-white rounded-lg shadow-card p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 rounded-full p-3">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your account has been updated with your new plan and credits.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Plan:</span>
                <span className="font-semibold text-gray-900">{selectedPlan?.charAt(0).toUpperCase() + selectedPlan?.slice(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Credits:</span>
                <span className="font-semibold text-gray-900">{plans.find(p => p.id === selectedPlan)?.credits}</span>
              </div>
            </div>
            <p className="text-gray-500 mb-6">
              You'll be redirected to your dashboard in a moment...
            </p>
            <Link to="/dashboard" className="btn-primary w-full justify-center">
              Go to Dashboard
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Upgrade Your Plan</h1>
            <p className="text-gray-600 mt-1">Choose a plan that works for you</p>
          </div>
          <Link to="/dashboard" className="btn-outline">
            Back to Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`bg-white rounded-lg border ${
                selectedPlan === plan.id 
                  ? 'border-primary-500 ring-2 ring-primary-200' 
                  : 'border-gray-200'
              } shadow-sm p-6 transition-all duration-200 cursor-pointer`}
              onClick={() => handlePlanSelect(plan.id)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{plan.description}</p>
                </div>
                <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                  selectedPlan === plan.id ? 'border-primary-500 bg-primary-500' : 'border-gray-300'
                }`}>
                  {selectedPlan === plan.id && (
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  )}
                </div>
              </div>
              
              <div className="mb-4">
                <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                {plan.price > 0 && <span className="text-gray-500 ml-1">/month</span>}
              </div>
              
              <div className="bg-gray-50 rounded-md p-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Credits:</span>
                  <span className="font-semibold text-primary-600">{plan.credits}</span>
                </div>
              </div>
              
              <button
                className={`w-full py-2 rounded-md transition-colors ${
                  selectedPlan === plan.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => handlePlanSelect(plan.id)}
              >
                {userPlan.toLowerCase() === plan.id ? 'Current Plan' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h2>
          
          <form onSubmit={handleSubmit}>
            {selectedPlan !== 'free' && (
              <div className="space-y-6 mb-8">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CreditCard className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="cardNumber"
                      type="text"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      className="input pl-10"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    id="cardName"
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="input"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      id="expiryDate"
                      type="text"
                      value={expiryDate}
                      onChange={handleExpiryDateChange}
                      className="input"
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      id="cvv"
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 4))}
                      className="input"
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Plan</span>
                  <span className="font-medium text-gray-900">
                    {selectedPlan ? plans.find(p => p.id === selectedPlan)?.name : 'None selected'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Credits</span>
                  <span className="font-medium text-gray-900">
                    {selectedPlan ? plans.find(p => p.id === selectedPlan)?.credits : 0}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Price</span>
                  <span className="font-medium text-gray-900">
                    ${selectedPlan ? plans.find(p => p.id === selectedPlan)?.price : 0}/month
                  </span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-bold text-gray-900">
                  ${selectedPlan ? plans.find(p => p.id === selectedPlan)?.price : 0}/month
                </span>
              </div>
            </div>
            
            <motion.button
              type="submit"
              className="btn-primary w-full py-3 text-lg"
              disabled={isProcessing || !selectedPlan}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <span>
                  {selectedPlan === 'free' ? 'Confirm Free Plan' : 'Complete Purchase'}
                </span>
              )}
            </motion.button>
            
            <p className="text-center text-gray-500 text-sm mt-4">
              This is a demo. No actual payment will be processed.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;