import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react'; 
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-neutral-700 py-5 px-4 sm:px-6 lg:px-8 relative z-[9999]]">
      <div className="w-full max-w-screen-2xl  mx-auto">
        <div className="grid grid-cols-1 items-start justify-items-center sm:justify-items-center sm:grid-cols-2 md:grid-cols-3 md:justify-items-start gap-x-8 gap-y-12 pb-5">
          
          <div className=" space-y-5 text-center md:text-left">
            <h2 className="text-2xl font-bold text-neutral-900  tracking-wider uppercase">
              {t('footer.brand')}
            </h2>
            <p className="text-neutral-600 text-base leading-relaxed">
              {t('footer.tagline')}
            </p>
            <div className="flex space-x-3 pt-1 justify-center md:justify-start">
    <a 
      href="#" 
      aria-label="Facebook"
      className="text-neutral-700 hover:text-blue-600 border border-neutral-700 hover:border-blue-600 rounded-full p-2.5 transition-colors duration-300"
    >
      <Facebook size={18} strokeWidth={2} />
    </a>
    <a 
      href="#" 
      aria-label="Instagram"
      className="text-neutral-700 hover:text-pink-500 border border-neutral-700 hover:border-pink-500 rounded-full p-2.5 transition-colors duration-300"
    >
      <Instagram size={18} strokeWidth={2} />
    </a>
    <a 
      href="#" 
      aria-label="Twitter"
      className="text-neutral-700 hover:text-blue-500 border border-neutral-700 hover:border-blue-500 rounded-full p-2.5 transition-colors duration-300"
    >
      <Twitter size={18} strokeWidth={2} />
    </a>
  </div>
          </div>

            <div>
              <h3 className="font-bold text-neutral-900 text-base mb-4">
                {t('footer.information')}
              </h3>
              <ul className="space-y-2.5 text-sm">
                {/* <li><Link to="/about" className="text-neutral-600 hover:text-neutral-800 transition-colors duration-300">About</Link></li> */}
                <li><Link to="/catalog" className="text-neutral-600 hover:text-neutral-800 transition-colors duration-300">{t('footer.catalogs')}</Link></li>
                <li><Link to="/review" className="text-neutral-600 hover:text-neutral-800 transition-colors duration-300">{t('footer.reviews')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-base mb-4">
                {t('footer.contact')}
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li><Link to="/contact" className="text-neutral-600 hover:text-neutral-800 transition-colors duration-300">{t('footer.gettingStarted')}</Link></li>
              </ul>
            </div>
        </div>

        <div className="border-t border-neutral-400 pt-5 text-center">
          <p className="text-sm text-neutral-500">
            {t('footer.copyright', { year: currentYear })} <a href="#" className="text-neutral-600 hover:text-neutral-800 underline">{t('footer.terms')}</a> {t('footer.brand').toUpperCase()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
