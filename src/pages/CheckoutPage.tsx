import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Check, MessageCircle, ExternalLink, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

interface Plan {
  name: string;
  price: string;
  features: string[];
  description: string;
}

const CheckoutPage = () => {
  console.log('🚀 CheckoutPage component STARTED');
  
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Get plan from sessionStorage, URL query parameter, or location state
  const getPlan = () => {
    // First try sessionStorage
    const sessionPlan = sessionStorage.getItem('selectedPlan');
    if (sessionPlan) {
      try {
        const parsedPlan = JSON.parse(sessionPlan);
        console.log('Parsed plan from sessionStorage:', parsedPlan);
        // Clear the sessionStorage after reading
        sessionStorage.removeItem('selectedPlan');
        return parsedPlan;
      } catch (e) {
        console.error('Error parsing plan from sessionStorage:', e);
      }
    }

    // Fallback to URL query parameter
    const planParam = searchParams.get('plan');
    if (planParam) {
      try {
        const parsedPlan = JSON.parse(decodeURIComponent(planParam));
        console.log('Parsed plan from URL:', parsedPlan);
        return parsedPlan;
      } catch (e) {
        console.error('Error parsing plan from URL:', e);
        console.error('Raw plan param:', planParam);
      }
    }
    
    // Fallback to location state
    console.log('Trying location state:', location.state?.plan);
    return location.state?.plan;
  };

  const plan = getPlan();
  console.log('Final plan object:', plan);

  useEffect(() => {
    console.log('CheckoutPage mounted, plan:', plan);
    console.log('Location state:', location.state);
    console.log('Search params:', searchParams.toString());
    if (!plan) {
      console.log('No plan found, navigating to /plans');
      window.location.href = '/plans';
    }
  }, [plan, location.state, searchParams]);

  if (!plan) {
    return null;
  }

  const copyToClipboard = async (address: string, network: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(network);
      toast.success(`${network} address copied!`);
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (err) {
      toast.error('Failed to copy address');
    }
  };

  const openTelegram = () => {
    window.open('https://t.me/earnshadowofficial', '_blank');
  };

  const handleConfirmPayment = () => {
    setShowConfirmModal(true);
  };

  const confirmPayment = () => {
    // Set plan status to pending/not confirmed
    localStorage.setItem('planType', 'pending');
    
    // Close modal
    setShowConfirmModal(false);
    
    // Show success message
    toast.success('Payment confirmation submitted! Our team will verify and activate your plan within 24 hours.');
    
    // Navigate to customer dashboard using window.location for consistency
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 2000);
  };

  const walletInfo = {
    trc20: {
      network: 'TRC20 (Tron)',
      address: 'TCyUYuR286mJrjWDysJD51nFwUPyk3noSi',
      fee: '8%',
      icon: '🔵'
    },
    bep20: {
      network: 'BEP20 (BSC)',
      address: '0x133624D66a3D454bDb87cF3168a240B4B117DD9f',
      fee: '5%',
      icon: '🟡'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <button
            onClick={() => window.location.href = '/plans'}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Plans
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Complete Your Purchase</h1>
          <p className="text-lg text-gray-600">Secure payment for your {plan.name} plan</p>
        </motion.div>

        {/* Plan Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Plan Summary</h2>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${plan.color} text-white`}>
                <plan.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                <p className="text-gray-600">{plan.description}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">{plan.price}</div>
              {plan.period && <div className="text-gray-600">{plan.period}</div>}
            </div>
          </div>
        </motion.div>

        {/* Payment Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Payment Instructions</h2>
          
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-yellow-800">Important Payment Notes</h3>
                  <ul className="mt-2 text-sm text-yellow-700 space-y-1">
                    <li>• Send the exact amount shown above</li>
                    <li>• Include network fees in your transaction</li>
                    <li>• Keep your transaction hash safe</li>
                    <li>• Payment verification takes 24-48 hours</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* TRC20 Wallet */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">{walletInfo.trc20.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{walletInfo.trc20.network}</h3>
                    <p className="text-sm text-gray-600">Network Fee: {walletInfo.trc20.fee}</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg mb-4">
                  <p className="text-xs text-gray-600 mb-1">Wallet Address:</p>
                  <div className="flex items-center space-x-2">
                    <code className="text-sm font-mono text-gray-900 flex-1 break-all">
                      {walletInfo.trc20.address}
                    </code>
                    <button
                      onClick={() => copyToClipboard(walletInfo.trc20.address, 'TRC20')}
                      className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {copiedAddress === 'TRC20' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(walletInfo.trc20.address, 'TRC20')}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Copy TRC20 Address
                </button>
              </div>

              {/* BEP20 Wallet */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">{walletInfo.bep20.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{walletInfo.bep20.network}</h3>
                    <p className="text-sm text-gray-600">Network Fee: {walletInfo.bep20.fee}</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg mb-4">
                  <p className="text-xs text-gray-600 mb-1">Wallet Address:</p>
                  <div className="flex items-center space-x-2">
                    <code className="text-sm font-mono text-gray-900 flex-1 break-all">
                      {walletInfo.bep20.address}
                    </code>
                    <button
                      onClick={() => copyToClipboard(walletInfo.bep20.address, 'BEP20')}
                      className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {copiedAddress === 'BEP20' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(walletInfo.bep20.address, 'BEP20')}
                  className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  Copy BEP20 Address
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Need Help?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center">
              <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Support</h3>
              <p className="text-gray-600 mb-4">Get instant help from our support team</p>
              <button
                onClick={openTelegram}
                className="inline-flex items-center bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Telegram Support
                <ExternalLink className="w-4 h-4 ml-2" />
              </button>
            </div>
            <div className="text-center">
              <Check className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Confirmation</h3>
              <p className="text-gray-600 mb-4">Ready to confirm your payment?</p>
              <button
                onClick={handleConfirmPayment}
                className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors"
              >
                I've Made Payment
              </button>
            </div>
          </div>
        </motion.div>

        {/* Payment Confirmation Modal */}
        {showConfirmModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Confirm Payment</h3>
              <p className="text-gray-600 mb-6">
                Please confirm that you have sent the payment to one of the wallet addresses above.
                Our team will verify your transaction within 24-48 hours.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmPayment}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Confirm Payment
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;