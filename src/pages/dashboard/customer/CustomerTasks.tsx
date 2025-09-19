import React, { useState } from 'react';

const CustomerTasks: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'rejected'>('all');

  const tasks = [
    {
      id: 1,
      title: 'Visit TechCorp Website',
      description: 'Visit the homepage and browse for at least 2 minutes',
      url: 'https://techcorp.example.com',
      reward: 2.00,
      status: 'pending',
      timeLimit: '5 minutes',
      category: 'Website Visit',
      deadline: '2024-09-12 23:59',
      instructions: [
        'Visit the provided website link',
        'Browse the homepage for at least 2 minutes',
        'Take a screenshot of the homepage',
        'Submit the screenshot as proof'
      ]
    },
    {
      id: 2,
      title: 'Social Media Engagement',
      description: 'Like and share a specific post on social media',
      url: 'https://facebook.com/example-post',
      reward: 1.50,
      status: 'completed',
      timeLimit: '3 minutes',
      category: 'Social Media',
      deadline: '2024-09-11 23:59',
      instructions: [
        'Click on the provided social media link',
        'Like the post',
        'Share the post on your timeline',
        'Take a screenshot of your action'
      ],
      completedAt: '2024-09-11 14:30'
    },
    {
      id: 3,
      title: 'Product Review Task',
      description: 'Write a genuine review for an e-commerce product',
      url: 'https://shop.example.com/product/123',
      reward: 3.00,
      status: 'completed',
      timeLimit: '10 minutes',
      category: 'Review',
      deadline: '2024-09-10 23:59',
      instructions: [
        'Visit the product page',
        'Write a genuine review (minimum 50 words)',
        'Rate the product appropriately',
        'Submit screenshot of your review'
      ],
      completedAt: '2024-09-10 16:45'
    },
    {
      id: 4,
      title: 'App Download & Review',
      description: 'Download mobile app and write a review',
      url: 'https://play.google.com/store/apps/details?id=com.example',
      reward: 2.50,
      status: 'rejected',
      timeLimit: '8 minutes',
      category: 'App Review',
      deadline: '2024-09-09 23:59',
      instructions: [
        'Download the app from the store',
        'Use the app for at least 5 minutes',
        'Write a review with rating',
        'Submit proof of download and review'
      ],
      rejectionReason: 'Screenshot was not clear enough'
    },
    {
      id: 5,
      title: 'Survey Completion',
      description: 'Complete a customer satisfaction survey',
      url: 'https://survey.example.com/customer-feedback',
      reward: 1.00,
      status: 'pending',
      timeLimit: '4 minutes',
      category: 'Survey',
      deadline: '2024-09-13 23:59',
      instructions: [
        'Click on the survey link',
        'Answer all questions honestly',
        'Submit the survey',
        'Take screenshot of completion page'
      ]
    }
  ];

  const filteredTasks = tasks.filter(task => filter === 'all' || task.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Website Visit':
        return 'bg-blue-100 text-blue-800';
      case 'Social Media':
        return 'bg-purple-100 text-purple-800';
      case 'Review':
        return 'bg-green-100 text-green-800';
      case 'App Review':
        return 'bg-orange-100 text-orange-800';
      case 'Survey':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStartTask = (taskId: number) => {
    // Handle task start logic
    console.log('Starting task:', taskId);
  };

  const handleSubmitProof = (taskId: number) => {
    // Handle proof submission
    console.log('Submitting proof for task:', taskId);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header with stats */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Daily Tasks</h1>
          <div className="text-right">
            <p className="text-sm text-gray-600">Today's Progress</p>
            <p className="text-lg font-semibold text-blue-600">3 / 10 Tasks</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">7</p>
            <p className="text-sm text-gray-600">Available Tasks</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">2</p>
            <p className="text-sm text-gray-600">Completed Today</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">1</p>
            <p className="text-sm text-gray-600">Pending Review</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">$6.50</p>
            <p className="text-sm text-gray-600">Today's Earnings</p>
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'all', label: 'All Tasks', count: tasks.length },
              { key: 'pending', label: 'Pending', count: tasks.filter(t => t.status === 'pending').length },
              { key: 'completed', label: 'Completed', count: tasks.filter(t => t.status === 'completed').length },
              { key: 'rejected', label: 'Rejected', count: tasks.filter(t => t.status === 'rejected').length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  filter === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>

        {/* Task list */}
        <div className="p-6">
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div key={task.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(task.category)}`}>
                        {task.category}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                        {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{task.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Reward: </span>
                        <span className="font-medium text-green-600">${task.reward.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Time Limit: </span>
                        <span className="font-medium text-gray-900">{task.timeLimit}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Deadline: </span>
                        <span className="font-medium text-gray-900">{task.deadline}</span>
                      </div>
                    </div>

                    {task.status === 'completed' && task.completedAt && (
                      <div className="mt-2 text-sm">
                        <span className="text-gray-500">Completed: </span>
                        <span className="font-medium text-green-600">{task.completedAt}</span>
                      </div>
                    )}

                    {task.status === 'rejected' && task.rejectionReason && (
                      <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-800">
                          <span className="font-medium">Rejection Reason: </span>
                          {task.rejectionReason}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="ml-4 flex flex-col space-y-2">
                    {task.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleStartTask(task.id)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                        >
                          Start Task
                        </button>
                        <button
                          onClick={() => handleSubmitProof(task.id)}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
                        >
                          Submit Proof
                        </button>
                      </>
                    )}
                    {task.status === 'rejected' && (
                      <button
                        onClick={() => handleSubmitProof(task.id)}
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm"
                      >
                        Resubmit
                      </button>
                    )}
                  </div>
                </div>

                {/* Task instructions */}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Instructions:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                    {task.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                  {task.url && (
                    <div className="mt-3">
                      <a
                        href={task.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
                      >
                        🔗 Open Task Link
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredTasks.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📋</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
              <p className="text-gray-600">No tasks match your current filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerTasks;