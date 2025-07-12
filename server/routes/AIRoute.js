const router = require('express').Router();
const blockedTopics = require('../utils/AI/filters/blockedTopics');
const { authentication, authorization } = require('../utils/middlewares/authMiddleWare');

router.post('/ai/blocked-Topics', authentication, authorization('admin'), (req, res) => {
  try {
    return res.sendStatus(200).json({ blockedTopics: blockedTopics });
  } catch (res) {
    return res.sendStatus(500).json({ message: 'Issue sending blockedTopics' });
  }
});
