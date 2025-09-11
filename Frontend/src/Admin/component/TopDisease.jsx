import { useTranslation } from "react-i18next";

const TopDiseases = ({ data }) => {
  const { t } = useTranslation('charts');
  return (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
     {t('charts.top5diseases')}
    </h3>
    <ul className="space-y-3">
      {data?.map((item, i) => (
        <li
          key={item.id || i}
          className="flex items-center justify-between p-3 rounded-lg border-l-4 border-blue-500
                     bg-gray-50 dark:bg-gray-700/50 
                     transition-all duration-300 ease-in-out 
                     hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-md hover:-translate-y-0.5"
        >
          <div className="flex items-center gap-4">
          
            <span className="text-lg font-semibold text-gray-400 dark:text-gray-500 w-6 text-center">
              {i + 1}
            </span>
            <span className="font-medium text-gray-800 dark:text-gray-50 truncate">
              {item.name}
            </span>
          </div>
          
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 whitespace-nowrap">
            {item.count.toLocaleString()} cases
          </span>
        </li>
      ))}
    </ul>
  </div>
)};

export default TopDiseases;
