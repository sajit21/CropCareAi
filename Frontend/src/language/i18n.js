import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'ne'],
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'cookie', 'navigator'],
      caches: ['localStorage', 'cookie'],
    },
     ns: ['header','footer','home','catalog','contact','upload','review','sideMenu','history','editProfile','error','sidebar','addCatalog','breadcrumb','charts','recentUploads','admincatalog','adminusers','adminuserdetail'], // Your namespaces (matching JSON file names)
    defaultNS: 'header', // Default namespace for keys without namespace
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    react: { useSuspense: false },
    interpolation: {
      escapeValue: false, // React already escapes
    },
  });

export default i18n;