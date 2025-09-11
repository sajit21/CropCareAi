const KpiCard = ({ title, value }) => (
  <div className="bg-white shadow rounded-xl p-4 text-center">
    <p className="text-gray-500 text-sm">{title}</p>
    <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
  </div>
);

export default KpiCard;