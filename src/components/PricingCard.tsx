import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface PricingCardProps {
  title: string;
  price: number;
  description: string;
  features: string[];
  credits: number;
  popular?: boolean;
  buttonText: string;
  buttonLink: string;
}

const PricingCard = ({
  title,
  price,
  description,
  features,
  credits,
  popular = false,
  buttonText,
  buttonLink
}: PricingCardProps) => {
  return (
    <motion.div 
      className={`rounded-xl overflow-hidden ${
        popular ? 'border-2 border-primary-500 relative' : 'border border-gray-200'
      }`}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {popular && (
        <div className="absolute top-0 right-0 bg-primary-500 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
          Most Popular
        </div>
      )}
      <div className="p-6 md:p-8 bg-white">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold">${price}</span>
          {price > 0 && <span className="text-gray-500 ml-1">/month</span>}
        </div>
        <p className="text-gray-600 mb-6">{description}</p>
        <div className="mb-6">
          <p className="text-gray-800 font-medium mb-2">Includes:</p>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-50 -mx-8 px-8 py-4 flex items-center">
          <div className="text-primary-600 font-semibold mr-2">{credits}</div>
          <div className="text-gray-600">credits per month</div>
        </div>
      </div>
      <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-200">
        <Link
          to={buttonLink}
          className={`w-full py-3 px-4 rounded-md text-center font-medium block transition-colors ${
            popular
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {buttonText}
        </Link>
      </div>
    </motion.div>
  );
};

export default PricingCard;