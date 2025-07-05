const express = require('express');
const router = express.Router();
const Job = require('../model/Job');
const authentication = require('../middleware/authentication');
const { jobPosterRoles } = require('../utils/middlewares/authMiddleWare');

router.post('/', authentication, jobPosterRoles('ADMIN', 'RECRUITER'), async (req, res) => {
  try {
    const job = new Job({ ...req.body, postedBy: req.user._id });
    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: err.message || 'Issue creating job' });
  }
});

router.get('/', async (req, res) => {
  const { title, experience, location, type } = req.query;
  let filter = {};
  if (title) filter.title = { $regex: title, $options: 'i' };
  if (experience) filter.experience = { $regex: experience, $options: 'i' };
  if (location) filter.location = { $regex: location, $options: 'i' };
  if (type) filter.jobType = type;
  try {
    const jobs = await Job.find(filter).populate('postedBy', 'username role');
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Issue creating job' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'username role');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Issue creating job' });
  }
});

router.put('/:id', authentication, jobPosterRoles('ADMIN', 'RECRUITER'), async (req, res) => {
  const jobId = req.params.id;
  const updates = req.body;
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      { ...updates, postedBy: req.user._id },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Issue updating job' });
  }
});

router.delete('/:id', authentication, jobPosterRoles('ADMIN', 'RECRUITER'), async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Issue creating job' });
  }
});

module.exports = router;
