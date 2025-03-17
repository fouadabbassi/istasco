/* eslint-disable react/prop-types */

import Footer from "../Components/Footer";
import { useEffect, useRef, useState } from "react";
import { createMessage } from "../Redux/messageAction";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useDispatch} from "react-redux";
import { motion, useInView } from "framer-motion";
import "./marquee.css";
import BrandLogos from "./BrandLogos";
import CategoriesGrid from "./CategoriesGrid";
import TravailleurGrid from "./TravailleurGrid";
import ProduitsPlusView from "./ProduitsPlusView";


const IncrementingNumber = ({ target, startCounting }) => {
  const [count, setCount] = useState(0);
  const hasStartedCounting = useRef(false); // Track if counting has started

  useEffect(() => {
    if (startCounting && !hasStartedCounting.current) {
      hasStartedCounting.current = true; // Set to true to prevent further counting
      const duration = 2000;
      const incrementTime = 50;
      const totalSteps = duration / incrementTime;
      const incrementValue = Math.ceil(target / totalSteps);

      const interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount < target) {
            return Math.min(prevCount + incrementValue, target);
          } else {
            clearInterval(interval);
            return prevCount;
          }
        });
      }, incrementTime);

      return () => clearInterval(interval);
    }
  }, [startCounting, target]);

  return <>{count}</>;
};
const LandingPage = () => {
  // eslint-disable-next-line react/prop-types
  // Hook to track if element is in view
  
  
  const ref = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  /*const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);*/
  const ref7 = useRef(null);
  const ref8 = useRef(null);
  //const ref9 = useRef(null);
  
  const isInView = useInView(ref, { once: false });
  const isInView1 = useInView(ref1, { once: false });
  const isInView2 = useInView(ref2, { once: false });
  const isInView3 = useInView(ref3, { once: false });
  /*const isInView4 = useInView(ref4, { once: false });
  const isInView5 = useInView(ref5, { once: false });
  const isInView6 = useInView(ref6, { once: false });*/
  const isInView7 = useInView(ref7, { once: false });
  const isInView8 = useInView(ref8, { once: false });
  //const isInView9 = useInView(ref9, { once: false });
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [object, setObject] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "name is required";
    else if (name.length < 4)
      newErrors.name = "name must be at least 4 characters";
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!object) newErrors.objet = "objet is required";
    else if (object.length < 1)
      newErrors.objet = "objet must be at least 2 characters";
    if (!message) newErrors.message = "message is required";
    else if (message.length < 10)
      newErrors.message = "message must be at least 10 characters";
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      for (const key in formErrors) {
        toast.error(formErrors[key]);
      }
    } else {
      dispatch(
        createMessage({
          name: name,
          email: email,
          object: object,
          message: message,
        })
      );
      toast.success("Envoyer success");
      setName("");
      setEmail("");
      setObject("");
      setMessage("");
    }
  };
  const refNumber = useRef(null);
  const isInViewNumber = useInView(refNumber, { once: true }); // Change to true to count only once
  const [startCounting, setStartCounting] = useState(false);

  // Your form handling and submission logic here...

  useEffect(() => {
    if (isInViewNumber) {
      setStartCounting(true); // Start counting when the section is in view
    }
  }, [isInViewNumber]);
  // إعداد الكاروسيل
  const images = [
    "/hero.jpg",
    "/hero1.jpg",
    "/hero2.jpg",
    "/hero3.jpg",
    "/hero4.jpg",
    "/hero5.jpg",
    "/hero6.jpg",
    "/epi-pour-tous.webp",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div>
      {/**hero section */}
      <div className="relative bg-[#1B5085]/35 font-sans pb-10 overflow-hidden">
        {/* الكاروسيل كخلفية */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-[-1]">
          <img
            src={images[currentIndex]}
            alt={`slide-${currentIndex}`}
            className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
          />
          {/* نقاط التنقل بين الصور */}
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full cursor-pointer ${
                  currentIndex === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* المحتوى النصي للـ Hero Section */}
        <div className="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:py-32 lg:px-8 text-center lg:text-left">
          <h1 className="text-4xl tracking-tight leading-10 font-extrabold text-white sm:text-5xl sm:leading-none md:text-6xl lg:text-7xl">
            Bienvenue sur
            <br className="xl:hidden" />
            <span className="text-[#EE902F] ml-4 bg-white/25 rounded-lg font-serif px-2">
              ISTASco
            </span>
          </h1>
          <p className="max-w-md mx-auto text-lg text-gray-300 sm:text-xl mt-4 md:mt-6 md:max-w-6xl">
            votre partenaire de confiance en matière d’équipements de protection
            individuelle (EPI).
          </p>

          <div className="mt-12 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
            <div className="rounded-md shadow">
              <Link to={"/register"}>
                <button className="w-full flex items-center justify-center px-8 py-3 text-base tracking-wide rounded-md text-indigo-600 bg-white hover:text-indigo-500 hover:bg-indigo-100 transition duration-150 ease-in-out">
                  Commencer
                </button>
              </Link>
            </div>
            <div>
              <Link to={"/#about"}>
                <button className="w-full flex items-center justify-center px-8 py-3 text-base tracking-wide rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition duration-150 ease-in-out">
                  En savoir plus
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/**aboit us */}
      <div
        id="about"
        className="font-sans bg-gray-100 px-4 py-12 overflow-hidden"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:max-w-6xl max-w-2xl mx-auto">
          <motion.div
            ref={ref}
            initial={{ x: -100 }}
            animate={isInView ? { x: 0 } : {}}
            transition={{ duration: 1.5 }}
            className="text-left"
          >
            <h2 className="text-gray-800 text-3xl font-bold mb-6">
              À propos de nous
            </h2>
            <p className="mb-4 text-sm text-gray-500">
              Depuis 2010, ISTAS est spécialisée dans la distribution
              d&#39;équipements de protection individuelle (EPI) de haute
              qualité. Grâce à notre expertise et notre engagement envers la
              sécurité, nous nous efforçons de fournir à nos clients les
              meilleurs produits pour assurer leur protection dans différents
              environnements de travail.
            </p>
            <h2 className="text-gray-800 text-3xl font-bold mb-6">
              Pourquoi choisir ISTASco ?
            </h2>
            <p className="mb-4 text-sm text-gray-500">
              Large gamme de produits répondant aux normes de sécurité les plus
              strictes.
            </p>
            <p className=" mb-4 text-sm text-gray-500">
              Expertise et conseil personnalisé pour vous aider à choisir les
              solutions les mieux adaptées à vos besoins.{" "}
            </p>
            <p className="mb-4 text-sm text-gray-500">
              Livraison rapide et efficace pour garantir que vos équipements
              arrivent à temps.
            </p>
            <p className="mb-4 text-sm text-gray-500">
              Service après-vente réactif pour répondre à toutes vos questions
              et assurer un suivi complet.
            </p>
          </motion.div>
          <motion.div
            ref={ref1}
            initial={{ x: 100 }}
            animate={isInView1 ? { x: 0 } : {}}
            transition={{ duration: 1.5 }}
            className="w-full h-full object-cover"
          >
            <img
              src={"/epi-pour-tous.webp"}
              alt={`epi-pour-tous`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
      {/**brand logos */}
      <BrandLogos />
      {/**value section */}
      <motion.div
        ref={ref2}
        initial={{ y: -100 }}
        animate={isInView2 ? { y: 0 } : {}}
        transition={{ duration: 1.5 }}
        className="max-w-6xl mt-10 mx-auto font-[sans-serif]"
      >
        <h2 className="text-gray-800 sm:text-4xl text-2xl font-extrabold text-center mb-16">
          Découvrez nos fonctionnalités exclusives
        </h2>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 max-md:max-w-lg mx-auto gap-12">
          <div className="p-4 flex gap-6 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-12 h-12 bg-blue-100 p-3 rounded-lg shrink-0"
              viewBox="0 0 682.667 682.667"
            >
              <defs>
                <clipPath id="a" clipPathUnits="userSpaceOnUse">
                  <path d="M0 512h512V0H0Z" data-original="#000000" />
                </clipPath>
              </defs>
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="40"
                clipPath="url(#a)"
                transform="matrix(1.33 0 0 -1.33 0 682.667)"
              >
                <path
                  d="M256 492 60 410.623v-98.925C60 183.674 137.469 68.38 256 20c118.53 48.38 196 163.674 196 291.698v98.925z"
                  data-original="#000000"
                />
                <path
                  d="M178 271.894 233.894 216 334 316.105"
                  data-original="#000000"
                />
              </g>
            </svg>
            <div>
              <h3 className="text-gray-800 text-xl font-semibold mb-3">
                Sécurité
              </h3>
              <p className="text-gray-600 text-sm">
                La sécurité de nos clients est notre priorité absolue{" "}
              </p>
            </div>
          </div>

          <div className="p-4 flex gap-6 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-12 h-12 bg-blue-100 p-3 rounded-lg shrink-0"
              viewBox="0 0 512.001 512.001"
            >
              <path
                d="M271.029 0c-33.091 0-61 27.909-61 61s27.909 61 61 61 60-27.909 60-61-26.909-61-60-61zm66.592 122c-16.485 18.279-40.096 30-66.592 30-26.496 0-51.107-11.721-67.592-30-14.392 15.959-23.408 36.866-23.408 60v15c0 8.291 6.709 15 15 15h151c8.291 0 15-6.709 15-15v-15c0-23.134-9.016-44.041-23.408-60zM144.946 460.404 68.505 307.149c-7.381-14.799-25.345-20.834-40.162-13.493l-19.979 9.897c-7.439 3.689-10.466 12.73-6.753 20.156l90 180c3.701 7.423 12.704 10.377 20.083 6.738l19.722-9.771c14.875-7.368 20.938-25.417 13.53-40.272zM499.73 247.7c-12.301-9-29.401-7.2-39.6 3.9l-82 100.8c-5.7 6-16.5 9.6-22.2 9.6h-69.901c-8.401 0-15-6.599-15-15s6.599-15 15-15h60c16.5 0 30-13.5 30-30s-13.5-30-30-30h-78.6c-7.476 0-11.204-4.741-17.1-9.901-23.209-20.885-57.949-30.947-93.119-22.795-19.528 4.526-32.697 12.415-46.053 22.993l-.445-.361-21.696 19.094L174.28 452h171.749c28.2 0 55.201-13.5 72.001-36l87.999-126c9.9-13.201 7.2-32.399-6.299-42.3z"
                data-original="#000000"
              />
            </svg>
            <div>
              <h3 className="text-gray-800 text-xl font-semibold mb-3">
                Service Client
              </h3>
              <p className="text-gray-600 text-sm">
                Nous nous engageons à offrir un service client personnalisé et
                exceptionnel{" "}
              </p>
            </div>
          </div>

          <div className="p-4 flex gap-6 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-12 h-12 bg-blue-100 p-3 rounded-lg shrink-0"
              viewBox="0 0 24 24"
            >
              <g fillRule="evenodd" clipRule="evenodd">
                <path
                  d="M17.03 8.97a.75.75 0 0 1 0 1.06l-4.2 4.2a.75.75 0 0 1-1.154-.114l-1.093-1.639L8.03 15.03a.75.75 0 0 1-1.06-1.06l3.2-3.2a.75.75 0 0 1 1.154.114l1.093 1.639L15.97 8.97a.75.75 0 0 1 1.06 0z"
                  data-original="#000000"
                />
                <path
                  d="M13.75 9.5a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-1.25H14.5a.75.75 0 0 1-.75-.75z"
                  data-original="#000000"
                />
                <path
                  d="M3.095 3.095C4.429 1.76 6.426 1.25 9 1.25h6c2.574 0 4.57.51 5.905 1.845C22.24 4.429 22.75 6.426 22.75 9v6c0 2.574-.51 4.57-1.845 5.905C19.571 22.24 17.574 22.75 15 22.75H9c-2.574 0-4.57-.51-5.905-1.845C1.76 19.571 1.25 17.574 1.25 15V9c0-2.574.51-4.57 1.845-5.905zm1.06 1.06C3.24 5.071 2.75 6.574 2.75 9v6c0 2.426.49 3.93 1.405 4.845.916.915 2.419 1.405 4.845 1.405h6c2.426 0 3.93-.49 4.845-1.405.915-.916 1.405-2.419 1.405-4.845V9c0-2.426-.49-3.93-1.405-4.845C18.929 3.24 17.426 2.75 15 2.75H9c-2.426 0-3.93.49-4.845 1.405z"
                  data-original="#000000"
                />
              </g>
            </svg>
            <div>
              <h3 className="text-gray-800 text-xl font-semibold mb-3">
                High Quality
              </h3>
              <p className="text-gray-600 text-sm">
                Nous ne transigeons jamais sur la qualité de nos produits.
              </p>
            </div>
          </div>

          <div className="p-4 flex gap-6 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-12 h-12 bg-blue-100 p-3 rounded-lg shrink-0"
              viewBox="0 0 504.69 504.69"
            >
              <path
                d="M252.343 262.673c-49.32 0-89.447-40.127-89.447-89.447s40.127-89.447 89.447-89.447 89.447 40.127 89.447 89.447-40.121 89.447-89.447 89.447zm0-158.235c-37.926 0-68.787 30.861-68.787 68.787s30.861 68.787 68.787 68.787 68.787-30.861 68.787-68.787-30.855-68.787-68.787-68.787z"
                data-original="#000000"
              />
              <path
                d="M391.787 405.309c-5.645 0-10.253-4.54-10.325-10.201-.883-70.306-58.819-127.503-129.15-127.503-49.264 0-93.543 27.405-115.561 71.52-8.724 17.473-13.269 36.31-13.517 55.988-.072 5.702-4.757 10.273-10.459 10.201s-10.273-4.757-10.201-10.459c.289-22.814 5.568-44.667 15.691-64.955 25.541-51.164 76.907-82.95 134.047-82.95 81.581 0 148.788 66.349 149.81 147.905.072 5.702-4.494 10.392-10.201 10.459-.046-.005-.087-.005-.134-.005z"
                data-original="#000000"
              />
              <path
                d="M252.343 463.751c-116.569 0-211.408-94.834-211.408-211.408 0-116.569 94.839-211.408 211.408-211.408 116.574 0 211.408 94.839 211.408 211.408 0 116.574-94.834 211.408-211.408 211.408zm0-402.156c-105.18 0-190.748 85.568-190.748 190.748s85.568 190.748 190.748 190.748 190.748-85.568 190.748-190.748S357.523 61.595 252.343 61.595zM71.827 90.07 14.356 32.599c-4.034-4.034-4.034-10.573 0-14.607 4.029-4.034 10.573-4.034 14.607 0l57.466 57.471c4.034 4.034 3.951 10.49 0 14.607-3.792 3.951-11.039 3.698-14.602 0z"
                data-original="#000000"
              />
              <path
                d="M14.717 92.254a10.332 10.332 0 0 1-10.299-9.653L.023 15.751a10.317 10.317 0 0 1 2.929-7.908 10.2 10.2 0 0 1 7.851-3.089L77.56 7.796c5.697.258 10.108 5.093 9.85 10.79s-5.041 10.154-10.79 9.85l-55.224-2.521 3.641 55.327c.377 5.692-3.936 10.614-9.628 10.986a7.745 7.745 0 0 1-.692.026zm403.541-2.184c-4.256-3.796-4.034-10.573 0-14.607l58.116-58.116c4.034-4.034 10.573-4.034 14.607 0s4.034 10.573 0 14.607L432.864 90.07c-4.085 3.951-9.338 4.7-14.606 0z"
                data-original="#000000"
              />
              <path
                d="M489.974 92.254a9.85 9.85 0 0 1-.687-.021c-5.697-.372-10.01-5.294-9.633-10.986l3.641-55.327-55.224 2.515c-5.511.238-10.526-4.147-10.79-9.85-.258-5.702 4.153-10.531 9.85-10.79l66.757-3.042c2.934-.134 5.79.992 7.851 3.089s3.12 4.974 2.929 7.908l-4.401 66.85c-.361 5.465-4.896 9.654-10.293 9.654zM11.711 489.339c-3.791-4.266-4.034-10.573 0-14.607l60.115-60.11c4.029-4.034 10.578-4.034 14.607 0 4.034 4.034 4.034 10.573 0 14.607l-60.115 60.11c-3.827 3.884-11.156 3.884-14.607 0z"
                data-original="#000000"
              />
              <path
                d="M10.327 499.947a10.33 10.33 0 0 1-7.376-3.104 10.312 10.312 0 0 1-2.929-7.902l4.401-66.85c.372-5.697 5.191-10.036 10.986-9.633 5.692.377 10.005 5.294 9.628 10.986l-3.641 55.332 55.224-2.515c5.645-.191 10.531 4.153 10.79 9.85.258 5.697-4.153 10.526-9.85 10.79l-66.763 3.037c-.155.004-.31.009-.47.009zm465.639-13.01-57.708-57.708c-4.034-4.034-4.034-10.573 0-14.607s10.573-4.034 14.607 0l57.708 57.708c4.034 4.034 3.962 10.5 0 14.607-3.817 3.951-10.062 3.951-14.607 0z"
                data-original="#000000"
              />
              <path
                d="M494.359 499.947c-.155 0-.315-.005-.47-.01l-66.757-3.042c-5.702-.263-10.108-5.088-9.85-10.79.263-5.702 5.113-9.984 10.79-9.85l55.219 2.515-3.641-55.332c-.372-5.692 3.941-10.609 9.633-10.986 5.625-.398 10.609 3.946 10.986 9.633l4.401 66.85a10.33 10.33 0 0 1-2.929 7.902 10.323 10.323 0 0 1-7.382 3.11z"
                data-original="#000000"
              />
            </svg>
            <div>
              <h3 className="text-gray-800 text-xl font-semibold mb-3">
                Innovation{" "}
              </h3>
              <p className="text-gray-600 text-sm">
                Nous restons à l&#39;affût des dernières innovations pour
                proposer des produits toujours plus performants{" "}
              </p>
            </div>
          </div>

          <div className="p-4 flex gap-6 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-12 h-12 bg-blue-100 p-3 rounded-lg shrink-0"
              viewBox="0 0 682.667 682.667"
            >
              <defs>
                <clipPath id="a" clipPathUnits="userSpaceOnUse">
                  <path d="M0 512h512V0H0Z" data-original="#000000" />
                </clipPath>
              </defs>
              <g
                fill="none"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeWidth="30"
                clipPath="url(#a)"
                transform="matrix(1.33 0 0 -1.33 0 682.667)"
              >
                <path
                  d="M226 15v60c0 16.568-13.432 30-30 30H76c-16.568 0-30-13.432-30-30V15Zm-45 165c0-24.853-20.147-45-45-45s-45 20.147-45 45 20.147 45 45 45 45-20.147 45-45ZM466 15v60c0 16.568-13.432 30-30 30H316c-16.568 0-30-13.432-30-30V15Zm-45 165c0-24.853-20.147-45-45-45s-45 20.147-45 45 20.147 45 45 45 45-20.147 45-45Zm-75 167v-50.294L286 347h-60.002L166 296.706V347h-15c-41.421 0-75 33.579-75 75s33.579 75 75 75h210c41.421 0 75-33.579 75-75s-33.579-75-75-75Zm-105 75h30m-90 0h30m90 0h30"
                  data-original="#000000"
                />
              </g>
            </svg>
            <div>
              <h3 className="text-gray-800 text-xl font-semibold mb-3">
                Communication
              </h3>
              <p className="text-gray-600 text-sm">
                Adaptez notre produit à vos besoins, avec une communication
                fluide pour votre équipe.
              </p>
            </div>
          </div>

          <div className="p-4 flex gap-6 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-12 h-12 bg-blue-100 p-3 rounded-lg shrink-0"
              viewBox="0 0 682.667 682.667"
            >
              <defs>
                <clipPath id="a" clipPathUnits="userSpaceOnUse">
                  <path d="M0 512h512V0H0Z" data-original="#000000" />
                </clipPath>
              </defs>
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="40"
                clipPath="url(#a)"
                transform="matrix(1.33 0 0 -1.33 0 682.667)"
              >
                <path
                  d="M256 492 60 410.623v-98.925C60 183.674 137.469 68.38 256 20c118.53 48.38 196 163.674 196 291.698v98.925z"
                  data-original="#000000"
                />
                <path
                  d="M178 271.894 233.894 216 334 316.105"
                  data-original="#000000"
                />
              </g>
            </svg>
            <div>
              <h3 className="text-gray-800 text-xl font-semibold mb-3">
                Fiabilité
              </h3>
              <p className="text-gray-600 text-sm">
                Nos équipements de protection individuelle (EPI) respectent les
                normes de sécurité, offrant une protection durable dans des
                environnements exigeants.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      {/**travailleur */}
      <TravailleurGrid />
      {/**produits plus views */}
      <ProduitsPlusView />
      {/**category grid */}
      <CategoriesGrid />
      {/**4 nember */}
      <div
        className="font-sans tracking-wide bg-[#1B5085] py-10 px-10"
        ref={refNumber}
      >
        <ul className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-8">
          <li style={{ textAlign: "center" }}>
            <h3 className="text-[#FFA726] font-semibold text-5xl">
              <IncrementingNumber target={15} startCounting={startCounting} />+
            </h3>
            <p className="text-gray-300 text-sm mt-2">
              Années d&#39;expérience
            </p>
          </li>
          <li style={{ textAlign: "center" }}>
            <h3 className="text-[#FFA726] font-semibold text-5xl">
              <IncrementingNumber target={99} startCounting={startCounting} />%
            </h3>
            <p className="text-gray-300 text-sm mt-2">Clients satisfaits</p>
          </li>
          <li style={{ textAlign: "center" }}>
            <h3 className="text-[#FFA726] font-semibold text-5xl">
              <IncrementingNumber target={5000} startCounting={startCounting} />
              +
            </h3>
            <p className="text-gray-300 text-sm mt-2">Produits livrés</p>
          </li>
          <li style={{ textAlign: "center" }}>
            <h3 className="text-[#FFA726] font-semibold text-5xl">
              <IncrementingNumber target={25} startCounting={startCounting} />+
            </h3>
            <p className="text-gray-300 text-sm mt-2">
              Spécialistes dans l&#39;équipe
            </p>
          </li>
        </ul>
      </div>
      {/**contact us */}
      <div
        id="contact"
        className="font-[sans-serif] max-w-6xl mx-auto relative bg-white rounded-lg py-6 overflow-hidden"
      >
        <div className="grid lg:grid-cols-3 items-center">
          <motion.div
            ref={ref3}
            initial={{ x: -100 }}
            animate={isInView3 ? { x: 0 } : {}}
            transition={{ duration: 1.5 }}
            className="grid sm:grid-cols-2 gap-4 z-20 relative lg:left-16 max-lg:px-4"
          >
            <div className="flex flex-col items-center justify-center rounded-lg w-full h-44 p-4 text-center bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 fill-blue-600"
                viewBox="0 0 512 512"
              >
                <path
                  d="M341.476 338.285c54.483-85.493 47.634-74.827 49.204-77.056C410.516 233.251 421 200.322 421 166 421 74.98 347.139 0 256 0 165.158 0 91 74.832 91 166c0 34.3 10.704 68.091 31.19 96.446l48.332 75.84C118.847 346.227 31 369.892 31 422c0 18.995 12.398 46.065 71.462 67.159C143.704 503.888 198.231 512 256 512c108.025 0 225-30.472 225-90 0-52.117-87.744-75.757-139.524-83.715zm-194.227-92.34a15.57 15.57 0 0 0-.517-.758C129.685 221.735 121 193.941 121 166c0-75.018 60.406-136 135-136 74.439 0 135 61.009 135 136 0 27.986-8.521 54.837-24.646 77.671-1.445 1.906 6.094-9.806-110.354 172.918L147.249 245.945zM256 482c-117.994 0-195-34.683-195-60 0-17.016 39.568-44.995 127.248-55.901l55.102 86.463a14.998 14.998 0 0 0 25.298 0l55.101-86.463C411.431 377.005 451 404.984 451 422c0 25.102-76.313 60-195 60z"
                  data-original="#000000"
                ></path>
                <path
                  d="M256 91c-41.355 0-75 33.645-75 75s33.645 75 75 75 75-33.645 75-75-33.645-75-75-75zm0 120c-24.813 0-45-20.187-45-45s20.187-45 45-45 45 20.187 45 45-20.187 45-45 45z"
                  data-original="#000000"
                ></path>
              </svg>
              <h4 className="text-gray-800 text-base font-bold mt-4">
                Visiter le bureau
              </h4>
              <p className="text-sm text-gray-600 mt-2">
                51 Rue al khalil, Casablanca 20000, Casablanca
              </p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg w-full h-44 p-4 text-center bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 fill-blue-600"
                viewBox="0 0 473.806 473.806"
              >
                <path
                  d="M374.456 293.506c-9.7-10.1-21.4-15.5-33.8-15.5-12.3 0-24.1 5.3-34.2 15.4l-31.6 31.5c-2.6-1.4-5.2-2.7-7.7-4-3.6-1.8-7-3.5-9.9-5.3-29.6-18.8-56.5-43.3-82.3-75-12.5-15.8-20.9-29.1-27-42.6 8.2-7.5 15.8-15.3 23.2-22.8 2.8-2.8 5.6-5.7 8.4-8.5 21-21 21-48.2 0-69.2l-27.3-27.3c-3.1-3.1-6.3-6.3-9.3-9.5-6-6.2-12.3-12.6-18.8-18.6-9.7-9.6-21.3-14.7-33.5-14.7s-24 5.1-34 14.7l-.2.2-34 34.3c-12.8 12.8-20.1 28.4-21.7 46.5-2.4 29.2 6.2 56.4 12.8 74.2 16.2 43.7 40.4 84.2 76.5 127.6 43.8 52.3 96.5 93.6 156.7 122.7 23 10.9 53.7 23.8 88 26 2.1.1 4.3.2 6.3.2 23.1 0 42.5-8.3 57.7-24.8.1-.2.3-.3.4-.5 5.2-6.3 11.2-12 17.5-18.1 4.3-4.1 8.7-8.4 13-12.9 9.9-10.3 15.1-22.3 15.1-34.6 0-12.4-5.3-24.3-15.4-34.3l-54.9-55.1zm35.8 105.3c-.1 0-.1.1 0 0-3.9 4.2-7.9 8-12.2 12.2-6.5 6.2-13.1 12.7-19.3 20-10.1 10.8-22 15.9-37.6 15.9-1.5 0-3.1 0-4.6-.1-29.7-1.9-57.3-13.5-78-23.4-56.6-27.4-106.3-66.3-147.6-115.6-34.1-41.1-56.9-79.1-72-119.9-9.3-24.9-12.7-44.3-11.2-62.6 1-11.7 5.5-21.4 13.8-29.7l34.1-34.1c4.9-4.6 10.1-7.1 15.2-7.1 6.3 0 11.4 3.8 14.6 7l.3.3c6.1 5.7 11.9 11.6 18 17.9 3.1 3.2 6.3 6.4 9.5 9.7l27.3 27.3c10.6 10.6 10.6 20.4 0 31-2.9 2.9-5.7 5.8-8.6 8.6-8.4 8.6-16.4 16.6-25.1 24.4-.2.2-.4.3-.5.5-8.6 8.6-7 17-5.2 22.7l.3.9c7.1 17.2 17.1 33.4 32.3 52.7l.1.1c27.6 34 56.7 60.5 88.8 80.8 4.1 2.6 8.3 4.7 12.3 6.7 3.6 1.8 7 3.5 9.9 5.3.4.2.8.5 1.2.7 3.4 1.7 6.6 2.5 9.9 2.5 8.3 0 13.5-5.2 15.2-6.9l34.2-34.2c3.4-3.4 8.8-7.5 15.1-7.5 6.2 0 11.3 3.9 14.4 7.3l.2.2 55.1 55.1c10.3 10.2 10.3 20.7.1 31.3zm-154.2-286.1c26.2 4.4 50 16.8 69 35.8s31.3 42.8 35.8 69c1.1 6.6 6.8 11.2 13.3 11.2.8 0 1.5-.1 2.3-.2 7.4-1.2 12.3-8.2 11.1-15.6-5.4-31.7-20.4-60.6-43.3-83.5s-51.8-37.9-83.5-43.3c-7.4-1.2-14.3 3.7-15.6 11s3.5 14.4 10.9 15.6zm217.2 96.3c-8.9-52.2-33.5-99.7-71.3-137.5s-85.3-62.4-137.5-71.3c-7.3-1.3-14.2 3.7-15.5 11-1.2 7.4 3.7 14.3 11.1 15.6 46.6 7.9 89.1 30 122.9 63.7 33.8 33.8 55.8 76.3 63.7 122.9 1.1 6.6 6.8 11.2 13.3 11.2.8 0 1.5-.1 2.3-.2 7.3-1.1 12.3-8.1 11-15.4z"
                  data-original="#000000"
                ></path>
              </svg>
              <h4 className="text-gray-800 text-base font-bold mt-4">
                Appelez-nous
              </h4>
              <p className="text-sm text-gray-600 mt-2">
                05 22 62 73 50 <br /> 06 62 07 33 17
              </p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg w-full h-44 p-4 text-center bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 fill-blue-600"
                viewBox="0 0 32 32"
              >
                <path
                  d="M8 30a1.001 1.001 0 0 1-1-1v-5H4c-1.654 0-3-1.346-3-3V5c0-1.654 1.346-3 3-3h24c1.654 0 3 1.346 3 3v16c0 1.654-1.346 3-3 3H15.851l-7.226 5.781A.998.998 0 0 1 8 30zM4 4c-.552 0-1 .449-1 1v16c0 .551.448 1 1 1h4a1 1 0 0 1 1 1v3.92l5.875-4.701A1 1 0 0 1 15.5 22H28c.552 0 1-.449 1-1V5c0-.551-.448-1-1-1z"
                  data-original="#000000"
                ></path>
                <path
                  d="M24 12H8a1 1 0 1 1 0-2h16a1 1 0 1 1 0 2zm-8 4H8a1 1 0 1 1 0-2h8a1 1 0 1 1 0 2z"
                  data-original="#000000"
                ></path>
              </svg>
              <h4 className="text-gray-800 text-base font-bold mt-4">
                Discutez avec nous
              </h4>
              <p className="text-sm text-gray-600 mt-2">
                istas.maroc@gmail.com
              </p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg w-full h-44 p-4 text-center bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 fill-blue-600"
                viewBox="0 0 100 100"
              >
                <path
                  d="M83 23h-3V11c0-3.309-2.692-6-6-6H26c-3.308 0-6 2.691-6 6v12h-3C8.729 23 2 29.729 2 38v30c0 4.963 4.037 9 9 9h9v12c0 3.309 2.692 6 6 6h48c3.308 0 6-2.691 6-6V77h9c4.963 0 9-4.037 9-9V38c0-8.271-6.729-15-15-15zM26 11h48v12H26zm0 78V59h48v30zm66-21c0 1.654-1.345 3-3 3h-9V59h3a3 3 0 1 0 0-6H17a3 3 0 1 0 0 6h3v12h-9c-1.655 0-3-1.346-3-3V38c0-4.963 4.037-9 9-9h66c4.963 0 9 4.037 9 9zm-27 0a3 3 0 0 1-3 3H38a3 3 0 1 1 0-6h24a3 3 0 0 1 3 3zm0 12a3 3 0 0 1-3 3H38a3 3 0 1 1 0-6h24a3 3 0 0 1 3 3zm21-42a3 3 0 0 1-3 3h-6a3 3 0 1 1 0-6h6a3 3 0 0 1 3 3z"
                  data-original="#000000"
                ></path>
              </svg>
              <h4 className="text-gray-800 text-base font-bold mt-4">Fax</h4>
              <p className="text-sm text-gray-600 mt-2">05 22 63 77 05</p>
            </div>
          </motion.div>

          <motion.div
            ref={ref7}
            initial={{ x: 100 }}
            animate={isInView7 ? { x: 0 } : {}}
            transition={{ duration: 1.5 }}
            className="lg:col-span-2 bg-[#1B5085] rounded-lg sm:p-10 p-4 z-10 max-lg:-order-1 max-lg:mb-8"
          >
            <h2 className="text-3xl text-white text-center font-bold mb-6">
              Contactez-nous
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="max-w-md mx-auto space-y-3">
                <input
                  type="text"
                  placeholder="Nom"
                  className="w-full bg-gray-100 rounded-lg py-3 px-6 text-sm outline-none"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-gray-100 rounded-lg py-3 px-6 text-sm outline-none"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
                <input
                  type="text"
                  placeholder="object"
                  className="w-full bg-gray-100 rounded-lg py-3 px-6 text-sm outline-none"
                  onChange={(e) => {
                    setObject(e.target.value);
                  }}
                  value={object}
                />
                <textarea
                  placeholder="Message"
                  rows="6"
                  className="w-full bg-gray-100 rounded-lg px-6 text-sm pt-3 outline-none"
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  value={message}
                ></textarea>
                <button
                  type="submit"
                  className="text-gray-800 w-full relative bg-[#EE902F] hover:bg-yellow-500 font-semibold rounded-lg text-sm px-6 py-3 !mt-6"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16px"
                    height="16px"
                    fill="currentColor"
                    className="mr-2 inline"
                    viewBox="0 0 548.244 548.244"
                  >
                    <path
                      fillRule="evenodd"
                      d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z"
                      clipRule="evenodd"
                      data-original="#000000"
                    />
                  </svg>
                  Envoyer un message
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
      {/**call to action */}
      <motion.div
        ref={ref8}
        initial={{ opacity: 0, y: 140 }}
        animate={isInView8 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.5 }}
        className="max-w-6xl mx-auto flex md:items-center m-10 max-md:flex-col bg-[#1B5085] px-8 py-4 min-h-[100px] rounded-xl shadow-xl font-[sans-serif]"
      >
        <p className="text-white text-base flex-1">
          Rejoignez-nous sur notre site pour vous inscrire et acheter, avec la
          possibilité de personnaliser nos produits selon vos besoins...
        </p>
        <div className="max-md:mt-6">
          <Link to={"/register"}>
            <button
              type="button"
              className="bg-white text-blue-500 font-semibold py-3 px-6 rounded text-sm hover:bg-slate-100 md:ml-6"
            >
              Commencer
            </button>
          </Link>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default LandingPage;
