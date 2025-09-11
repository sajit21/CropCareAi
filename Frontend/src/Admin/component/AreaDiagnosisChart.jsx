import { useTranslation } from "react-i18next";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const AreaDiagnosisChart = ({ data }) =>{ 
  const { t } = useTranslation('charts');
  return (
  <div className="bg-white rounded-xl shadow p-4">
    <h3 className="font-semibold mb-2">{t('charts.diagnosesOverTime')}</h3>
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 0, left: 0, bottom: 0 }} 
      >
        <XAxis
          dataKey="date"
          padding={{ left: 0, right: 0 }} 
        />
        <YAxis domain={['dataMin', 'dataMax']} />
        <Tooltip />
        <Area type="monotone" dataKey="count" stroke="#4f46e5" fill="#6366f1" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
)};

export default AreaDiagnosisChart;