import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaUtensils, FaHeart, FaAward, FaClock } from 'react-icons/fa';
import { MdDeliveryDining } from 'react-icons/md';
import { BiWorld } from 'react-icons/bi';

import neangImage from '../assets/image/neang.jpg';
import vizaImage from '../assets/image/viza.jpg';

import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-orange-50 to-white pt-24 pb-16 px-6 md:px-14">

      <div className="max-w-7xl mx-auto">

        {/* Hero Section */}
        <div data-aos="fade-down" className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 bg-clip-text mb-4">
            {t('about.title')}
          </h1>
          <p data-aos="fade-up" className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Our Story */}
        <div data-aos="fade-up" className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t('about.ourStory')}</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            {t('about.storyPara1')}
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            {t('about.storyPara2')}
          </p>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div data-aos="zoom-in" className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHeart className="text-3xl text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{t('about.authenticRecipes')}</h3>
            <p className="text-gray-700">{t('about.authenticRecipesDesc')}</p>
          </div>

          <div data-aos="zoom-in" data-aos-delay="150" className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUtensils className="text-3xl text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{t('about.freshIngredients')}</h3>
            <p className="text-gray-700">{t('about.freshIngredientsDesc')}</p>
          </div>

          <div data-aos="zoom-in" data-aos-delay="300" className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <MdDeliveryDining className="text-3xl text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{t('about.fastDelivery')}</h3>
            <p className="text-gray-700">{t('about.fastDeliveryDesc')}</p>
          </div>
        </div>

        {/* Meet Our Team */}
        <div className="mb-16">
          <h2 data-aos="fade-up" className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">{t('about.meetOurTeam')}</h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">

            <div data-aos="fade-right" className="bg-white rounded-3xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <img src={neangImage} className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Neang</h3>
                <p className="text-orange-600 font-semibold mb-3">{t('about.headChef')}</p>
                <p className="text-gray-700">{t('about.neangDesc')}</p>
              </div>
            </div>

            <div data-aos="fade-left" className="bg-white rounded-3xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <img src={vizaImage} className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Viza</h3>
                <p className="text-orange-600 font-semibold mb-3">{t('about.pastryChef')}</p>
                <p className="text-gray-700">{t('about.vizaDesc')}</p>
              </div>
            </div>

          </div>
        </div>

        {/* Stats */}
        <div data-aos="zoom-in" className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-12 text-white mb-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div><div className="text-5xl font-bold mb-2">5+</div><p>{t('about.yearsOfService')}</p></div>
            <div><div className="text-5xl font-bold mb-2">50+</div><p>{t('about.menuItems')}</p></div>
            <div><div className="text-5xl font-bold mb-2">10K+</div><p>{t('about.happyCustomers')}</p></div>
            <div><div className="text-5xl font-bold mb-2">4.9</div><p>{t('about.averageRating')}</p></div>
          </div>
        </div>

        {/* CTA */}
        <div data-aos="fade-up" className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('about.ctaTitle')}</h2>
          <p className="text-gray-600 mb-8 text-lg">{t('about.ctaSubtitle')}</p>
          <Link
            to="/MenuFood"
            className="inline-block px-10 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            {t('about.browseMenu')}
          </Link>
        </div>

      </div>
    </div>
  );
};

export default About;
