import { useState, useRef, useEffect } from 'react';
import { Copy, Check, RotateCcw, Loader, LogIn } from 'lucide-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';

interface GuestHumanization {
  original_text: string;
  rewritten_text: string;
  created_at: string;
}

const GUEST_STORAGE_KEY = 'guest_humanizations';

const HumanizerBox = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessingComplete, setIsProcessingComplete] = useState(false);
  const [copied, setCopied] = useState(false);
  const [guestUsedCount, setGuestUsedCount] = useState(0);
  const { isAuthenticated, userCredits, updateCredits } = useAuth();
  
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get the guest usage count from localStorage
    const count = localStorage.getItem('guest_usage_count');
    if (count) {
      setGuestUsedCount(parseInt(count));
    }
    
    // Clear any old errors that might be in localStorage
    localStorage.removeItem('humanizer_error');
  }, []);

  const saveGuestHumanization = (original: string, rewritten: string) => {
    try {
      // Get existing items
      const existingItems = localStorage.getItem(GUEST_STORAGE_KEY);
      const items: GuestHumanization[] = existingItems ? JSON.parse(existingItems) : [];
      
      // Add new item
      items.push({
        original_text: original,
        rewritten_text: rewritten,
        created_at: new Date().toISOString()
      });
      
      // Save back to localStorage (limit to last 5 items to save space)
      localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(items.slice(-5)));
      
      // Update usage count
      const newCount = guestUsedCount + 1;
      setGuestUsedCount(newCount);
      localStorage.setItem('guest_usage_count', newCount.toString());
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  const humanizeText = async () => {
    if (!inputText.trim()) {
      toast.error('Please enter some text to humanize');
      return;
    }

    if (inputText.trim().length < 50) { // Undetectable API requires minimum 50 characters
      toast.error('Please enter at least 50 characters');
      return;
    }

    // Check for proper access
    if (isAuthenticated) {
      // For authenticated users, check credits
      if (userCredits <= 0) {
        toast.error('You have no credits left. Please upgrade your plan.');
        return;
      }
    } else {
      // For guests, limit to 3 uses
      if (guestUsedCount >= 3) {
        toast.error('You\'ve reached the guest usage limit. Please sign up for 100 free credits!');
        return;
      }
    }

    setIsProcessing(true);
    setIsProcessingComplete(false);
    setOutputText('');

    try {
      // Import the Undetectable API service dynamically to avoid potential issues
      const { humanizeText: undetectableHumanize } = await import('../lib/undetectableApi');
      
      // Call the Undetectable.ai API to humanize the text
      const humanizedOutput = await undetectableHumanize(inputText, {
        readability: 'High School',
        purpose: 'General Writing',
        strength: 'More Human',
        pollingInterval: 2000, // Poll every 2 seconds
        maxRetries: 30, // Maximum 1 minute wait time
      });
      
      if (isAuthenticated) {
        // Save the rewrite to the database for authenticated users
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          await supabase.from('rewrites').insert({
            user_id: user.id,
            original_text: inputText,
            rewritten_text: humanizedOutput
          });
          
          // Update user credits
          const newCreditBalance = userCredits - 1;
          await updateCredits(newCreditBalance);
        }
      } else {
        // Save to localStorage for guest users
        saveGuestHumanization(inputText, humanizedOutput);
      }
      
      setOutputText(humanizedOutput);
      setIsProcessingComplete(true);
      toast.success('Text humanized successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to humanize text. Please try again.');
      console.error('Humanize error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setInputText('');
    setOutputText('');
    setIsProcessingComplete(false);
  };

  const handleCopy = () => {
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  // Using real Undetectable.ai API integration instead of local text transformation

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto">
      {/* Sign up banner for non-authenticated users */}
      {!isAuthenticated && (
        <motion.div 
          className="bg-primary-50 border border-primary-100 rounded-lg p-4 mb-6 flex items-center justify-between"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center">
            <LogIn className="h-5 w-5 text-primary-600 mr-2" />
            <p className="text-primary-700">
              <span className="font-medium">Sign up now</span> to get 100 free credits and save your humanization history!
            </p>
          </div>
          <div className="flex space-x-3">
            <Link to="/register" className="btn-primary py-2 px-4 text-sm">
              Sign Up Free
            </Link>
            <Link to="/login" className="btn-outline py-2 px-4 text-sm">
              Log In
            </Link>
          </div>
        </motion.div>
      )}

      {/* Guest usage counter */}
      {!isAuthenticated && (
        <div className="text-sm text-gray-600 mb-4 text-center">
          Guest usage: {guestUsedCount}/3 free humanizations
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Input Box */}
        <div className="flex flex-col h-full">
          <div className="bg-white rounded-t-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium text-gray-800">Original Text</h3>
              <button 
                onClick={handleReset}
                className="text-gray-500 hover:text-gray-700 p-1 rounded transition-colors"
                aria-label="Reset text"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
            </div>
            <textarea
              className="w-full h-64 resize-none p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Paste your AI-generated text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isProcessing}
            />
          </div>
          <div className="bg-gray-50 rounded-b-lg border border-t-0 border-gray-200 p-4">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {inputText ? `${inputText.length} characters` : 'Enter text to humanize'}
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary flex items-center justify-center min-w-32"
                onClick={humanizeText}
                disabled={isProcessing || !inputText.trim()}
              >
                {isProcessing ? (
                  <>
                    <Loader className="animate-spin mr-2 h-4 w-4" />
                    Humanizing...
                  </>
                ) : (
                  'Humanize Text'
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Output Box */}
        <div className="flex flex-col h-full">
          <div className="bg-white rounded-t-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium text-gray-800">Humanized Text</h3>
              <CopyToClipboard text={outputText} onCopy={handleCopy}>
                <button 
                  className={`${outputText ? 'text-gray-500 hover:text-gray-700' : 'text-gray-300'} p-1 rounded transition-colors`}
                  disabled={!outputText}
                  aria-label="Copy to clipboard"
                >
                  {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                </button>
              </CopyToClipboard>
            </div>
            <div 
              ref={outputRef}
              className="w-full h-64 overflow-auto p-3 border border-gray-200 rounded-md bg-gray-50"
            >
              {isProcessing ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <Loader className="animate-spin h-8 w-8 mb-3" />
                  <p>Processing your text...</p>
                </div>
              ) : outputText ? (
                <p className="text-gray-800">{outputText}</p>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  <p>Humanized text will appear here</p>
                </div>
              )}
            </div>
          </div>
          <div className="bg-gray-50 rounded-b-lg border border-t-0 border-gray-200 p-4">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {outputText ? `${outputText.length} characters` : 'Waiting for input'}
              </div>
              {isAuthenticated ? (
                <div className="text-sm">
                  <span className="text-gray-500">Credits remaining: </span>
                  <span className="font-semibold text-primary-600">{userCredits}</span>
                </div>
              ) : (
                <div className="text-sm text-gray-500">
                  <Link to="/register" className="text-primary-600 hover:underline">Sign up</Link> for 100 free credits
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HumanizerBox;