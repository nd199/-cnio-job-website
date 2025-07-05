const db = require('mongoose');

const userSchema = db.Schema({
  username: {
    type: String,
    required: true,
    minlength: [3, 'Username must be at least 3 characters long'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}/.test(v),
      message:
        'Password must include uppercase, lowercase, and a digit, and be at least 6 characters.',
    },
  },
  role: {
    type: String,
    enum: ['ADMIN', 'USER', 'RECRUITER'],
    default: 'USER',
  },
});

module.exports = db.model('User', userSchema);
