import { Link } from "react-router-dom"; // use "react-router-dom" for web apps
import { useTranslation } from 'react-i18next';
import GridShape from "../components/GridShape";


export default function ErrorForReview() {
  const { t } = useTranslation('error');
  return (
    <>
      <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
        <GridShape />
        <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
          <h1 className="mb-8 font-bold text-gray-800 text-3xl md:text-5xl">
            {t('error.review_title')}
          </h1>

          <img
            src="/images/error/review-svg.svg"
            alt="404"
            className="h-64 w-full"
          />

          <p className="mt-10 mb-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg">
            {t('error.review_message')}
          </p>

          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-green-400 hover:text-gray-800 transition-colors duration-300 "
          >
            {t('error.back_home')}
          </Link>
        </div>

        <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 dark:text-gray-400">
          &copy; {new Date().getFullYear()} - FixPlant
        </p>
      </div>
    </>
  );
}
