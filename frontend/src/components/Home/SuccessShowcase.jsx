import Lottie from 'lottie-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { lottieLogos, testimonials } from '../../lib/lib';

const SuccessShowcase = () => {
  const logoSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const testimonialSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="snap-start w-full min-h-screen flex flex-col items-center px-4 py-8 space-y-6 bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white overflow-x-hidden">
      <h2 className="text-center text-2xl md:text-3xl font-bold">
        People & Companies Who Trust Us
      </h2>

      {/* Company Logos */}
      <div className="w-full max-w-6xl mx-auto">
        <h3 className="text-xl font-semibold py-5 text-center">Companies</h3>
        <Slider {...logoSettings}>
          {lottieLogos.map((logo, index) => (
            <div key={`${logo.type}-logo-${index}`} className="px-2">
              <div className="flex flex-col items-center justify-center bg-gradient-to-tr from-pink-100/30 via-indigo-100/20 to-purple-400/20 rounded-xl shadow-lg p-5 transition-transform duration-300 hover:scale-105 cursor-pointer text-white text-center">
                <h3 className="mb-2 font-semibold text-lg">{logo.name}</h3>
                {logo.type === 'lottie' ? (
                  <Lottie
                    animationData={logo.animationData}
                    loop
                    style={{ height: 80, width: 80 }}
                  />
                ) : (
                  <img src={logo.src} alt={logo.name} className="h-14 w-auto object-cover" />
                )}
                <p className="text-sm mt-2">{logo.desc}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="w-full max-w-5xl mx-auto px-2">
        <h3 className="text-xl font-semibold py-5 text-center">Testimonials</h3>
        <Slider {...testimonialSettings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="px-2">
              <div
                className="bg-gradient-to-r from-pink-100/30 via-indigo-100/20 to-purple-400/20
              text-white
              rounded-xl shadow-lg p-6 md:p-10 h-[250px] flex flex-col gap-4"
              >
                <div className="w-full flex justify-between items-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-white">
                    <img
                      className="w-full h-full object-cover"
                      src={`${testimonial.avatar}`}
                      alt={`${testimonial.name}`}
                    />
                  </div>
                  <div className="text-end">
                    <div className="text-lg font-semibold">{testimonial.name}</div>
                    <p className="text-xs">{testimonial.role}</p>
                    <p className="text-xs">{testimonial.country}</p>
                  </div>
                </div>
                <div className="text-white/75 italic font-light">"{`${testimonial.quote}`}"</div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SuccessShowcase;
