import React from 'react';

const CustomerLevel: React.FC = () => {
  const currentPlan = {
    name: 'Premium Plan',
    price: '$99',
    validity: '30 days',
    purchaseDate: '2024-08-15',
    expiryDate: '2024-09-15',
    daysLeft: 15,
    tasksPerDay: 10,
    earningsPerTask: '$2.00',
    totalTasks: 300,
    completedTasks: 142,
    features: [
      'Up to 10 tasks per day',
      '$2.00 per task completion',
      'Priority customer support',
      'Advanced analytics',
      'Referral bonuses'
    ]
  };

  const availablePlans = [
    {
      id: 1,
      name: 'Basic Plan',
      price: '$29',
      validity: '30 days',
      tasksPerDay: 3,
      earningsPerTask: '$1.00',
      features: ['Up to 3 tasks per day', '$1.00 per task', 'Email support'],
      recommended: false
    },
    {
      id: 2,
      name: 'Premium Plan',
      price: '$99',
      validity: '30 days',
      tasksPerDay: 10,
      earningsPerTask: '$2.00',
      features: ['Up to 10 tasks per day', '$2.00 per task', 'Priority support', 'Analytics'],
      recommended: true,
      current: true
    },
    {
      id: 3,
      name: 'VIP Plan',
      price: '$199',
      validity: '30 days',
      tasksPerDay: 20,
      earningsPerTask: '$3.00',
      features: ['Up to 20 tasks per day', '$3.00 per task', '24/7 support', 'Advanced analytics', 'VIP bonuses'],
      recommended: false
    }
  ];

  const progressPercentage = (currentPlan.completedTasks / currentPlan.totalTasks) * 100;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Current Plan Status */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Current Plan Status</h1>
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
            Active
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Plan Details */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">⭐</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{currentPlan.name}</h2>
                <p className="text-gray-600">{currentPlan.price} / {currentPlan.validity}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Purchase Date</p>
                <p className="font-medium text-gray-900">{currentPlan.purchaseDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Expiry Date</p>
                <p className="font-medium text-gray-900">{currentPlan.expiryDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Days Remaining</p>
                <p className="font-medium text-green-600">{currentPlan.daysLeft} days</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tasks Per Day</p>
                <p className="font-medium text-gray-900">{currentPlan.tasksPerDay}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Plan Features</h3>
              <ul className="space-y-1">
                {currentPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Progress & Stats */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Task Progress</span>
                <span className="text-gray-900">{currentPlan.completedTasks} / {currentPlan.totalTasks}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{progressPercentage.toFixed(1)}% completed</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{currentPlan.completedTasks}</p>
                <p className="text-sm text-gray-600">Tasks Completed</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">${(currentPlan.completedTasks * 2).toFixed(2)}</p>
                <p className="text-sm text-gray-600">Total Earned</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center">
                <span className="text-yellow-600 text-lg mr-2">⏰</span>
                <div>
                  <p className="font-medium text-yellow-800">Plan Expiring Soon</p>
                  <p className="text-sm text-yellow-700">Your plan expires in {currentPlan.daysLeft} days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Plans */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Upgrade Your Plan</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {availablePlans.map((plan) => (
            <div 
              key={plan.id}
              className={`relative border rounded-lg p-6 transition-all ${
                plan.current 
                  ? 'border-blue-500 bg-blue-50' 
                  : plan.recommended 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {plan.recommended && !plan.current && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Recommended
                  </span>
                </div>
              )}

              {plan.current && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Current Plan
                  </span>
                </div>
              )}

              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">/{plan.validity}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Up to {plan.tasksPerDay} tasks/day</p>
                  <p className="text-sm text-gray-600">{plan.earningsPerTask} per task</p>
                </div>
                
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                disabled={plan.current}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  plan.current
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : plan.recommended
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {plan.current ? 'Current Plan' : 'Upgrade Now'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Plan History */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Plan History</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Premium Plan</p>
              <p className="text-sm text-gray-600">Aug 15, 2024 - Sep 15, 2024</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">$99.00</p>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Active
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Basic Plan</p>
              <p className="text-sm text-gray-600">Jul 15, 2024 - Aug 15, 2024</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">$29.00</p>
              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                Expired
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerLevel;