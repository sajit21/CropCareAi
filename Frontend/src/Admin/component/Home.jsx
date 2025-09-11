import PageBreadcrumb from './PageBreadCrumb'
import KpiCard from './KpiCard'
import AreaDiagnosisChart from './AreaDiagnosisChart'
import DiseaseDonutChart from './DiseaseDonutChart'
import TopDiseases from './TopDisease'
import RecentUploads from './RecentUploads'
import TodayActivityLineChart from './TodayActivityLineChart'
import useOverviewStore from '../../store/useOverviewStore'
import { useEffect } from 'react'
import {Loader} from 'lucide-react'
import { useTranslation } from 'react-i18next'




const Home = () => {

  const { t } = useTranslation('charts');

 const {fetchOverview,overview,isOverviewLoading,isOverviewFetched,isOverviewError} =useOverviewStore()

 useEffect(()=>{
   fetchOverview()  
 },[fetchOverview])

 if(isOverviewLoading) {
   return <div className="flex items-center justify-center h-screen"><Loader className="animate-spin h-10 w-10 text-blue-500" /></div>
  }


  return (
    <div className='w-full overflow-x-hidden'>
      <PageBreadcrumb pageTitle={t('charts.overview')} />
      {/* key performer Indicator part (kPi part ho yo) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
    <KpiCard title={t('charts.totalUsers')} value={overview?.kpis?.totalUsers} />
    <KpiCard title={t('charts.totalDiagnoses')} value={overview?.kpis?.totalDiagnoses} />
    <KpiCard title={t('charts.diseasesTracked')} value={overview?.kpis?.diseasesTracked} />
    <KpiCard title={t('charts.uploadsToday')} value={overview?.kpis?.uploadsToday} />
        </div>

     {/* Chart Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <AreaDiagnosisChart data={overview?.areaChartData} />
        <DiseaseDonutChart data={overview?.donutChartData} />
      </div>

      {/* list view */}
      <div className='mb-6'>
       <TopDiseases data={overview?.top5Diseases} />
      </div>
      {/* recentUploads */}
      <div className='mb-6'>
      <RecentUploads data={overview?.sampleUploads} />
      </div>
      {/* Today Activity */}
      <div className='mb-6'>
      <TodayActivityLineChart data={overview?.activityByHourData} />
      </div>
      
    </div>
  )
}

export default Home