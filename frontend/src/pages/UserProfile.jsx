import React from 'react';
import { Pencil, UploadCloud, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const UserProfile = () => {
  const user = {
    name: 'John Doe',
    title: 'Software Engineer',
    location: 'Bangalore, India',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    about:
      'Experienced full-stack developer specializing in building modern web applications with React, Node.js, and cloud-native tools.',
    avatar: 'https://via.placeholder.com/150',
    resume: '/resume.pdf',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-100 text-slate-900 px-6 py-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar */}
        <aside className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-xl flex flex-col items-center space-y-4">
          <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-white shadow-md" />
          <div className="text-center">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-sm text-gray-300">{user.title}</p>
            <p className="text-xs text-gray-400">{user.location}</p>
          </div>
          <div className="w-full space-y-2">
            <ProfileAction icon={<Pencil size={16} />} label="Edit Profile" />
            <ProfileAction icon={<UploadCloud size={16} />} label="Upload Resume" />
            <ProfileAction icon={<ShieldCheck size={16} />} label="Verify Profile" />
          </div>
        </aside>

        {/* Main Content */}
        <main className="md:col-span-2 space-y-6">
          <section className="bg-zinc-800/70 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-2">About</h3>
            <p className="text-gray-300 text-sm">{user.about}</p>
          </section>

          <div className="grid sm:grid-cols-2 gap-6">
            <Section title="Experience">
              <Entry
                title="TechCorp"
                subtitle="Software Engineer · Jan 2020 – Present"
                description="Built scalable web apps using React/Node. Led migration to microservices, automated CI/CD pipelines."
              />
            </Section>

            <Section title="Education">
              <Entry
                title="NIT Trichy"
                subtitle="B.Tech in Computer Science · 2014 – 2018"
              />
            </Section>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <Section title="Skills">
              <div className="flex flex-wrap gap-2">
                {['React', 'Node.js', 'Docker', 'AWS', 'MongoDB'].map((skill) => (
                  <span key={skill} className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow">
                    {skill}
                  </span>
                ))}
              </div>
            </Section>

            <Section title="Languages">
              <ul className="list-disc list-inside text-gray-300 text-sm">
                <li>English (Fluent)</li>
                <li>Hindi (Native)</li>
              </ul>
            </Section>
          </div>

          <Section title="Projects">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/90 backdrop-blur-md rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://via.placeholder.com/400x200"
                  alt="Project"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-bold text-slate-800 mb-1">Project Name</h4>
                  <p className="text-sm text-gray-600">
                    Description of the project goes here. Mention tech stack, features, or goal of the project.
                  </p>
                </div>
              </div>
            </div>
          </Section>

          <Section title="Resume">
            <a
              href={user.resume}
              download
              className="inline-block bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white px-5 py-2 rounded-md font-semibold transition"
            >
              Download Resume
            </a>
          </Section>
        </main>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <section className="bg-gradient-to-br from-white via-blue-50 to-white rounded-2xl shadow-md p-6 border border-slate-200">
    <h2 className="text-lg font-semibold mb-3 text-slate-800">{title}</h2>
    <div className="text-gray-700">{children}</div>
  </section>
);

const Entry = ({ title, subtitle, description }) => (
  <div className="space-y-1">
    <h3 className="font-bold text-blue-900">{title}</h3>
    <p className="text-sm text-blue-700">{subtitle}</p>
    {description && <p className="text-sm text-blue-700">{description}</p>}
  </div>
);

const ProfileAction = ({ icon, label }) => (
  <button className="flex items-center gap-2 px-4 py-2 w-full rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 text-sm font-medium transition">
    {icon}
    {label}
  </button>
);

export default UserProfile;
