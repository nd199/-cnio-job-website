const express = require('express');
const router = express.Router();
const Job = require('../model/Job');
const { jobPosterRoles, authentication } = require('../utils/middlewares/authMiddleWare');
const axios = require('axios');

function extractSkillsFromText(description = '') {
  const skillKeywords = [
    'Python', 'JavaScript', 'React', 'Flask', 'FastAPI', 'TypeScript', 'Docker',
    'AWS', 'Azure', 'GCP', 'MongoDB', 'SQL', 'Redux', 'Tailwind', 'Linux'
  ];
  return skillKeywords.filter(skill =>
    description.toLowerCase().includes(skill.toLowerCase())
  );
}

function extractExperienceFromText(description = '') {
  const match = description.match(/(\d+)\+?\s?(?:years|yrs)/i);
  return match ? `${match[1]} years` : 'Not specified';
}

router.post('/', async (req, res) => {
  try {
    console.log('Incoming Job:', req.body);
    const job = new Job({ ...req.body });
    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (error) {
    console.error('❌ Error creating job:', error.message);
    res.status(500).json({ message: error.message || 'Issue creating job' });
  }
});

router.get('/', async (req, res) => {
  const {
    title,
    experience,
    location,
    type,
    skills,
    page = 1,
    limit = 10,
    postedWithinDays = 7,
    source = 'all',
  } = req.query;
  let filter = {};

  if (postedWithinDays) {
    const days = parseInt(postedWithinDays, 10);
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - days);
    filter.createdAt = { $gte: dateThreshold };
  }

  if (title) filter.title = { $regex: title, $options: 'i' };
  if (experience) filter.experience = { $regex: experience, $options: 'i' };
  if (location) filter.location = { $regex: location, $options: 'i' };
  if (type) filter.jobType = type;
  if (skills) {
    const skillArray = skills.split(',').map((skill) => skill.trim());
    filter.skills = { $in: skillArray };
  }

  try {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const jobs = await Job.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber)
      .populate('postedBy', 'username role');
    const total = await Job.countDocuments(filter);
    let externalJobs = [];

    if (source === 'all' || source === 'external') {
      const jSearchRes = await axios.get('https://jsearch.p.rapidapi.com/search', {
        params: {
          query: title || 'developer',
          location: location || 'india',
          page: 1,
          num_pages: 1,
        },
        headers: {
          'X-RapidAPI-Key': process.env.JSEARCH_API_KEY,
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
        },
      });
      externalJobs = jSearchRes.data.data || [];
      externalJobs = externalJobs.map((job) => ({
        ...job,
        title: job.job_title,
        description: job.job_description,
        type: job.job_employment_type || 'Full-time',
        location: job.job_location || job.job_city || 'Unknown',
        experience: job.job_experience || extractExperienceFromText(job.job_description),
        skills: job.job_required_skills || extractSkillsFromText(job.job_description),
        postedOn:
          job.job_posted_at_datetime_utc
            ? new Date(job.job_posted_at_datetime_utc).toLocaleDateString()
            : 'Unknown',
      }));
      console.log(externalJobs);
    }

    const combinedJobs =
      source === 'external'
        ? externalJobs
        : source === 'internal'
        ? jobs
        : [...jobs, ...externalJobs];

    res.status(200).json({
      page: pageNumber,
      limit: limitNumber,
      total: source === 'internal' ? total : combinedJobs.length,
      totalPages: Math.ceil(combinedJobs.length / limitNumber),
      data: combinedJobs,
    });
  } catch (error) {
    console.error('❌ Error fetching jobs:', error.message);
    res.status(500).json({ message: error.message || 'Issue fetching jobs' });
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
