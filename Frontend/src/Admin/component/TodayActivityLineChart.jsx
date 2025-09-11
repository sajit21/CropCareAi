import { useTranslation } from "react-i18next";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const TodayActivityLineChart = ({ data }) => {
  const { t } = useTranslation('charts');

  return (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
      ⏰ {t('charts.activityByHour')}
    </h3>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <XAxis dataKey="hour" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>
)};
export default TodayActivityLineChart;