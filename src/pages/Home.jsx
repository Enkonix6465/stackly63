/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import BmiCalculator from "../components/BmiCalculator";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollAnimation from "../components/ScrollAnimation";
import { ThemeDebug } from "../components/theme-debug";
import { getCurrentUser, isAuthenticated } from "../utils/auth";

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const user = getCurrentUser();

  const [isDark, setIsDark] = useState(false);
  const [, setServicesSectionVisible] = useState(false);
  const servicesSectionRef = useRef(null);
  const [openService, setOpenService] = useState("body-balance");

  const toggleService = (serviceId) => {
    setOpenService(openService === serviceId ? null : serviceId);
  };

  useEffect(() => {
    const checkDark = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // Intersection Observer for Services section animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setServicesSectionVisible(true);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: "0px 0px -50px 0px", // Start animation slightly before section is fully visible
      }
    );

    if (servicesSectionRef.current) {
      observer.observe(servicesSectionRef.current);
    }

    return () => {
      if (servicesSectionRef.current) {
        observer.unobserve(servicesSectionRef.current);
      }
    };
  }, []);

  return (
    <div className="text-black transition-colors bg-white dark:bg-gray-900 dark:text-white">
      <Navbar user={user} />
      <ThemeDebug />

      {/* 1 Showcase */}
      <section
        id="showcase"
        className="relative flex items-center justify-center h-screen overflow-hidden text-center"
      >
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 object-cover w-full h-full"
        >
          <source src="/63Home1.mp4" type="video/mp4" />
          {t("common.videoNotSupported")}
        </video>

        {/* Overlay (darken video for readability) */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl px-6">
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
            <h1 className="text-4xl font-extrabold leading-tight text-white whitespace-nowrap">
              {t("home.showcase.title")}
            </h1>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
            <p className="max-w-3xl mx-auto mt-6 text-xl text-white/80 whitespace-nowrap">
              {t("home.showcase.subtitle")}
            </p>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
            <div className="flex justify-center gap-4 mt-8">
              {/* Primary Button */}
              <a
                href="/services"
                className="inline-flex items-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 rounded-lg shadow-lg btn-animate-strong hover:shadow-xl"
                style={{ backgroundColor: "#4CAF50" }}
              >
                {t("home.showcase.exploreButton")}
              </a>

              {/* Secondary Button */}
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 text-lg font-bold text-green-600 transition-all duration-300 bg-white border-2 border-green-500 rounded-lg shadow-lg btn-animate-strong hover:bg-green-500 hover:text-white hover:shadow-xl"
              >
                {t("home.showcase.reachOutButton")}
              </a>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Welcome Section - Health & Wellness Data */}
      <section
        id="welcome"
        className={`relative overflow-hidden ${
          isDark
            ? "bg-gradient-to-br from-emerald-900 via-teal-900 to-green-900 text-white"
            : "bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 text-gray-900"
        } border-t transition-colors duration-300`}
      >
        <div className="relative z-10 px-4 py-24 mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <h2
                className={`text-4xl font-extrabold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {t("home.welcome.title")}
              </h2>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
              <p
                className={`text-gray-700 max-w-2xl mx-auto whitespace-nowrap ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {t("home.welcome.subtitle")}
              </p>
            </ScrollAnimation>
          </div>

          {/* Health & Wellness Statistics */}
          <div className="grid gap-8 mb-16 md:grid-cols-2 lg:grid-cols-4">
            {/* Stat 1 - Active Members */}
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-4">
              <div
                className={`text-center p-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border ${
                  isDark
                    ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex justify-center mb-4">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      isDark ? "bg-green-500/20" : "bg-green-100"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={32}
                      height={32}
                      viewBox="0 0 16 16"
                    >
                      <g fill="none">
                        <path
                          fill="url(#SVGQMsqbeLV)"
                          d="M10.99 7.714a1.5 1.5 0 0 0-1.838 1.061l-.388 1.449a3 3 0 1 0 5.796 1.553l.388-1.45a1.5 1.5 0 0 0-1.06-1.836z"
                        ></path>
                        <path
                          fill="url(#SVGswmSBcsj)"
                          d="M5.01 7.714a1.5 1.5 0 0 1 1.837 1.061l.388 1.449a3 3 0 1 1-5.795 1.553l-.389-1.45a1.5 1.5 0 0 1 1.061-1.836z"
                        ></path>
                        <path
                          fill="url(#SVG4tHA7cJC)"
                          d="M6.5 7A1.5 1.5 0 0 0 5 8.5V11a3 3 0 1 0 6 0V8.5A1.5 1.5 0 0 0 9.5 7z"
                        ></path>
                        <path
                          fill="url(#SVGT456idhF)"
                          d="M8 1a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5"
                        ></path>
                        <path
                          fill="url(#SVGK07hbcHv)"
                          d="M3 3a2 2 0 1 0 0 4a2 2 0 0 0 0-4"
                        ></path>
                        <path
                          fill="url(#SVGe1BkJcGN)"
                          d="M13 3a2 2 0 1 0 0 4a2 2 0 0 0 0-4"
                        ></path>
                        <defs>
                          <radialGradient
                            id="SVGQMsqbeLV"
                            cx={0}
                            cy={0}
                            r={1}
                            gradientTransform="rotate(78.837 -.336 11.297)scale(4.64914)"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#0078d4"></stop>
                            <stop offset={1} stopColor="#004695"></stop>
                          </radialGradient>
                          <radialGradient
                            id="SVGswmSBcsj"
                            cx={0}
                            cy={0}
                            r={1}
                            gradientTransform="matrix(3.34115 6.04144 -4.34865 2.40497 2.553 7.96)"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#008ce2"></stop>
                            <stop offset={1} stopColor="#0068c6"></stop>
                          </radialGradient>
                          <radialGradient
                            id="SVG4tHA7cJC"
                            cx={0}
                            cy={0}
                            r={1}
                            gradientTransform="rotate(63.608 -3.915 10.713)scale(4.22417 3.87907)"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset={0.339} stopColor="#3dcbff"></stop>
                            <stop offset={1} stopColor="#14b1ff"></stop>
                          </radialGradient>
                          <radialGradient
                            id="SVGT456idhF"
                            cx={0}
                            cy={0}
                            r={1}
                            gradientTransform="rotate(59.931 1.37 7.898)scale(3.12306)"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset={0.339} stopColor="#3dcbff"></stop>
                            <stop offset={1} stopColor="#14b1ff"></stop>
                          </radialGradient>
                          <radialGradient
                            id="SVGK07hbcHv"
                            cx={0}
                            cy={0}
                            r={1}
                            gradientTransform="rotate(47.573 -3.7 4.554)scale(3.27979)"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#008ce2"></stop>
                            <stop offset={1} stopColor="#0068c6"></stop>
                          </radialGradient>
                          <radialGradient
                            id="SVGe1BkJcGN"
                            cx={0}
                            cy={0}
                            r={1}
                            gradientTransform="rotate(78.837 3.672 9.578)scale(2.93403)"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#0078d4"></stop>
                            <stop offset={1} stopColor="#004695"></stop>
                          </radialGradient>
                        </defs>
                      </g>
                    </svg>
                  </div>
                </div>
                <h3
                  className={`text-3xl font-bold mb-2 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  15,000+
                </h3>
                <p
                  className={`text-sm font-medium ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {t("home.welcome.stats.activeMembers")}
                </p>
              </div>
            </ScrollAnimation>

            {/* Stat 2 - Success Rate */}
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-5">
              <div
                className={`text-center p-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border ${
                  isDark
                    ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex justify-center mb-4">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      isDark ? "bg-green-500/20" : "bg-green-100"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={32}
                      height={32}
                      viewBox="0 0 48 48"
                    >
                      <g fill="none" strokeLinejoin="round" strokeWidth={4}>
                        <path
                          fill="#2f88ff"
                          stroke="#000"
                          d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z"
                        ></path>
                        <path
                          stroke="#fff"
                          strokeLinecap="round"
                          d="M16 24L22 30L34 18"
                        ></path>
                      </g>
                    </svg>
                  </div>
                </div>
                <h3
                  className={`text-3xl font-bold mb-2 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  94%
                </h3>
                <p
                  className={`text-sm font-medium ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {t("home.welcome.stats.successRate")}
                </p>
              </div>
            </ScrollAnimation>

            {/* Stat 3 - Years Experience */}
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-6">
              <div
                className={`text-center p-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border ${
                  isDark
                    ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex justify-center mb-4">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      isDark ? "bg-green-500/20" : "bg-green-100"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={32}
                      height={32}
                      viewBox="0 0 24 24"
                    >
                      <g fill="none">
                        <path
                          fill="#66e1ff"
                          d="m4.355 14.38l-3.122 5.39a.492.492 0 0 0 .508.733l2.757-.467l.96 2.638a.492.492 0 0 0 .887.084l2.681-4.537"
                        ></path>
                        <path
                          stroke="#191919"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.355 14.38l-3.122 5.39a.492.492 0 0 0 .508.733l2.757-.467l.96 2.638a.492.492 0 0 0 .887.084l2.681-4.537"
                          strokeWidth={1}
                        ></path>
                        <path
                          fill="#66e1ff"
                          d="m19.645 14.38l3.122 5.391a.493.493 0 0 1-.508.733l-2.757-.467l-.96 2.638a.492.492 0 0 1-.887.084l-2.681-4.537"
                        ></path>
                        <path
                          stroke="#191919"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m19.645 14.38l3.122 5.391a.493.493 0 0 1-.508.733l-2.757-.467l-.96 2.638a.492.492 0 0 1-.887.084l-2.681-4.537"
                          strokeWidth={1}
                        ></path>
                        <path
                          fill="#ffef5e"
                          d="M11.984 18.726a8.863 8.863 0 1 0 0-17.726a8.863 8.863 0 0 0 0 17.726"
                        ></path>
                        <path
                          fill="#fff9bf"
                          d="M5.717 16.13A8.863 8.863 0 1 1 18.252 3.596z"
                        ></path>
                        <path
                          stroke="#191919"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.984 18.726a8.863 8.863 0 1 0 0-17.726a8.863 8.863 0 0 0 0 17.726"
                          strokeWidth={1}
                        ></path>
                        <path
                          fill="#fff"
                          stroke="#191919"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m12.562 5.293l1.263 2.604h2.461a.604.604 0 0 1 .421 1.05l-2.133 2.103l1.182 2.719a.643.643 0 0 1-.917.806l-2.856-1.61l-2.856 1.61a.644.644 0 0 1-.917-.806l1.182-2.72l-2.133-2.102a.603.603 0 0 1 .422-1.052h2.462l1.265-2.602a.652.652 0 0 1 1.154 0"
                          strokeWidth={1}
                        ></path>
                      </g>
                    </svg>
                  </div>
                </div>
                <h3
                  className={`text-3xl font-bold mb-2 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  12+
                </h3>
                <p
                  className={`text-sm font-medium ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {t("home.welcome.stats.yearsExperience")}
                </p>
              </div>
            </ScrollAnimation>

            {/* Stat 4 - Wellness Programs */}
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-7">
              <div
                className={`text-center p-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border ${
                  isDark
                    ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex justify-center mb-4">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      isDark ? "bg-green-500/20" : "bg-green-100"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={32}
                      height={32}
                      viewBox="0 0 32 32"
                    >
                      <g fill="none">
                        <path
                          fill="#f8312f"
                          d="M6 6c4.665-2.332 8.5.5 10 2.5c1.5-2 5.335-4.832 10-2.5c6 3 4.5 10.5 0 15c-2.196 2.196-6.063 6.063-8.891 8.214a1.764 1.764 0 0 1-2.186-.041C12.33 27.08 8.165 23.165 6 21C1.5 16.5 0 9 6 6"
                        ></path>
                        <path
                          fill="#ca0b4a"
                          d="M16 8.5v3.05c1.27-2.685 4.425-6.27 9.658-5.713c-4.51-2.03-8.195.712-9.658 2.663m-4.054-2.963C10.26 4.95 8.225 4.887 6 6C0 9 1.5 16.5 6 21c2.165 2.165 6.33 6.08 8.923 8.173a1.764 1.764 0 0 0 2.186.04q.381-.29.785-.618c-2.854-2.143-6.86-5.519-9.035-7.462c-4.957-4.431-6.61-11.815 0-14.769a9.7 9.7 0 0 1 3.087-.827"
                        ></path>
                        <ellipse
                          cx={23.477}
                          cy={12.594}
                          fill="#f37366"
                          rx={2.836}
                          ry={4.781}
                          transform="rotate(30 23.477 12.594)"
                        ></ellipse>
                      </g>
                    </svg>
                  </div>
                </div>
                <h3
                  className={`text-3xl font-bold mb-2 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  50+
                </h3>
                <p
                  className={`text-sm font-medium ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {t("home.welcome.stats.wellnessPrograms")}
                </p>
              </div>
            </ScrollAnimation>
          </div>

          
        </div>
      </section>

      {/* Our Services - Health & Wellness */}
      <section
        id="services"
        className={`${
          isDark
            ? "bg-gray-900 text-white border-gray-700"
            : "bg-white text-black border-black/10"
        } border-t transition-colors duration-300`}
      >
        <div className="max-w-6xl px-4 py-24 mx-auto">
          {/* Header */}
          <div className="mb-16 text-center">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <h2
                className={`text-4xl font-extrabold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {t("home.services.title")}
              </h2>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
              <p
                className={`text-gray-700 max-w-2xl mx-auto ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {t("home.services.subtitle")}
              </p>
            </ScrollAnimation>
          </div>

          {/* Services Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Balance Body & Mind */}
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-4">
              <div
                className={`text-center group ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                {/* Lotus Icon */}
                <div className="flex justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={64}
                    height={64}
                    viewBox="0 0 24 24"
                    className="transition-transform duration-300 group-hover:scale-110"
                  >
                    <g fill="none">
                      <path
                        fill="#66e1ff"
                        d="M21.937 10.614a1.435 1.435 0 0 0-1.758 1.013a1.396 1.396 0 0 1-1.483.85c-.836 0-2.25-1.345-2.997-2.983a1.44 1.44 0 0 0-1.307-.842H9.61a1.43 1.43 0 0 0-1.308.842c-.745 1.638-2.16 2.983-2.996 2.983a1.396 1.396 0 0 1-1.483-.85a1.436 1.436 0 1 0-2.774.745a4.28 4.28 0 0 0 4.257 2.975a4.17 4.17 0 0 0 3.348-1.435v4.077l-2.487-.68a1.435 1.435 0 1 0-.756 2.77l1.38.376a1.435 1.435 0 0 0 1.289 2.492l3.92-1.07l3.926 1.07a1.435 1.435 0 0 0 1.288-2.492l1.38-.377a1.435 1.435 0 0 0-.755-2.769l-2.491.68v-4.077a4.17 4.17 0 0 0 3.347 1.435a4.276 4.276 0 0 0 4.254-2.975a1.435 1.435 0 0 0-1.013-1.758"
                      ></path>
                      <path
                        fill="#c2f3ff"
                        d="M5.306 13.912c3.347 0 3.347-3.347 6.695-3.347c3.347 0 3.347 3.347 6.694 3.347c2.063 0 3.037-1.817 3.48-3.21a1.435 1.435 0 0 0-1.996.925a1.396 1.396 0 0 1-1.484.85c-.835 0-2.25-1.345-2.997-2.983a1.44 1.44 0 0 0-1.306-.842H9.609a1.43 1.43 0 0 0-1.308.842c-.745 1.638-2.16 2.984-2.995 2.984a1.396 1.396 0 0 1-1.484-.85a1.435 1.435 0 0 0-1.996-.926c.443 1.393 1.417 3.21 3.48 3.21"
                      ></path>
                      <path
                        fill="#ffdda1"
                        stroke="#191919"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12.002 6.739c2.208 0 3.589-2.391 2.484-4.304A2.87 2.87 0 0 0 12.001 1C9.794 1 8.413 3.392 9.518 5.304a2.87 2.87 0 0 0 2.485 1.435"
                        strokeWidth={1}
                      ></path>
                      <path
                        stroke="#191919"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.508 22.361c.342.512.973.748 1.567.586l3.922-1.07m.653-2.8l4.032 1.1a1.434 1.434 0 1 1-.754 2.768l-10.52-2.869a1.435 1.435 0 0 1 .76-2.767l2.491.68v-4.077a4.17 4.17 0 0 1-3.352 1.435a4.276 4.276 0 0 1-4.254-2.975a1.436 1.436 0 1 1 2.773-.745c.243.588.851.937 1.48.85c.837 0 2.251-1.345 2.998-2.983a1.44 1.44 0 0 1 1.307-.842h4.782a1.43 1.43 0 0 1 1.308.842c.747 1.638 2.162 2.983 2.997 2.983a1.396 1.396 0 0 0 1.484-.85a1.436 1.436 0 0 1 2.774.745a4.28 4.28 0 0 1-4.26 2.975a4.17 4.17 0 0 1-3.347-1.435v4.077l2.492-.68a1.435 1.435 0 0 1 1.293 2.487M8.653 12.478v1.434m6.696-1.434v1.434"
                        strokeWidth={1}
                      ></path>
                    </g>
                  </svg>
                </div>

                <h3
                  className={`text-xl font-bold mb-4 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {t("home.services.balanceBodyMind.title")}
                </h3>

                <p
                  className={`text-sm leading-relaxed ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {t("home.services.balanceBodyMind.description")}
                </p>
              </div>
            </ScrollAnimation>

            {/* Healthy Daily Life */}
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-5">
              <div
                className={`text-center group ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                {/* Heart with ECG Icon */}
                <div className="flex justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={64}
                    height={64}
                    viewBox="0 0 32 32"
                    className="transition-transform duration-300 group-hover:scale-110"
                  >
                    <g fill="none">
                      <path
                        fill="#f8312f"
                        d="M6 6c4.665-2.332 8.5.5 10 2.5c1.5-2 5.335-4.832 10-2.5c6 3 4.5 10.5 0 15c-2.196 2.196-6.063 6.063-8.891 8.214a1.764 1.764 0 0 1-2.186-.041C12.33 27.08 8.165 23.165 6 21C1.5 16.5 0 9 6 6"
                      ></path>
                      <path
                        fill="#ca0b4a"
                        d="M16 8.5v3.05c1.27-2.685 4.425-6.27 9.658-5.713c-4.51-2.03-8.195.712-9.658 2.663m-4.054-2.963C10.26 4.95 8.225 4.887 6 6C0 9 1.5 16.5 6 21c2.165 2.165 6.33 6.08 8.923 8.173a1.764 1.764 0 0 0 2.186.04q.381-.29.785-.618c-2.854-2.143-6.86-5.519-9.035-7.462c-4.957-4.431-6.61-11.815 0-14.769a9.7 9.7 0 0 1 3.087-.827"
                      ></path>
                      <ellipse
                        cx={23.477}
                        cy={12.594}
                        fill="#f37366"
                        rx={2.836}
                        ry={4.781}
                        transform="rotate(30 23.477 12.594)"
                      ></ellipse>
                    </g>
                  </svg>
                </div>

                <h3
                  className={`text-xl font-bold mb-4 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {t("home.services.healthyDailyLife.title")}
                </h3>

                <p
                  className={`text-sm leading-relaxed ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {t("home.services.healthyDailyLife.description")}
                </p>
              </div>
            </ScrollAnimation>

            {/* Nutrition Strategies */}
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-6">
              <div
                className={`text-center group ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                {/* Body Shape Icon */}
                <div className="flex justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={64}
                    height={64}
                    viewBox="0 0 64 64"
                    className="transition-transform duration-300 group-hover:scale-110"
                  >
                    <g fill="#f4ae7f">
                      <path d="M52.11 58.32c0 3.056-2.289 5.531-5.116 5.531H14.379c-2.824 0-5.114-2.476-5.114-5.531V8.447c0-3.059 2.291-5.534 5.114-5.534h32.615c2.827 0 5.116 2.475 5.116 5.534z"></path>
                      <path d="M30.899 10.509c0 .581-1.158 1.051-2.58 1.051H11.848c-1.426 0-2.582-.47-2.582-1.051v-9.46C9.266.47 10.421 0 11.848 0h16.471c1.422 0 2.58.47 2.58 1.049z"></path>
                    </g>
                    <path
                      fill="#d0d2d3"
                      d="M54.662 56c0 2.593-2.312 4.69-5.167 4.69H16.536c-2.851 0-5.167-2.098-5.167-4.69V13.73c0-2.591 2.316-4.69 5.167-4.69h32.959c2.855 0 5.167 2.1 5.167 4.69z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M54.662 52.694c0 2.593-2.312 4.69-5.167 4.69H16.536c-2.851 0-5.167-2.098-5.167-4.69v-42.27c0-2.591 2.316-4.688 5.167-4.688h32.959c2.855 0 5.167 2.098 5.167 4.688z"
                    ></path>
                    <path
                      fill="#d0d2d3"
                      d="M43.1 8.28c0 .312-1.538.566-3.43.566h-21.9c-1.896 0-3.434-.254-3.434-.566V3.185c0-.315 1.538-.566 3.434-.566h21.9c1.892 0 3.43.251 3.43.566z"
                    ></path>
                    <path
                      fill="#35494d"
                      d="M20.07 18.03h28.562c1.922 0 1.922-2.7 0-2.7H20.07c-1.915 0-1.915 2.7 0 2.7m0 5.485h28.562c1.922 0 1.922-2.698 0-2.698H20.07c-1.915 0-1.915 2.698 0 2.698m0 5.605h28.562c1.922 0 1.922-2.7 0-2.7H20.07c-1.915 0-1.915 2.7 0 2.7m0 5.48h28.562c1.922 0 1.922-2.698 0-2.698H20.07c-1.915 0-1.915 2.698 0 2.698m0 10.58h13.148c1.916 0 1.916-2.699 0-2.699H20.07c-1.915-.001-1.915 2.699 0 2.699"
                    ></path>
                  </svg>
                </div>

                <h3
                  className={`text-xl font-bold mb-4 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {t("home.services.nutritionStrategies.title")}
                </h3>

                <p
                  className={`text-sm leading-relaxed ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {t("home.services.nutritionStrategies.description")}
                </p>
              </div>
            </ScrollAnimation>

            {/* Workout Routines */}
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-7">
              <div
                className={`text-center group ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                {/* Dumbbell Icon */}
                <div className="flex justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={64}
                    height={64}
                    viewBox="0 0 24 24"
                    className="transition-transform duration-300 group-hover:scale-110"
                  >
                    <g fill="none">
                      <path
                        fill="#ffdda1"
                        d="M6.26 13.658a2.391 2.391 0 1 0 0-4.783a2.391 2.391 0 0 0 0 4.783"
                      ></path>
                      <path
                        fill="#ffdda1"
                        d="m20.372 17.802l-6.109-9.163a.48.48 0 0 0-.39-.212a.45.45 0 0 0-.397.2l-6.523 9.21a1.44 1.44 0 0 1-1.17.605H2.435a1.435 1.435 0 1 1 0-2.87h2.359a.48.48 0 0 0 .39-.201l5.955-8.401a3.44 3.44 0 0 1 2.774-1.413a3.35 3.35 0 0 1 2.738 1.49l6.108 9.164a1.436 1.436 0 1 1-2.391 1.592z"
                      ></path>
                      <path
                        fill="#66e1ff"
                        d="m6.696 13.234l2.29 1.732l3.692-5.21l-2.29-1.733z"
                      ></path>
                      <path
                        stroke="#191919"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.363 12.721a2.391 2.391 0 0 1 2.823-3.66m13.186 8.741l-6.109-9.163a.48.48 0 0 0-.39-.212a.45.45 0 0 0-.397.2l-6.523 9.21a1.44 1.44 0 0 1-1.17.605H2.435a1.435 1.435 0 1 1 0-2.87h2.359a.48.48 0 0 0 .39-.201l5.955-8.401a3.44 3.44 0 0 1 2.774-1.413a3.35 3.35 0 0 1 2.738 1.49l6.108 9.164a1.436 1.436 0 1 1-2.391 1.592zm-7.694-8.047l-2.29-1.732m-1.403 6.943l-2.289-1.732"
                        strokeWidth={1}
                      ></path>
                    </g>
                  </svg>
                </div>

                <h3
                  className={`text-xl font-bold mb-4 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {t("home.services.workoutRoutines.title")}
                </h3>

                <p
                  className={`text-sm leading-relaxed ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {t("home.services.workoutRoutines.description")}
                </p>
              </div>
            </ScrollAnimation>
          </div>

          {/* Call to Action */}
          <ScrollAnimation animation="fade-in" stagger="scroll-stagger-8">
            <div className="mt-16 text-center">
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 rounded-lg shadow-lg btn-animate-strong hover:shadow-xl"
                style={{ backgroundColor: "#4CAF50" }}
              >
                {t("home.services.ctaButton")}
              </a>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* About Us - Clients & What We Offer */}
      <section
        id="about"
        className={`relative overflow-hidden ${
          isDark ? "bg-white text-black" : "bg-white text-black"
        } transition-colors duration-300`}
      >
        <div className="relative z-10 px-4 py-24 mx-auto max-w-7xl">
          {/* Main Content Grid */}
          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Left Side - Clients / Partners */}
            <ScrollAnimation
              animation="slide-in-left"
              stagger="scroll-stagger-1"
            >
              <div className="space-y-8">
                <div>
                  <h2
                    className={`text-4xl font-extrabold mb-4 ${
                      isDark ? "text-gray-900" : "text-gray-900"
                    }`}
                  >
                    {t("home.about.clientsPartners.title")}
                  </h2>
                  <p
                    className={`text-gray-700 mb-8 ${
                      isDark ? "text-gray-600" : "text-gray-600"
                    }`}
                  >
                    {t("home.about.clientsPartners.description")}
                  </p>
                </div>

                {/* Client Logos Grid */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
                  {/* Row 1 */}
                  <ScrollAnimation
                    animation="fade-in"
                    stagger="scroll-stagger-2"
                  >
                    <div className="p-3 text-center transition-colors duration-300 rounded-lg md:p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-red-100 rounded-full md:w-16 md:h-16 md:mb-3">
                        <svg
                          className="w-6 h-6 text-red-500 md:w-8 md:h-8"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </div>
                      <p className="text-xs font-medium text-gray-500">
                        VITAMINS
                      </p>
                    </div>
                  </ScrollAnimation>

                  <ScrollAnimation
                    animation="fade-in"
                    stagger="scroll-stagger-3"
                  >
                    <div className="p-3 text-center transition-colors duration-300 rounded-lg md:p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-green-100 rounded-full md:w-16 md:h-16 md:mb-3">
                        <svg
                          className="w-6 h-6 text-green-500 md:w-8 md:h-8"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </div>
                      <p className="text-xs font-semibold text-gray-600">
                        HEALTHY EATING
                      </p>
                    </div>
                  </ScrollAnimation>

                  <ScrollAnimation
                    animation="fade-in"
                    stagger="scroll-stagger-4"
                  >
                    <div className="p-3 text-center transition-colors duration-300 rounded-lg md:p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-orange-100 rounded-full md:w-16 md:h-16 md:mb-3">
                        <svg
                          className="w-6 h-6 text-orange-500 md:w-8 md:h-8"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </div>
                      <p className="text-xs font-semibold text-gray-600">
                        Family
                      </p>
                      <p className="text-xs text-gray-400">HEALTH CENTER</p>
                    </div>
                  </ScrollAnimation>

                  {/* Row 2 */}
                  <ScrollAnimation
                    animation="fade-in"
                    stagger="scroll-stagger-5"
                  >
                    <div className="p-3 text-center transition-colors duration-300 rounded-lg md:p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-green-100 rounded-full md:w-16 md:h-16 md:mb-3">
                        <svg
                          className="w-6 h-6 text-green-500 md:w-8 md:h-8"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </div>
                      <p className="text-xs text-gray-500">*** WELLNESS ***</p>
                    </div>
                  </ScrollAnimation>

                  <ScrollAnimation
                    animation="fade-in"
                    stagger="scroll-stagger-6"
                  >
                    <div className="p-3 text-center transition-colors duration-300 rounded-lg md:p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-green-100 rounded-full md:w-16 md:h-16 md:mb-3">
                        <svg
                          className="w-6 h-6 text-green-500 md:w-8 md:h-8"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </div>
                      <p className="text-xs font-semibold text-green-600">
                        HEALTHY
                      </p>
                    </div>
                  </ScrollAnimation>

                  <ScrollAnimation
                    animation="fade-in"
                    stagger="scroll-stagger-7"
                  >
                    <div className="p-3 text-center transition-colors duration-300 rounded-lg md:p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-green-100 rounded-full md:w-16 md:h-16 md:mb-3">
                        <svg
                          className="w-6 h-6 text-green-500 md:w-8 md:h-8"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </div>
                      <p className="text-xs text-gray-500">vitamins</p>
                    </div>
                  </ScrollAnimation>

                  {/* Row 3 */}
                  <ScrollAnimation
                    animation="fade-in"
                    stagger="scroll-stagger-8"
                  >
                    <div className="p-3 text-center transition-colors duration-300 rounded-lg md:p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-blue-100 rounded-full md:w-16 md:h-16 md:mb-3">
                        <svg
                          className="w-6 h-6 text-blue-500 md:w-8 md:h-8"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </div>
                      <p className="text-xs font-semibold text-gray-600">
                        HEALTHY
                      </p>
                    </div>
                  </ScrollAnimation>

                  <ScrollAnimation
                    animation="fade-in"
                    stagger="scroll-stagger-9"
                  >
                    <div className="p-3 text-center transition-colors duration-300 rounded-lg md:p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-purple-100 rounded-full md:w-16 md:h-16 md:mb-3">
                        <svg
                          className="w-6 h-6 text-purple-500 md:w-8 md:h-8"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </div>
                      <p className="text-xs font-semibold text-gray-600">
                        YOGA
                      </p>
                    </div>
                  </ScrollAnimation>

                  <ScrollAnimation
                    animation="fade-in"
                    stagger="scroll-stagger-10"
                  >
                    <div className="p-3 text-center transition-colors duration-300 rounded-lg md:p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-pink-100 rounded-full md:w-16 md:h-16 md:mb-3">
                        <svg
                          className="w-6 h-6 text-pink-500 md:w-8 md:h-8"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </div>
                      <p className="text-xs font-semibold text-gray-600">
                        BODY CARE
                      </p>
                    </div>
                  </ScrollAnimation>
                </div>
              </div>
            </ScrollAnimation>

            {/* Right Side - What We Offer */}
            <ScrollAnimation
              animation="slide-in-right"
              stagger="scroll-stagger-1"
            >
              <div className="space-y-6">
                <div>
                  <h2
                    className={`text-4xl font-extrabold mb-4 ${
                      isDark ? "text-gray-900" : "text-gray-900"
                    }`}
                  >
                    {t("home.about.whatWeOffer.title")}
                  </h2>
                </div>

                {/* Services Accordion */}
                <div className="space-y-3 md:space-y-4">
                  {/* Body Balance */}
                  <ScrollAnimation
                    animation="fade-in"
                    stagger="scroll-stagger-2"
                  >
                    <div
                      className={`p-4 md:p-6 rounded-xl border-2 transition-all duration-300 ${
                        openService === "body-balance"
                          ? "bg-emerald-50 border-emerald-200"
                          : "bg-white border-gray-200 hover:bg-gray-50"
                      } cursor-pointer`}
                      onClick={() => toggleService("body-balance")}
                    >
                      <div className="flex items-center justify-between mb-3 md:mb-4">
                        <h3
                          className={`text-lg md:text-xl font-semibold transition-colors duration-300 ${
                            openService === "body-balance"
                              ? "text-emerald-600"
                              : "text-gray-700"
                          }`}
                        >
                          {t("home.about.whatWeOffer.bodyBalance.title")}
                        </h3>
                        <div className="flex items-center justify-center w-6 h-6">
                          {openService === "body-balance" ? (
                            <div className="w-4 h-0.5 bg-gray-400"></div>
                          ) : (
                            <svg
                              className="w-4 h-4 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      {openService === "body-balance" && (
                        <div className="animate-fadeIn">
                          <div className="flex items-center mb-2 md:mb-3">
                            <svg
                              className="w-4 h-4 mr-2 text-gray-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span className="text-sm font-medium text-gray-600">
                              {t("home.about.whatWeOffer.bodyBalance.duration")}
                            </span>
                          </div>
                          <p className="mb-3 text-sm leading-relaxed text-gray-600 md:mb-4 md:text-base">
                            {t(
                              "home.about.whatWeOffer.bodyBalance.description"
                            )}
                          </p>
                          <a
                            href="#"
                            className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                          >
                            {t("home.about.whatWeOffer.readMore")}
                          </a>
                        </div>
                      )}
                    </div>
                  </ScrollAnimation>

                  {/* Zumba */}
                  <ScrollAnimation
                    animation="fade-in"
                    stagger="scroll-stagger-3"
                  >
                    <div
                      className={`p-4 md:p-6 rounded-xl border-2 transition-all duration-300 ${
                        openService === "zumba"
                          ? "bg-emerald-50 border-emerald-200"
                          : "bg-white border-gray-200 hover:bg-gray-50"
                      } cursor-pointer`}
                      onClick={() => toggleService("zumba")}
                    >
                      <div className="flex items-center justify-between">
                        <h3
                          className={`text-lg md:text-xl font-semibold transition-colors duration-300 ${
                            openService === "zumba"
                              ? "text-emerald-600"
                              : "text-gray-700"
                          }`}
                        >
                          {t("home.about.whatWeOffer.zumba.title")}
                        </h3>
                        <div className="flex items-center justify-center w-6 h-6">
                          {openService === "zumba" ? (
                            <div className="w-4 h-0.5 bg-gray-400"></div>
                          ) : (
                            <svg
                              className="w-4 h-4 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      {openService === "zumba" && (
                        <div className="mt-3 animate-fadeIn md:mt-4">
                          <div className="flex items-center mb-2 md:mb-3">
                            <svg
                              className="w-4 h-4 mr-2 text-gray-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span className="text-sm font-medium text-gray-600">
                              {t("home.about.whatWeOffer.zumba.duration")}
                            </span>
                          </div>
                          <p className="mb-3 text-sm leading-relaxed text-gray-600 md:mb-4 md:text-base">
                            {t("home.about.whatWeOffer.zumba.description")}
                          </p>
                          <a
                            href="#"
                            className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                          >
                            {t("home.about.whatWeOffer.readMore")}
                          </a>
                        </div>
                      )}
                    </div>
                  </ScrollAnimation>

                  {/* Basic Pilates */}
                  <ScrollAnimation
                    animation="fade-in"
                    stagger="scroll-stagger-4"
                  >
                    <div
                      className={`p-4 md:p-6 rounded-xl border-2 transition-all duration-300 ${
                        openService === "pilates"
                          ? "bg-emerald-50 border-emerald-200"
                          : "bg-white border-gray-200 hover:bg-gray-50"
                      } cursor-pointer`}
                      onClick={() => toggleService("pilates")}
                    >
                      <div className="flex items-center justify-between">
                        <h3
                          className={`text-lg md:text-xl font-semibold transition-colors duration-300 ${
                            openService === "pilates"
                              ? "text-emerald-600"
                              : "text-gray-700"
                          }`}
                        >
                          {t("home.about.whatWeOffer.basicPilates.title")}
                        </h3>
                        <div className="flex items-center justify-center w-6 h-6">
                          {openService === "pilates" ? (
                            <div className="w-4 h-0.5 bg-gray-400"></div>
                          ) : (
                            <svg
                              className="w-4 h-4 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      {openService === "pilates" && (
                        <div className="mt-3 animate-fadeIn md:mt-4">
                          <div className="flex items-center mb-2 md:mb-3">
                            <svg
                              className="w-4 h-4 mr-2 text-gray-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span className="text-sm font-medium text-gray-600">
                              {t(
                                "home.about.whatWeOffer.basicPilates.duration"
                              )}
                            </span>
                          </div>
                          <p className="mb-3 text-sm leading-relaxed text-gray-600 md:mb-4 md:text-base">
                            {t(
                              "home.about.whatWeOffer.basicPilates.description"
                            )}
                          </p>
                          <a
                            href="#"
                            className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                          >
                            {t("home.about.whatWeOffer.readMore")}
                          </a>
                        </div>
                      )}
                    </div>
                  </ScrollAnimation>

                  {/* Yoga Zen */}
                  <ScrollAnimation
                    animation="fade-in"
                    stagger="scroll-stagger-5"
                  >
                    <div
                      className={`p-4 md:p-6 rounded-xl border-2 transition-all duration-300 ${
                        openService === "yoga-zen"
                          ? "bg-emerald-50 border-emerald-200"
                          : "bg-white border-gray-200 hover:bg-gray-50"
                      } cursor-pointer`}
                      onClick={() => toggleService("yoga-zen")}
                    >
                      <div className="flex items-center justify-between">
                        <h3
                          className={`text-lg md:text-xl font-semibold transition-colors duration-300 ${
                            openService === "yoga-zen"
                              ? "text-emerald-600"
                              : "text-gray-700"
                          }`}
                        >
                          {t("home.about.whatWeOffer.yogaZen.title")}
                        </h3>
                        <div className="flex items-center justify-center w-6 h-6">
                          {openService === "yoga-zen" ? (
                            <div className="w-4 h-0.5 bg-gray-400"></div>
                          ) : (
                            <svg
                              className="w-4 h-4 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      {openService === "yoga-zen" && (
                        <div className="mt-3 animate-fadeIn md:mt-4">
                          <div className="flex items-center mb-2 md:mb-3">
                            <svg
                              className="w-4 h-4 mr-2 text-gray-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span className="text-sm font-medium text-gray-600">
                              {t("home.about.whatWeOffer.yogaZen.duration")}
                            </span>
                          </div>
                          <p className="mb-3 text-sm leading-relaxed text-gray-600 md:mb-4 md:text-base">
                            {t("home.about.whatWeOffer.yogaZen.description")}
                          </p>
                          <a
                            href="#"
                            className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                          >
                            {t("home.about.whatWeOffer.readMore")}
                          </a>
                        </div>
                      )}
                    </div>
                  </ScrollAnimation>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* BMI Calculator */}
      <section
        id="bmi-calculator"
        className={`${
          isDark
            ? "bg-gray-800 text-white border-gray-700"
            : "bg-gray-100 text-black border-black/10"
        } border-t transition-colors duration-300`}
      >
        <BmiCalculator />
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className={`relative overflow-hidden border-t transition-colors duration-300 ${
          isDark
            ? "bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white border-gray-700"
            : "bg-indigo-50 text-black border-black/10"
        }`}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className={`absolute top-1/4 right-1/4 w-32 h-32 rounded-full opacity-5 animate-float ${
              isDark ? "bg-indigo-500" : "bg-indigo-200"
            }`}
          ></div>
          <div
            className={`absolute bottom-1/3 left-1/4 w-24 h-24 rounded-full opacity-5 animate-pulse-slow ${
              isDark ? "bg-purple-500" : "bg-purple-200"
            }`}
          ></div>
        </div>

        <div className="relative z-10 max-w-6xl px-4 py-24 mx-auto">
          {/* Header with enhanced styling */}
          <div className="mb-16 text-center">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <h2
                className={`text-4xl font-extrabold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {t("home.testimonials.title")}
              </h2>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
              <p
                className={`text-gray-700 max-w-2xl mx-auto ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {t("home.testimonials.subtitle")}
              </p>
            </ScrollAnimation>
          </div>

          {/* Testimonials Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Testimonial 1 */}
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-4">
              <div
                className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border ${
                  isDark
                    ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div
                  className={`text-sm font-medium mb-3 ${
                    isDark ? "text-indigo-300" : "text-gray-500"
                  }`}
                >
                  15.03.2024
                </div>

                <h3
                  className={`text-xl font-bold mb-4 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {t("home.testimonials.testimonial1.title")}
                </h3>

                <p
                  className={`text-sm leading-relaxed mb-6 ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {t("home.testimonials.testimonial1.content")}
                </p>

                <div className="flex items-center pt-4 border-t border-gray-200">
                  <img
                    src="/images/63HT1.jpg"
                    alt={t("home.testimonials.testimonial1.author")}
                    className="object-cover w-10 h-10 mr-3 rounded-full"
                  />
                  <span
                    className={`font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {t("home.testimonials.testimonial1.author")}
                  </span>
                </div>
              </div>
            </ScrollAnimation>

            {/* Testimonial 2 */}
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-5">
              <div
                className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border ${
                  isDark
                    ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div
                  className={`text-sm font-medium mb-3 ${
                    isDark ? "text-indigo-300" : "text-gray-500"
                  }`}
                >
                  22.02.2024
                </div>

                <h3
                  className={`text-xl font-bold mb-4 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {t("home.testimonials.testimonial2.title")}
                </h3>

                <p
                  className={`text-sm leading-relaxed mb-6 ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {t("home.testimonials.testimonial2.content")}
                </p>

                <div className="flex items-center pt-4 border-t border-gray-200">
                  <img
                    src="/images/63HT2.jpg"
                    alt={t("home.testimonials.testimonial2.author")}
                    className="object-cover w-10 h-10 mr-3 rounded-full"
                  />
                  <span
                    className={`font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {t("home.testimonials.testimonial2.author")}
                  </span>
                </div>
              </div>
            </ScrollAnimation>

            {/* Testimonial 3 */}
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-6">
              <div
                className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border ${
                  isDark
                    ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div
                  className={`text-sm font-medium mb-3 ${
                    isDark ? "text-indigo-300" : "text-gray-500"
                  }`}
                >
                  08.01.2024
                </div>

                <h3
                  className={`text-xl font-bold mb-4 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {t("home.testimonials.testimonial3.title")}
                </h3>

                <p
                  className={`text-sm leading-relaxed mb-6 ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {t("home.testimonials.testimonial3.content")}
                </p>

                <div className="flex items-center pt-4 border-t border-gray-200">
                  <img
                    src="/images/63HT3.jpg"
                    alt={t("home.testimonials.testimonial3.author")}
                    className="object-cover w-10 h-10 mr-3 rounded-full"
                  />
                  <span
                    className={`font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {t("home.testimonials.testimonial3.author")}
                  </span>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* CTA Section - Grid Card Template */}
      <section
        id="cta"
        className={`relative overflow-hidden ${
          isDark ? "bg-gray-50 text-gray-900" : "bg-gray-50 text-gray-900"
        } transition-colors duration-300`}
      >
        <div className="max-w-6xl px-4 py-24 mx-auto">
          {/* Header */}
          <div className="mb-16 text-center">
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-1">
              <h2 className="mb-4 text-4xl font-extrabold text-gray-900">
                {t("home.cta.title")}
              </h2>
              <p className="max-w-2xl mx-auto text-gray-700">
                {t("home.cta.subtitle")}
              </p>
            </ScrollAnimation>
          </div>

          {/* Grid Cards */}
          <div className="grid items-start gap-12 mb-12 lg:grid-cols-2">
            {/* Left Side - 4 Images Grid */}
            <div className="grid grid-cols-2 gap-6">
              {/* Image 1 */}
              <ScrollAnimation animation="fade-in" stagger="scroll-stagger-2">
                <div className="relative cursor-pointer group">
                  <div className="overflow-hidden aspect-square rounded-2xl">
                    <img
                      src="/images/63A10.jpg"
                      alt="Wellness journey path"
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
              </ScrollAnimation>

              {/* Image 2 */}
              <ScrollAnimation animation="fade-in" stagger="scroll-stagger-3">
                <div className="relative cursor-pointer group">
                  <div className="overflow-hidden aspect-square rounded-2xl">
                    <img
                      src="/images/63A11.jpg"
                      alt="Wellness center"
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
              </ScrollAnimation>

              {/* Image 3 */}
              <ScrollAnimation animation="fade-in" stagger="scroll-stagger-4">
                <div className="relative cursor-pointer group">
                  <div className="overflow-hidden aspect-square rounded-2xl">
                    <img
                      src="/images/63A12.jpg"
                      alt="Nutrition and wellness"
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
              </ScrollAnimation>

              {/* Image 4 */}
              <ScrollAnimation animation="fade-in" stagger="scroll-stagger-5">
                <div className="relative cursor-pointer group">
                  <div className="overflow-hidden aspect-square rounded-2xl">
                    <img
                      src="/images/63A13.jpg"
                      alt="Fitness and training"
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
              </ScrollAnimation>
            </div>

            {/* Right Side - Content Box */}
            <ScrollAnimation animation="fade-in" stagger="scroll-stagger-6">
              <div className="flex flex-col justify-center h-full p-8 transition-shadow duration-300 bg-white shadow-lg rounded-2xl hover:shadow-xl">
                <h3 className="mb-6 text-3xl font-extrabold text-gray-900">
                  {t("home.cta.contentBox.title")}
                </h3>
                <p className="mb-8 text-xl leading-relaxed text-gray-700">
                  {t("home.cta.contentBox.description")}
                </p>
                <div className="mb-8 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-full">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">
                      {t("home.cta.contentBox.features.personalizedPlans")}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-full">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">
                      {t("home.cta.contentBox.features.expertGuidance")}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-full">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">
                      {t("home.cta.contentBox.features.provenResults")}
                    </span>
                  </div>
                </div>
                <a
                  href="/services"
                  className="inline-flex items-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 rounded-lg shadow-lg btn-animate-strong hover:shadow-xl"
                  style={{ backgroundColor: "#4CAF50" }}
                >
                  {t("home.cta.contentBox.exploreButton")}
                </a>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
