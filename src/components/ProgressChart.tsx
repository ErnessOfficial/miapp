import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Dot } from 'recharts';
import { WellbeingHistoryEntry } from '../types';
import { useTranslation } from 'react-i18next';

interface ProgressChartProps {
  history: WellbeingHistoryEntry[];
}

const categoryColors = {
    leve: '#22c55e', // green-500
    moderado: '#f59e0b', // amber-500
    alto: '#ef4444', // red-500
};

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-sm text-gray-700">{`Fecha: ${label}`}</p>
          <p className="text-sm" style={{ color: categoryColors[data.category] }}>
            {`Puntuación: ${data.score.toFixed(0)}%`}
          </p>
          <p className="text-sm text-gray-600" style={{ textTransform: 'capitalize' }}>
            {`Categoría: ${data.category}`}
          </p>
        </div>
      );
    }
  
    return null;
};

const CustomizedDot: React.FC<any> = (props) => {
    const { cx, cy, payload } = props;
    const color = categoryColors[payload.category] || '#8884d8';
    return <Dot cx={cx} cy={cy} r={6} fill={color} stroke="#fff" strokeWidth={2} />;
};


const ProgressChart: React.FC<ProgressChartProps> = ({ history }) => {
  const { t } = useTranslation();
  const chartData = [...history].reverse(); // Oldest to newest

  return (
    <div className="animate-in fade-in duration-500">
      <h3 className="text-xl font-semibold text-animik-dark mb-4">{t('recommendations.progressChartTitle')}</h3>
      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="date" stroke="#888" fontSize={12} />
            <YAxis stroke="#888" domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
            <Tooltip content={<CustomTooltip />} />
            <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#8884d8" 
                strokeWidth={2}
                activeDot={{ r: 8 }} 
                dot={<CustomizedDot />}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressChart;
