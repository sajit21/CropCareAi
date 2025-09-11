
import React, { useMemo } from 'react';

const parseReport = (text) => {
  const lines = text.trim().split('\n');
  const classes = [];
  const summary = [];

  const lineSplitRegex = /\s{2,}/;

  lines.forEach((line) => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return;

    const parts = trimmedLine.split(lineSplitRegex);

    if (trimmedLine.toLowerCase().startsWith('accuracy')) {
      summary.push({
        name: 'Accuracy',
        precision: '',
        recall: '',
        f1: parts[1],
        support: parts[2],
      });
    } else if (parts.length === 5) {
      const rowData = {
        name: parts[0].trim(),
        precision: parts[1],
        recall: parts[2],
        f1: parts[3],
        support: parts[4],
      };
      if (rowData.name.toLowerCase().includes('avg')) {
        summary.push(rowData);
      } else {
        classes.push(rowData);
      }
    }
  });

  return { classes, summary };
};

const ClassificationReport = () => {
  const { classes, summary } = useMemo(() => parseReport(data), [data]);

  return (
    <div className="bg-slate-50 p-4 sm:p-6 rounded-lg shadow-md max-w-6xl mx-auto my-10">
      <h2 className="text-2xl font-bold text-center text-slate-700 mb-6">
        F1-Scores
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-slate-500">
          <thead className="text-xs text-slate-700 uppercase bg-slate-100">
            <tr>
              <th scope="col" className="px-6 py-3">Class</th>
              <th scope="col" className="px-6 py-3 text-right">Precision</th>
              <th scope="col" className="px-6 py-3 text-right">Recall</th>
              <th scope="col" className="px-6 py-3 text-right">F1-Score</th>
              <th scope="col" className="px-6 py-3 text-right">Support</th>
            </tr>
          </thead>

          <tbody>
            {classes.map((row, index) => (
              <tr key={index} className="bg-white border-b hover:bg-slate-50">
                <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                  {row.name}
                </th>
                <td className="px-6 py-4 text-right">{row.precision}</td>
                <td className="px-6 py-4 text-right">{row.recall}</td>
                <td className="px-6 py-4 text-right">{row.f1}</td>
                <td className="px-6 py-4 text-right">{row.support}</td>
              </tr>
            ))}
          </tbody>

          <tbody className="font-bold text-slate-800">
            {summary.map((row, index) => (
              <tr key={index} className="border-t-2 border-slate-300">
                <td className="px-6 py-3">{row.name}</td>
                <td className="px-6 py-3 text-right">{row.precision}</td>
                <td className="px-6 py-3 text-right">{row.recall}</td>
                <td className="px-6 py-3 text-right">{row.f1}</td>
                <td className="px-6 py-3 text-right">{row.support}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassificationReport;

const data = `
Apple-Apple scab       0.98      0.94      0.96       504
Apple-Black rot       0.99      0.93      0.96       497
Apple-Cedar apple rust       0.99      0.91      0.95       490
Apple-Healthy       0.95      0.83      0.89       502
Blueberry-Healthy       0.98      0.88      0.93       454
Cherry-Healthy       0.93      0.86      0.89       456
Cherry-Powdery mildew       1.00      0.99      1.00       421
Corn-Cercospora leaf spot Gray leaf spot       0.91      0.96      0.93       410
Corn-Common rust       0.96      0.98      0.97       477
Corn-Healthy       1.00      0.97      0.99       465
Corn-Northern leaf blight       0.99      0.89      0.94       494
Grape-Black rot       0.99      1.00      0.99       472
Grape-Esca black measles       0.98      0.99      0.99       480
Grape-Healthy       0.99      0.89      0.94       423
Grape-Leaf blight       1.00      1.00      1.00       430
Lemon-Anthracnose       1.00      1.00      1.00       498
Lemon-Bacterial Blight       1.00      1.00      1.00       496
Lemon-Citrus Canker       1.00      1.00      1.00       500
Lemon-Deficiency Leaf       1.00      1.00      1.00       500
Lemon-Dry Leaf       1.00      1.00      1.00       500
Lemon-Healthy       0.99      0.99      0.99       500
Lemon-Sooty Mould       1.00      0.99      1.00       500
Lemon-Spider Mites       1.00      1.00      1.00       500
Orange-Haunglongbing       1.00      0.97      0.98       503
Peach-Bacterial spot       1.00      0.93      0.96       459
Peach-Healthy       1.00      0.90      0.95       432
Pepper-Bacterial spot       1.00      0.97      0.98       478
Pepper-Healthy       0.98      0.63      0.76       497
Potato-Early blight       0.95      0.99      0.97       485
Potato-Healthy       0.59      0.93      0.74       456
Potato-Late blight       0.94      0.90      0.92       485
Raspberry-Healthy       0.95      0.96      0.95       445
Rice-Brown Spot       0.81      0.90      0.85       500
Rice-Healthy       0.81      0.72      0.76       500
Rice-Leaf Blast       0.80      0.76      0.78       500
Rice-Neck Blast       1.00      0.93      0.97       500
Soybean-Healthy       0.99      0.95      0.97       505
Squash-Powdery mildew       1.00      0.99      1.00       434
Strawberry-Healthy       0.95      0.95      0.95       456
Strawberry-Leaf scorch       0.97      0.93      0.95       444
Tomato-Bacterial spot       0.98      0.92      0.95       425
Tomato-Early blight       0.98      0.93      0.95       480
Tomato-Healthy       0.89      0.92      0.90       481
Tomato-Late blight       0.92      0.92      0.92       463
Tomato-Leaf mold       0.98      0.97      0.97       470
Tomato-Mosaic virus       0.98      0.97      0.98       448
Tomato-Septoria leaf spot       0.94      0.91      0.92       436
Tomato-Spider mites       0.95      0.90      0.92       435
Tomato-Target spot       0.81      0.85      0.83       457
Tomato-Yellow leaf curl virus       0.99      0.98      0.99       490

accuracy                           0.94     23566
macro avg       0.95      0.94      0.94     23566
weighted avg       0.95      0.94      0.94     23566
`;
