
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import useWindowWidth from '../../Hooks/useWindowWidth';
import React, { useMemo } from 'react';
import PageBreadcrumb from './PageBreadCrumb';
import ClassificationReport from './ClassificationReport';

const data = {
  "loss": [1.8645260334014893, 0.8452175855636597, 0.5701723098754883, 0.42997032403945923, 0.3451017141342163, 0.29081541299819946, 0.25056925415992737, 0.22432692348957062, 0.19328241050243378, 0.13190841674804688, 0.11839466542005539, 0.10870615392923355, 0.10356918722391129, 0.09861720353364944, 0.09368693083524704, 0.0877113938331604, 0.066654734313488, 0.062273506075143814, 0.05962858349084854, 0.05695777386426926, 0.05544458329677582, 0.053358305245637894, 0.04475878179073334, 0.04337916523218155, 0.0417490154504776, 0.03938043862581253, 0.03867814317345619, 0.0349014475941658, 0.03460405021905899, 0.03456837311387062, 0.03225710615515709, 0.03108401969075203, 0.03118271380662918, 0.029470169916749],
  "accuracy": [0.44231361150741577, 0.7254897952079773, 0.8088717460632324, 0.8510134816169739, 0.8792176246643066, 0.8979708552360535, 0.9122161269187927, 0.9204154014587402, 0.9308951497077942, 0.9527668356895447, 0.9564793109893799, 0.9597463011741638, 0.9616661667823792, 0.9637875556945801, 0.9654316306114197, 0.9679879546165466, 0.9752643704414368, 0.9764841794967651, 0.9780646562576294, 0.9787222743034363, 0.9789556264877319, 0.9800693988800049, 0.9831772446632385, 0.9838666915893555, 0.9846091866493225, 0.9852986335754395, 0.9854259490966797, 0.9869957566261292, 0.9868685007095337, 0.9869957566261292, 0.9880034327507019, 0.9885125756263733, 0.9884913563728333, 0.9890004992485046],
  "val_loss": [1.319657802581787, 0.7103886604309082, 0.46387946605682373, 0.36664241552352905, 0.3400799632072449, 0.2998522222042084, 0.1839541643857956, 0.25139233469963074, 0.2025030106306076, 0.16997794806957245, 0.13739578425884247, 0.14277757704257965, 0.12920187413692474, 0.11951299756765366, 0.17395615577697754, 0.12181421369314194, 0.1242474913597107, 0.10215350240468979, 0.09539729356765747, 0.09327546507120132, 0.1488802433013916, 0.09580933302640915, 0.09186282753944397, 0.09209530055522919, 0.08156346529722214, 0.09349686652421951, 0.09435689449310303, 0.09658760577440262, 0.08091285824775696, 0.09100417047739029, 0.09660518914461136, 0.0874767079949379, 0.08246088027954102, 0.08368048071861267],
  "val_accuracy": [0.6078672409057617, 0.7655520439147949, 0.843291163444519, 0.8732495903968811, 0.8819485902786255, 0.8987524509429932, 0.9327420592308044, 0.9146652221679688, 0.9311720132827759, 0.9402104616165161, 0.9512433409690857, 0.9507340788841248, 0.9559959173202515, 0.95756596326828, 0.9451327919960022, 0.9579903483390808, 0.9604514837265015, 0.9674955606460571, 0.9685139656066895, 0.9696172475814819, 0.9550199508666992, 0.9677076935768127, 0.9705932140350342, 0.9723330140113831, 0.9741576910018921, 0.9710599780082703, 0.9713994860649109, 0.9711448550224304, 0.974963903427124, 0.9729695320129395, 0.9720784425735474, 0.9744122624397278, 0.9753458499908447, 0.9755579829216003],
  "lr": [9.999999747378752e-05, 9.999999747378752e-05, 9.999999747378752e-05, 9.999999747378752e-05, 9.999999747378752e-05, 9.999999747378752e-05, 9.999999747378752e-05, 9.999999747378752e-05, 9.999999747378752e-05, 4.999999873689376e-05, 4.999999873689376e-05, 4.999999873689376e-05, 4.999999873689376e-05, 4.999999873689376e-05, 4.999999873689376e-05, 4.999999873689376e-05, 2.499999936844688e-05, 2.499999936844688e-05, 2.499999936844688e-05, 2.499999936844688e-05, 2.499999936844688e-05, 2.499999936844688e-05, 1.249999968422344e-05, 1.249999968422344e-05, 1.249999968422344e-05, 1.249999968422344e-05, 1.249999968422344e-05, 6.24999984211172e-06, 6.24999984211172e-06, 6.24999984211172e-06, 6.24999984211172e-06, 3.12499992105586e-06, 3.12499992105586e-06, 1.56249996052793e-06]
};

const AdminModel= (  ) => {
  const windowWidth = useWindowWidth();
  
  const isMobile = windowWidth < 768;

  const chartData = useMemo(() => {
    if (!data.accuracy) return [];
    return data.accuracy.map((_, i) => ({
      epoch: i + 1,
      'Training Acc': data.accuracy[i],
      'Validation Acc': data.val_accuracy[i],
      'Training Loss': data.loss[i],
      'Validation Loss': data.val_loss[i],
    }));
  }, [data]);

  const chartContainerStyle = {
    fontFamily: 'sans-serif',
    width: '95%', 
    maxWidth: '800px',
    margin: '40px auto',
    padding: isMobile ? '10px' : '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: 'white',
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
    fontSize: isMobile ? '1.2rem' : '1.5rem',
  };

  const accuracyChartMargin = {
    top: 5,
    right: isMobile ? 17 : 30, 
    left: isMobile ? -10 : 20, 
  };
  
  const lossChartMargin = {
    top: 5,
    right: isMobile ? 15 : 30,
    left: isMobile ? -5 : 20,
  };

  return (
    <div className='w-full overflow-x-hidden'>
        <PageBreadcrumb pageTitle="Model Training History" />
      {/* Accuracy Chart  */}
      <div style={chartContainerStyle}>
        <h2 style={titleStyle}>Accuracy Visualization</h2>
        <ResponsiveContainer width="100%" height={isMobile ? 300 : 400}>
          <LineChart data={chartData} margin={accuracyChartMargin}>
            <CartesianGrid strokeDasharray="3 3" stroke="#dcdcdc" />
            <XAxis
              dataKey="epoch"
              label={{ value: 'No. of Epochs', position: 'insideBottom', offset: 12, dy: 20 }}
              tick={{ fill: '#555', fontSize: isMobile ? 10 : 12 }}
              stroke="#aaa"
            />
            <YAxis
              label={{ value: 'Accuracy', angle: -90, position: 'insideLeft', dx: isMobile ? 10 : 5 }}
              domain={[0.4, 1]}
              ticks={[0.4, 0.55, 0.7, 0.85, 1]}
              tick={{ fill: '#555', fontSize: isMobile ? 10 : 12 }}
              stroke="#aaa"
            />
            <Tooltip />
            <Legend
              verticalAlign="bottom"
              layout="horizontal"
              iconType="line"
              wrapperStyle={{ paddingTop: '50px', fontSize: isMobile ? '10px' : '12px' }}
            />
            <Line type="monotone" dataKey="Training Acc" stroke="#ff0000" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="Validation Acc" stroke="#0000ff" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Loss Chart */}
      <div style={chartContainerStyle}>
        <h2 style={titleStyle}>Loss Visualization</h2>
        <ResponsiveContainer width="100%" height={isMobile ? 300 : 400}>
          <LineChart data={chartData} margin={lossChartMargin}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="epoch"
              label={{ value: 'No. of Epochs', position: 'insideBottom', offset: 12, dy: 20 }}
              tick={{ fill: '#555', fontSize: isMobile ? 10 : 12 }}
              stroke="#aaa"
            />
            <YAxis
              label={{ value: 'Loss', angle: -90, position: 'insideLeft', dx: isMobile ? 12 : -10 }}
              domain={[0, 2]}
              tick={{ fill: '#555', fontSize: isMobile ? 10 : 12 }}
              stroke="#aaa"
            />
            <Tooltip />
            <Legend
              verticalAlign="bottom"
              layout="horizontal"
              iconType="line"
              wrapperStyle={{ paddingTop: "20px", fontSize: isMobile ? '10px' : '12px' }}
            />
            <Line type="monotone" dataKey="Training Loss" stroke="#ff0000" strokeWidth={2} dot={false}/>
            <Line type="monotone" dataKey="Validation Loss" stroke="#0000ff" strokeWidth={2} dot={false}/>
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* f1 score */}
      <ClassificationReport />

      {/* confusion matrix image only */}
        <div className="overflow-x-auto p-4 flex flex-col items-center justify-center ">
            <h1 className='text-[1.5rem] font-bold mb-5'>Confusion Matrix</h1>
        <img
          src='/confusionmatrix.png'
          alt="Confusion matrix heatmap"
          
          className="max-w-[500px] h-auto"
        />
      </div>
    </div>
  );
};

export default AdminModel;

