const express = require('express');const express = require('express');const express = require('express');

const router = express.Router();

const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');const router = express.Router();const router = express.Router();

const walletController = require('../controllers/walletController');

const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');

// User wallet endpoints

router.get('/', authMiddleware, walletController.getWalletInfo);const walletController = require('../controllers/walletController');const walletController = require('../controllers/walletController');

router.post('/withdraw', authMiddleware, walletController.requestWithdrawal);

router.get('/withdrawals', authMiddleware, walletController.getWithdrawalHistory);



// Admin wallet management// User wallet endpoints// User wallet endpoints

router.patch('/plan/:userId', authMiddleware, walletController.updateUserPlan);

router.get('/admin/users', authMiddleware, isAdmin, walletController.getAllUsersWalletInfo);router.get('/', authMiddleware, walletController.getWalletInfo);router.get('/', authMiddleware, walletController.getWalletInfo);



module.exports = router;router.post('/withdraw', authMiddleware, walletController.requestWithdrawal);router.post('/withdraw', authMiddleware, walletController.requestWithdrawal);

router.get('/withdrawals', authMiddleware, walletController.getWithdrawalHistory);router.get('/withdrawals', authMiddleware, walletController.getWithdrawalHistory);



// Admin wallet management// Admin wallet management

router.patch('/plan/:userId', authMiddleware, walletController.updateUserPlan);router.patch('/plan/:userId', authMiddleware, walletController.updateUserPlan);

router.get('/admin/users', authMiddleware, isAdmin, walletController.getAllUsersWalletInfo);router.get('/admin/users', authMiddleware, isAdmin, walletController.getAllUsersWalletInfo);



module.exports = router;module.exports = router;
      // Admin wallet statistics
      const totalUsers = await User.countDocuments({ role: 'customer' });
      const users = await User.find({ role: 'customer' }).select('wallet');
      
      const totalBalance = users.reduce((sum, user) => sum + user.wallet.balance, 0);
      const totalEarned = users.reduce((sum, user) => sum + user.wallet.totalEarned, 0);
      
      const pendingWithdrawals = users.reduce((total, user) => {
        const pending = user.wallet.withdrawalHistory.filter(w => w.status === 'pending');
        return total + pending.reduce((sum, w) => sum + w.amount, 0);
      }, 0);

      const completedTasks = await UserTask.countDocuments({ status: 'approved' });
      const pendingTasks = await UserTask.countDocuments({ status: 'pending' });

      res.json({
        success: true,
        stats: {
          totalUsers,
          totalBalance: totalBalance.toFixed(2),
          totalEarned: totalEarned.toFixed(2),
          pendingWithdrawals: pendingWithdrawals.toFixed(2),
          completedTasks,
          pendingTasks
        }
      });
    } else {
      // User wallet statistics
      const user = await User.findById(req.user.id).select('wallet');
      const userTasks = await UserTask.find({ userId: req.user.id });
      
      const completedTasks = userTasks.filter(task => task.status === 'approved').length;
      const pendingTasks = userTasks.filter(task => task.status === 'pending').length;
      const totalTasks = userTasks.length;

      res.json({
        success: true,
        stats: {
          balance: user.wallet.balance.toFixed(2),
          totalEarned: user.wallet.totalEarned.toFixed(2),
          completedTasks,
          pendingTasks,
          totalTasks,
          withdrawalCount: user.wallet.withdrawalHistory.length
        }
      });
    }
  } catch (error) {
    console.error('Get wallet stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get plan information
router.get('/plans', (req, res) => {
  res.json({
    success: true,
    plans: {
      basic: {
        name: 'Basic Plan',
        description: 'Perfect for beginners',
        features: ['5 tasks per day', 'Basic support', '$0.50 - $2 per task'],
        taskLimit: 5,
        paymentRange: { min: 0.5, max: 2 }
      },
      standard: {
        name: 'Standard Plan', 
        description: 'Most popular choice',
        features: ['15 tasks per day', 'Priority support', '$1 - $5 per task'],
        taskLimit: 15,
        paymentRange: { min: 1, max: 5 }
      },
      premium: {
        name: 'Premium Plan',
        description: 'For serious earners',
        features: ['30 tasks per day', '24/7 support', '$2 - $10 per task'],
        taskLimit: 30,
        paymentRange: { min: 2, max: 10 }
      },
      vip: {
        name: 'VIP Plan',
        description: 'Maximum earning potential',
        features: ['Unlimited tasks', 'Dedicated support', '$5 - $25 per task'],
        taskLimit: -1, // -1 means unlimited
        paymentRange: { min: 5, max: 25 }
      }
    }
  });
});

module.exports = router;