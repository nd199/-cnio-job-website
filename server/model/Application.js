const db = require('mongoose');

const applicationSchema = new db.Schema({
  job: {
    type: db.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  applicant: {
    type: db.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  resumeLink: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: (props) => `${props.value} is not a valid URL`,
    },
  },
  user: {
    type: db.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
});

module.exports = db.model('Application', applicationSchema);
