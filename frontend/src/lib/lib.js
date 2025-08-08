import amazonLogo from '../assets/Illustrations/amazon-logo.json';
import apple from '../assets/Illustrations/apple.json';
import facebook from '../assets/Illustrations/facebook.json';
import github from '../assets/Illustrations/github.json';
import google from '../assets/Illustrations/google.json';
import microsoft from '../assets/Illustrations/microsoft.json';

export const messages = [
  {
    id: 1,
    sender: 'Infosys Careers',
    date: 'July 12, 9:00 AM',
    subject: 'You’ve been shortlisted for Associate Software Engineer',
    preview: 'Congratulations! You have been shortlisted for the interview round at Infosys...',
    type: 'Interview',
    isUnread: true,
    isDraft: false,
    isStarred: true,
    desc: `Infosys has shortlisted your profile for the Associate Software Engineer role.
Interview details and next steps will be shared shortly.
Make sure your resume is updated and documents are ready.
This is a crucial step in your hiring journey with Infosys.
Prepare well for aptitude and technical rounds.`,
  },
  {
    id: 2,
    sender: 'Job Portal System',
    date: 'July 11, 6:30 PM',
    subject: 'Weekly Job Digest - 157 new jobs for you',
    preview: 'Check out latest jobs based on your profile: TCS, Cognizant, Central Govt roles...',
    type: 'Jobs',
    isUnread: false,
    isDraft: false,
    isStarred: false,
    desc: `Your weekly job digest is ready with 157 matching opportunities.
It includes listings from top companies and government sectors.
Make sure to check them before application deadlines.
Tailor your resume and cover letter for each role.
Click on any job to apply directly from the portal.`,
  },
  {
    id: 3,
    sender: 'HCL Recruitment Team',
    date: 'July 10, 10:15 AM',
    subject: 'Interview Schedule - Software Developer Role',
    preview: 'Your technical interview is scheduled on July 14 at 11:00 AM IST. Join link inside.',
    type: 'Interview',
    isUnread: true,
    isDraft: false,
    isStarred: false,
    desc: `You are invited for a technical interview at HCL for the Software Developer role.
The interview is scheduled for July 14 at 11:00 AM IST.
Ensure a stable internet connection and be well-prepared.
The email contains the video call link and instructions.
Review your projects and practice common interview questions.`,
  },
  {
    id: 4,
    sender: 'Draft Application',
    date: 'July 9, 3:00 PM',
    subject: 'Draft: Application for Full Stack Developer at Tech Mahindra',
    preview: 'Dear HR, I am excited to apply for the Full Stack Developer position...',
    type: 'Drafts',
    isUnread: false,
    isDraft: true,
    isStarred: false,
    desc: `You’ve drafted an application for Tech Mahindra’s Full Stack Developer role.
It’s saved and ready for final edits before submission.
Ensure you highlight relevant skills and achievements.
Double-check the format, grammar, and personalization.
Submit it soon to avoid missing the deadline.`,
  },
  {
    id: 5,
    sender: 'Job Portal System',
    date: 'July 8, 8:00 AM',
    subject: 'Reminder: Complete your profile to get better job matches',
    preview: 'Almost there! Completing your profile improves job recommendations by 80%.',
    type: 'System',
    isUnread: true,
    isDraft: false,
    isStarred: false,
    desc: `Your profile is incomplete, which affects job match accuracy.
Finish filling in skills, experience, and preferences.
This helps recruiters find and contact you faster.
Completed profiles receive 80% more job matches.
Update your profile today to unlock full features.`,
  },
  {
    id: 6,
    sender: 'Accenture HR',
    date: 'July 7, 5:30 PM',
    subject: 'Offer Letter Issued - Digital Associate',
    preview: 'We are pleased to offer you the role of Digital Associate. Please find attached...',
    type: 'Jobs',
    isUnread: false,
    isDraft: false,
    isStarred: true,
    desc: `Accenture has officially offered you the Digital Associate position.
The offer letter is attached for your review and signature.
Check the compensation, location, and joining date.
Contact HR for any clarifications before accepting.
This is a great opportunity—congratulations!`,
  },
  {
    id: 7,
    sender: 'Job Portal System',
    date: 'July 6, 1:15 PM',
    subject: 'Application Update: Cognizant - Frontend Developer',
    preview: 'Your application is being reviewed. We’ll update you once shortlisted.',
    type: 'Jobs',
    isUnread: false,
    isDraft: false,
    isStarred: false,
    desc: `Your application for Frontend Developer at Cognizant is under review.
The recruiter will notify you if you are shortlisted.
Stay alert for updates in the coming days.
Meanwhile, continue applying to similar roles.
Keep preparing for potential interviews.`,
  },
];

export const indianCities = [
  'Bangalore',
  'Mumbai',
  'Delhi',
  'Chennai',
  'Hyderabad',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Surat',
  'Coimbatore',
  'Indore',
  'Lucknow',
  'Nagpur',
  'Visakhapatnam',
  'Bhopal',
  'Patna',
  'Thane',
  'Vadodara',
  'Ludhiana',
  'Nashik',
  'Rajkot',
  'Madurai',
  'Kanpur',
  'Agra',
];

export const testimonials = [
  {
    name: 'Aisha Malik',
    role: 'Data Scientist',
    quote:
      "The platform's data insights helped me excel in my projects and uncover trends I would have otherwise missed. It’s a game-changer for any data-driven role.",
    avatar: '/images/testimonials/avatar1.png',
    gender: 'female',
    ethnicity: 'Middle Eastern',
    country: 'UAE',
  },
  {
    name: 'Liam Chen',
    role: 'Software Engineer',
    quote:
      'Smart matching helped me discover remote roles across the world. I landed interviews within days, and the process was smoother than any platform I’ve used.',
    avatar: '/images/testimonials/avatar2.png',
    gender: 'male',
    ethnicity: 'East Asian',
    country: 'Singapore',
  },
  {
    name: 'Gabriela Torres',
    role: 'Product Designer',
    quote:
      'The UI was intuitive, and the recommendations felt personalized. It really felt like the system understood my preferences and design focus.',
    avatar: '/images/testimonials/avatar3.png',
    gender: 'female',
    ethnicity: 'Latinx',
    country: 'Mexico',
  },
  {
    name: 'Thabo Ndlovu',
    role: 'Mobile Developer',
    quote:
      'Got hired in 7 days. That’s a personal record! The tools helped me focus on real opportunities and skip the noise I usually deal with.',
    avatar: '/images/testimonials/avatar4.png',
    gender: 'male',
    ethnicity: 'African',
    country: 'South Africa',
  },
  {
    name: 'Yuki Nakamura',
    role: 'UX Researcher',
    quote:
      'Impressed by how accessible everything felt — a big plus! From navigation to applying, every step was smooth and clearly built with users in mind.',
    avatar: '/images/testimonials/avatar5.png',
    gender: 'female',
    ethnicity: 'East Asian',
    country: 'Japan',
  },
  {
    name: 'Daniel Smith',
    role: 'QA Engineer',
    quote:
      'The platform helped me switch industries without hassle. It guided me toward roles that matched my hidden strengths and transferable skills.',
    avatar: '/images/testimonials/avatar6.png',
    gender: 'male',
    ethnicity: 'Caucasian',
    country: 'USA',
  },
  {
    name: 'Fatima Al-Zahra',
    role: 'Cloud Consultant',
    quote:
      'Finally a platform that understands freelance tech roles. It catered to my availability, preferences, and project style in a seamless way.',
    avatar: '/images/testimonials/avatar7.png',
    gender: 'female',
    ethnicity: 'Middle Eastern',
    country: 'Jordan',
  },
  {
    name: 'Preethi Menon',
    role: 'Machine Learning Engineer',
    quote:
      'The filtering tools really helped me get noticed quickly. I was matched with roles that aligned closely with my skills and research experience.',
    avatar: '/images/testimonials/avatar8.png',
    gender: 'male',
    ethnicity: 'Indian',
    country: 'India',
  },
  {
    name: 'Isabella Rossi',
    role: 'HR Partner',
    quote:
      'We’ve cut hiring costs thanks to better candidate targeting. It streamlined our outreach and improved both quality and speed of hiring.',
    avatar: '/images/testimonials/avatar9.png',
    gender: 'female',
    ethnicity: 'European',
    country: 'Italy',
  },
  {
    name: 'Kofi Mensah',
    role: 'DevOps Engineer',
    quote:
      'Loved the real-time notifications. Helped me apply on time! The alerts were relevant and saved me from missing great opportunities.',
    avatar: '/images/testimonials/avatar10.png',
    gender: 'male',
    ethnicity: 'African',
    country: 'Ghana',
  },
  {
    name: 'Anna Müller',
    role: 'Technical Writer',
    quote:
      'The writing-focused filters saved me hours of job searching. I found niche roles that matched my tone, skills, and documentation focus.',
    avatar: '/images/testimonials/avatar11.png',
    gender: 'female',
    ethnicity: 'European',
    country: 'Germany',
  },
  {
    name: 'Daniel Almeida',
    role: 'Frontend Developer',
    quote:
      'This platform helped me go from freelancer to full-time. I never thought the transition could feel this smooth and supported.',
    avatar: '/images/testimonials/avatar12.png',
    gender: 'male',
    ethnicity: 'Latinx',
    country: 'Brazil',
  },
  {
    name: 'Chloe Dubois',
    role: 'Marketing Analyst',
    quote:
      'A refreshing platform with intelligent, data-first design. It brings clarity, speed, and personality to the job hunt experience.',
    avatar: '/images/testimonials/avatar13.png',
    gender: 'female',
    ethnicity: 'European',
    country: 'France',
  },
  {
    name: 'Sofia Petrova',
    role: 'Security Engineer',
    quote:
      'I appreciated the strong focus on tech diversity. It’s rare to see inclusion done this well, especially in cybersecurity hiring.',
    avatar: '/images/testimonials/avatar14.png',
    gender: 'female',
    ethnicity: 'Eastern European',
    country: 'Ukraine',
  },
  {
    name: 'Nguyen Minh',
    role: 'AI Researcher',
    quote:
      'The platform felt custom-built for deep tech professionals. It understood niche domains and surfaced roles I usually struggle to find.',
    avatar: '/images/testimonials/avatar15.png',
    gender: 'male',
    ethnicity: 'Southeast Asian',
    country: 'Vietnam',
  },
];

export const lottieLogos = [
  { type: 'lottie', animationData: amazonLogo, name: 'Amazon', desc: 'E-commerce giant' },
  { type: 'lottie', animationData: apple, name: 'Apple', desc: 'Consumer electronics' },
  { type: 'lottie', animationData: facebook, name: 'Facebook', desc: 'Social media platform' },
  { type: 'lottie', animationData: github, name: 'GitHub', desc: 'Code hosting platform' },
  { type: 'lottie', animationData: google, name: 'Google', desc: 'Search engine giant' },
  { type: 'lottie', animationData: microsoft, name: 'Microsoft', desc: 'Software & services' },
];

export const imageLogos = [
  { type: 'image', src: './icons/dropbox.png', name: 'Dropbox', desc: 'Cloud storage service' },
  { type: 'image', src: './icons/linkedin.gif', name: 'LinkedIn', desc: 'Professional networking' },
  { type: 'image', src: './icons/netflix.gif', name: 'Netflix', desc: 'Streaming service' },
  { type: 'image', src: './icons/nvidia.png', name: 'NVIDIA', desc: 'Graphics processors' },
  {
    type: 'image',
    src: '/icons/salesforce.png',
    name: 'Salesforce',
    desc: 'Customer relationship management',
  },
  { type: 'image', src: './icons/spotify.gif', name: 'Spotify', desc: 'Music streaming' },
  { type: 'image', src: './icons/uber.png', name: 'Uber', desc: 'Ride sharing service' },
  { type: 'image', src: './icons/zoom.png', name: 'Zoom', desc: 'Video communications' },
];
