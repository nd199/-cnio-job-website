const express = require('express');
const router = express.Router();
const Job = require('../model/Job');
const axios = require('axios');
const { jobPosterRoles, authentication } = require('../utils/middlewares/authMiddleWare');

const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID || '';
const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY || '';

const extractSkillsFromText = (description = '') => {
  const skills = [
    'Python',
    'JavaScript',
    'React',
    'Flask',
    'FastAPI',
    'TypeScript',
    'Docker',
    'AWS',
    'Azure',
    'GCP',
    'MongoDB',
    'SQL',
    'Redux',
    'Tailwind',
    'Linux',
  ];
  return skills.filter((skill) => description.toLowerCase().includes(skill.toLowerCase()));
};

const extractExperienceFromText = (description = '') => {
  const match = description.match(/(\d+)\+?\s?(?:years|yrs)/i);
  return match ? `${match[1]} years` : 'Not specified';
};

// Create Job (Internal)
router.post('/', async (req, res) => {
  try {
    const job = new Job({ ...req.body });
    const saved = await job.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('❌ Create Error:', error.message);
    res.status(500).json({ message: error.message || 'Error creating job' });
  }
});

// Get Jobs (Internal + External)
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

  const filter = {};
  const days = parseInt(postedWithinDays, 10);
  const limitNumber = parseInt(limit, 10);
  const pageNumber = parseInt(page, 10);
  const skip = (pageNumber - 1) * limitNumber;

  if (days) {
    const threshold = new Date();
    threshold.setDate(threshold.getDate() - days);
    filter.createdAt = { $gte: threshold };
  }
  if (title) filter.title = { $regex: title, $options: 'i' };
  if (experience) filter.experience = { $regex: experience, $options: 'i' };
  if (location) filter.location = { $regex: location, $options: 'i' };
  if (type) filter.jobType = type;
  if (skills) {
    const arr = skills.split(',').map((s) => s.trim());
    filter.skills = { $in: arr };
  }

  try {
    const internalJobs = await Job.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber)
      .populate('postedBy', 'username role');
    const totalInternal = await Job.countDocuments(filter);
    let externalJobs = [];

    if (source === 'all' || source === 'external') {
      // JSearch API
      try {
        const jRes = await axios.get('https://jsearch.p.rapidapi.com/search', {
          params: {
            query: title || 'developer',
            location: location || 'India',
            page: 1,
            num_pages: 1,
          },
          headers: {
            'X-RapidAPI-Key': process.env.JSEARCH_API_KEY,
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
          },
        });

        const jJobs = jRes.data?.data || [];
        const jFormatted = jJobs.map((job) => ({
          ...job,
          title: job.job_title,
          description: job.job_description,
          type: job.job_employment_type || 'Full-time',
          location: job.job_location || job.job_city || 'Unknown',
          experience: job.job_experience || extractExperienceFromText(job.job_description),
          skills: job.job_required_skills || extractSkillsFromText(job.job_description),
          postedOn: job.job_posted_at_datetime_utc || '',
          job_apply_link: job.job_apply_link || '',
          postedBy: job.employer_name || 'Unknown',
        }));

        externalJobs = jFormatted.filter(
          (j) =>
            j.location?.toLowerCase().includes('india') ||
            j.location?.toLowerCase().includes('remote') ||
            j.location?.toLowerCase().includes('in')
        );
      } catch (err) {
        console.error('❌ JSearch Error:', err.message);
      }

      // Adzuna API
      try {
        const adzRes = await axios.get('https://api.adzuna.com/v1/api/jobs/in/search/1', {
          params: {
            app_id: ADZUNA_APP_ID,
            app_key: ADZUNA_APP_KEY,
            results_per_page: 10,
            what: title || 'developer',
            where: location || 'India',
          },
        });

        const adzunaJobs = adzRes.data.results.map((job) => ({
          title: job.title || 'Untitled Job',
          description: job.description || '',
          type: job.contract_time || 'Full-time',
          location: job.location?.display_name || 'Unknown',
          experience: extractExperienceFromText(job.description),
          skills: extractSkillsFromText(job.description),
          postedOn: job.created || '',
          redirect_url: job.redirect_url || '',
          postedBy: job.company?.display_name || 'Unknown',
          source: 'adzuna',
        }));

        externalJobs = externalJobs.concat(adzunaJobs);
      } catch (err) {
        console.error('❌ Adzuna Error:', err.response?.data || err.message);
      }
    }

    const data =
      source === 'internal'
        ? internalJobs
        : source === 'external'
        ? externalJobs
        : [...internalJobs, ...externalJobs];

    res.status(200).json({
      page: pageNumber,
      limit: limitNumber,
      total: source === 'internal' ? totalInternal : data.length,
      totalPages: Math.ceil(data.length / limitNumber),
      data,
    });
  } catch (error) {
    console.error('❌ Fetch Error:', error.message);
    res.status(500).json({ message: error.message || 'Error fetching jobs' });
  }
});

// Get by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'username role');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error retrieving job' });
  }
});

// Update
router.put('/:id', authentication, jobPosterRoles('ADMIN', 'RECRUITER'), async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { ...req.body, postedBy: req.user._id },
      { new: true, runValidators: true }
    );
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error updating job' });
  }
});

// Delete
router.delete('/:id', authentication, jobPosterRoles('ADMIN', 'RECRUITER'), async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error deleting job' });
  }
});

module.exports = router;
