const User = require('../model/User');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt/jwtUtil');
const router = require('express').Router();

router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || 'user',
    });

    const savedUser = await newUser.save();
    const token = generateToken(savedUser);

    res.sendStatus(201).json({
      token,
      user: {
        id: savedUser._id,
        username: savedUser.username,
        role: savedUser.role,
      },
      message: 'User registration successful',
    });
  } catch (err) {
    res.status(500).json(err) || 'Error while registering user';
  }
});

router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid User/User does not exist' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }

    const token = generateToken(user);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
      message: 'User login successful',
    });
  } catch (err) {
    res.status(500).json(err) || 'Error while logging in user';
  }
});
