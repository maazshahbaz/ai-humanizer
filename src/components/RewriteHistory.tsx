import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { formatDistanceToNow } from 'date-fns';
import { Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { motion } from 'framer-motion';

interface Rewrite {
  id: number;
  original_text: string;
  rewritten_text: string;
  created_at: string;
}

const RewriteHistory = () => {
  const [rewrites, setRewrites] = useState<Rewrite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  useEffect(() => {
    fetchRewrites();
  }, []);

  const fetchRewrites = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data, error } = await supabase
          .from('rewrites')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        setRewrites(data || []);
      }
    } catch (error) {
      console.error('Error fetching rewrites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleCopy = (id: number) => {
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (rewrites.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-500">You haven't humanized any text yet.</p>
        <p className="text-gray-500 mt-2">
          Go to the <a href="/" className="text-primary-600 hover:underline">homepage</a> to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Rewrites</h2>
      
      {rewrites.map((rewrite) => (
        <motion.div 
          key={rewrite.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <div className="text-gray-400 text-sm">
                {formatDistanceToNow(new Date(rewrite.created_at), { addSuffix: true })}
              </div>
              <button
                onClick={() => toggleExpand(rewrite.id)}
                className="text-gray-500 hover:text-gray-700 p-1"
                aria-label={expandedId === rewrite.id ? "Collapse" : "Expand"}
              >
                {expandedId === rewrite.id ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
            </div>
            
            <div className="mt-2">
              <h3 className="font-medium text-gray-800 mb-1">Original Text:</h3>
              <p className="text-gray-600">
                {expandedId === rewrite.id 
                  ? rewrite.original_text 
                  : truncateText(rewrite.original_text)}
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-medium text-gray-800">Humanized Text:</h3>
              <CopyToClipboard text={rewrite.rewritten_text} onCopy={() => handleCopy(rewrite.id)}>
                <button className="text-gray-500 hover:text-gray-700 p-1">
                  {copiedId === rewrite.id ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </button>
              </CopyToClipboard>
            </div>
            <p className="text-gray-600">
              {expandedId === rewrite.id 
                ? rewrite.rewritten_text 
                : truncateText(rewrite.rewritten_text)}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default RewriteHistory;