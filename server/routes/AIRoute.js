const router = require('express').Router();
const blockedTopics = require('../utils/AI/blockedTopics.public.js');
const { authentication, authorization } = require('../utils/middlewares/authMiddleWare.js');

router.get('/blockedTopics', (req, res) => {
  try {
    console.log('blockedTopics', blockedTopics);
    return res.status(200).json({ blockedTopics });
  } catch (res) {
    return res.status(500).json({ message: 'Issue sending blockedTopics' });
  }
});

module.exports = router;
