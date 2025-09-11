
import User from '../model/user.model.js';
import ImageRecord from '../model/imageRecord.model.js';
import catalog from '../model/catalog.model.js';


export const getAdminOverview= async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDiagnoses = await ImageRecord.countDocuments();
    const diseasesTracked = await ImageRecord.distinct('disease').then(diseases => diseases.length);
    const startOfDay = new Date();
    startOfDay.setHours(0,0,0,0);
    const uploadsToday = await ImageRecord.countDocuments({ uploadedAt: { $gte: startOfDay } });

    const today = new Date();
    const areaChartData = [];
    for (let i = 6; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);
      day.setHours(0,0,0,0);
      const nextDay = new Date(day);
      nextDay.setDate(day.getDate() + 1);
      const count = await ImageRecord.countDocuments({ uploadedAt: { $gte: day, $lt: nextDay } });
      areaChartData.push({ date: day.toISOString().slice(0,10), count });
    }

    const diseaseCounts = await ImageRecord.aggregate([
      { $group: { _id: "$disease", value: { $sum: 1 } } },
      { $sort: { value: -1 } }
    ]);
    const donutChartData = diseaseCounts.map(d => ({ name: d._id, value: d.value }));

    const top5Diseases = diseaseCounts.slice(0, 5).map(d => ({ name: d._id, count: d.value }));

    const sampleUploads = await ImageRecord.find({})
      .sort({ uploadedAt: -1 })
      .limit(5)
      .populate('user', 'Fullname Email Photo');

    const activityByHourData = [];
    for (let h = 0; h < 24; h++) {
      const hourStart = new Date(startOfDay);
      hourStart.setHours(h, 0, 0, 0);
      const hourEnd = new Date(hourStart);
      hourEnd.setHours(h + 1, 0, 0, 0);
      const count = await ImageRecord.countDocuments({ uploadedAt: { $gte: hourStart, $lt: hourEnd } });
      activityByHourData.push({ hour: hourStart.toTimeString().slice(0,5), count });
    }

    res.status(200).json({
      kpis: {
        totalUsers,
        totalDiagnoses,
        diseasesTracked,
        uploadsToday
      },
      areaChartData,
      donutChartData,
      top5Diseases,
      sampleUploads,
      activityByHourData
    });
  } catch (error) {
    console.error("Error in getAdminOverview:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}