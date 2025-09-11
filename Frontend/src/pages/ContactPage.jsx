import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import {
  Phone,
  Mail,
  MapPin,
  Twitter,
  Instagram,
  SendHorizontal as PaperPlaneLucide,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Custom SVG for Discord (as Lucide doesn't have a specific one)
const DiscordIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12.025 2.005C6.493 2.005 2 6.31 2 11.603c0 3.66 2.206 6.833 5.346 8.195.003.054.006.107.006.162 0 .459-.016.917-.046 1.372-.002.035-.003.07-.003.104 0 .19.058.37.16.528.092.143.228.25.39.308.167.06.348.078.526.048.178-.03.34-.113.47-.238.306-.292 1.034-.96 1.642-1.545.606-.584 1.032-.99 1.148-1.088.07-.06.133-.12.19-.183.87.23 1.78.352 2.71.352 5.532 0 10.025-4.306 10.025-9.6c0-5.292-4.493-9.598-10.025-9.598zm-3.41 9.173c-.958 0-1.735-.777-1.735-1.734 0-.958.777-1.735 1.735-1.735.958 0 1.735.777 1.735 1.735 0 .957-.777 1.734-1.735 1.734zm6.82 0c-.958 0-1.735-.777-1.735-1.734 0-.958.777-1.735 1.735-1.735.958 0 1.735.777 1.735 1.735 0 .957-.777 1.734-1.735 1.734z"/>
  </svg>
);

const ContactPage = () => {
  const { t } = useTranslation('contact');
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_2d7wi8u',    // Replace with your EmailJS service ID
      'template_0liyuf7',   // Replace with your EmailJS template ID
      form.current,
      'Hw7PKUz6lUuNtk1x0'     // Replace with your EmailJS public key
    )
    .then(() => {
        alert(t('contact.alert_success'));
        form.current.reset();
    }, (error) => {
        alert(t('contact.alert_fail') + error.text);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-white shadow-2xl rounded-xl overflow-hidden lg:flex lg:max-w-5xl w-full">
        {/* Left Info Panel */}
        <div className="relative bg-green-500 text-white p-8 sm:p-12 lg:w-1/3 flex flex-col justify-between">
          {/* ...left panel code unchanged... */}
          <div className="hidden sm:block sm:absolute bottom-0 left-0 -mb-16 -ml-12">
            <div className="w-48 h-48 rounded-full bg-gray-700 opacity-30"></div>
          </div>
          <div className="hidden sm:block sm:absolute bottom-10 left-10 -mb-10 ml-0">
             <div className="w-32 h-32 rounded-full bg-gray-600 opacity-20"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">{t('contact.contact_info')}</h2>
            <p className="text-gray-300 mb-10 text-sm">
              {t('contact.contact_subtext')}
            </p>
            <div className="space-y-6">
              <div className="flex items-center">
                <Phone size={20} className="text-gray-300" />
                <span className="ml-3">{t('contact.phone')}</span>
              </div>
              <div className="flex items-center">
                <Mail size={20} className="text-gray-300" />
                <span className="ml-3">{t('contact.email')}</span>
              </div>
            </div>
          </div>
          <div className="relative z-10 mt-12 lg:mt-auto">
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <DiscordIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="p-8 sm:p-12 lg:w-2/3 relative">
          <form ref={form} onSubmit={sendEmail}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                  {t('contact.first_name')}
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    autoComplete="given-name"
                    className="py-2 px-3 block w-full shadow-sm focus:ring-purple-500 focus:border-purple-500 border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                  {t('contact.last_name')}
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    autoComplete="family-name"
                    className="py-2 px-3 block w-full shadow-sm focus:ring-purple-500 focus:border-purple-500 border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t('contact.email_label')}
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="py-2 px-3 block w-full shadow-sm focus:ring-purple-500 focus:border-purple-500 border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              <div className="md:col-span-2 mt-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  {t('contact.message')}
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder={t('contact.message_placeholder')}
                    className="py-2 px-3 block w-full shadow-sm focus:ring-purple-500 focus:border-purple-500 border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="ml-auto bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors text-sm font-medium"
              >
                {t('contact.send_message')}
              </button>
            </div>
          </form>
          <div className="absolute bottom-0 right-0 -mb-3 mr-2 hidden md:block">
            <PaperPlaneLucide
              size={80}
              className="text-purple-500 opacity-20 -rotate-12 transform"
              strokeWidth={1.5}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;