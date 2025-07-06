const router = require('express').Router();
const Application = require('../model/Application');
const Job = require('../model/Job');
const User = require('../model/User');
const { authentication, adminAuth } = require('../utils/middlewares/authMiddleWare');

router.post('/', authentication, async (req, res) => {
  const { job, resumeLink } = req.body;

  try {
    if (!job || !resumeLink) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const existing = await Application.findOne({
      job,
      applicant: req.user._id,
    });

    if (existing) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    const application = new Application({
      job,
      resumeLink,
      applicant: req.user._id,
    });

    const savedApplication = await application.save();
    res.status(200).json(savedApplication);
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message || 'An error occurred while applying for the job' });
  }
});

router.get('/', async (req, res) => {
  const {
    jobTitle,
    applicantName,
    status,
    skills,
    experience,
    education,
    page = 1,
    limit = 10,
  } = req.query;
  let filter = {};
  try {
    if (jobTitle) {
      const jobs = await Job.find({
        title: { $regex: jobTitle, $options: 'i' },
      }).select('_id');
      filter.job = { $in: jobs.map((job) => job._id) };
    }

    let userFilter = {};

    if (applicantName) {
      userFilter.username = { $regex: applicantName, $options: 'i' };
    }

    if (skills) {
      userFilter.skills = { $regex: skills, $options: 'i' };
    }
    if (experience) {
      userFilter.experience = { $regex: experience, $options: 'i' };
    }

    const expNum = parseFloat(experience);
    if (!isNaN(expNum) && expNum <= 1 && education) {
      userFilter.education = { $regex: education, $options: 'i' };
    }

    if (Object.keys(userFilter).length > 0) {
      const users = await User.find(userFilter).select('_id');
      filter.applicant = { $in: users.map((user) => user._id) };
    }
    if (status) {
      filter.status = status;
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const applications = await Application.find(filter)
      .populate('job', 'title company')
      .populate('applicant', 'username email skills experience education')
      .skip(skip)
      .limit(parseInt(limit));
    const total = await Application.countDocuments(filter);

    res.status(200).json({
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / limit),
      data: applications,
    });
  } catch (err) {
    res.status(500).json(err || 'Error getting applications');
  }
});

router.delete('/:id', authentication, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    const isOwner = application.applicant.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'ADMIN';
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await application.deleteOne();
    res.status(200).json({ message: 'Application deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error deleting application' });
  }
});
