import { motion } from "framer-motion";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

const BrandLogos = () => {
  const logos = [
  "/images/logos/ansell.png",
  "/images/logos/cleanspace logo.png",
  "/images/logos/dupont logo.png",
  "/images/logos/LOGO MPL.png",
  "/images/logos/LOGO MTS more than safety.png",
  "/images/logos/LOGO sacobel.png",
  "/images/logos/LOGO spasciani.png",
  "/images/logos/manulatex logo.png",
  "/images/logos/robusta logo chaussure.png",
  "/images/logos/sioen logo.png",
  "/images/logos/tyvek logo.png",
];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto px-4 py-12"
    >
      <h2 className="text-gray-800 sm:text-4xl text-2xl font-extrabold text-center mb-16">
        Nos partenaires de confiance
      </h2>
      <div className="relative">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: ".brand-prev",
            nextEl: ".brand-next",
          }}
          breakpoints={{
            0: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
        >
          {logos.map((logo, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className="flex items-center justify-center h-32 p-4 bg-white rounded-lg shadow-md"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={logo}
                  alt={`brand-${index}`}
                  className="h-20 w-full object-contain"
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <button className="brand-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-3 rounded-full shadow-lg hover:bg-white transition-colors">
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button className="brand-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-3 rounded-full shadow-lg hover:bg-white transition-colors">
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default BrandLogos;
