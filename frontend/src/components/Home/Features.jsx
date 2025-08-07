import Lottie from 'lottie-react';
import Companies from '../../assets/Illustrations/Companies.json';
import Dash from '../../assets/Illustrations/Dash.json';
import Global from '../../assets/Illustrations/Global.json';
import Presentation from '../../assets/Illustrations/Presentation.json';
import Soft from '../../assets/Illustrations/Soft.json';
import HandShake from '../../assets/Illustrations/Trade.json';

const features = [
  {
    title: 'Smart Matching',
    desc: 'AI-powered job matching based on your skills, preferences, and behavior.',
    icon: <Lottie animationData={HandShake} loop={true} />,
  },
  {
    title: 'Real-Time Insights',
    desc: 'Stay updated with the latest trends, job stats, and recruiter activity.',
    icon: <Lottie animationData={Presentation} loop={true} />,
  },
  {
    title: 'Seamless Experience',
    desc: 'Fast, responsive, and delightful UI for both job seekers and companies.',
    icon: <Lottie animationData={Soft} loop={true} />,
  },
  {
    title: 'Verified Companies',
    desc: 'Every company is verified and reviewed for authenticity to ensure secure opportunities.',
    icon: <Lottie animationData={Companies} loop={true} />,
  },
  {
    title: 'Personalized Dashboard',
    desc: 'Track applications, saved jobs, and interviews with a user-friendly dashboard.',
    icon: <Lottie animationData={Dash} loop={true} />,
  },
  {
    title: 'Global Access',
    desc: 'Remote or onsite – find opportunities worldwide from verified employers.',
    icon: <Lottie animationData={Global} loop={true} />,
  },
];

const Features = () => {
  return (
    <div className="relative snap-start min-h-screen h-fit flex flex-col items-center justify-start pt-2 bg-gradient-to-br">
      <div className="absolute inset-0 bg-[url('/images/interview.jpg')] bg-cover bg-center bg-no-repeat opacity-70"></div>
      <div className="relative z-10 w-full flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-10">Why Cn.io?</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 max-w-6xl w-full">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl hover:shadow-2xl transition duration-300 hover:border-[var(--primary)] hover:scale-[1.03] flex flex-col items-center text-center gap-6"
            >
              <div className="w-40 h-40">{feature.icon}</div>
              <div className="flex flex-col items-center gap-4">
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
