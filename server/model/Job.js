const db = require('mongoose');

const jobSchema = new db.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: String,
    experience: { type: String, required: true },
    jobType: {
      type: String,
      enum: ['Full Time', 'Part Time', 'Contract', 'Internship', 'Freelance'],
      default: 'Full Time',
    },
    description: { type: String, required: true, minLength: 600 },
    postedBy: {
      type: db.Schema.Types.ObjectId,
      ref: 'User',
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = db.model('Job', jobSchema);
