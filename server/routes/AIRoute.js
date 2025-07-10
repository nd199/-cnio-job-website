const router = require('express').Router();

router.post('/api/chat', async (req, res) => {
  const prompt = req.body.prompt;
  try {
    const response = await axios.post("/")
  }
});
