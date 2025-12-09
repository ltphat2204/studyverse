'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

interface FocusData {
  date: string;
  focusTime: number;
}

const generateMockData = (): FocusData[] => {
  const data: FocusData[] = [];
  const focusTimes = {
    weekday: [0, 1, 2, 3, 4],
    weekend: [4, 5, 6, 7] 
  };

  for (let i = 13; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      focusTime: isWeekend 
        ? focusTimes.weekend[Math.floor(Math.random() * focusTimes.weekend.length)]
        : focusTimes.weekday[Math.floor(Math.random() * focusTimes.weekday.length)]
    });
  }
  
  return data;
};

export default function FocusTimeChart() {
  const [data, setData] = useState<FocusData[]>([]);

  useEffect(() => {
    setData(generateMockData());
  }, []);

  return (
    <div className="p-6 shadow-lg border-2 border-gray-200 bg-white rounded-2xl hover:shadow-xl transition-shadow">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          📊 Thời gian tập trung (14 ngày gần đây)
        </h2>
        <p className="text-gray-600 text-base">
          Theo dõi số giờ học tập tập trung của con bạn mỗi ngày
        </p>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <XAxis 
            dataKey="date" 
            stroke="#4b5563" 
            style={{ fontSize: '14px', fontWeight: 500 }}
          />
          <YAxis 
            stroke="#4b5563"
            label={{ value: 'Giờ', angle: -90, position: 'insideLeft', style: { fontSize: '14px', fontWeight: 500 } }}
            style={{ fontSize: '14px', fontWeight: 500 }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "#ffffff", 
              borderColor: "#3b82f6",
              borderRadius: "12px",
              padding: "12px",
              fontSize: "15px",
              fontWeight: 600,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
            }}
            formatter={(value: number) => [`${value} giờ`, 'Thời gian tập trung']}
          />
          <Line 
            type="monotone" 
            dataKey="focusTime" 
            stroke="#3b82f6" 
            strokeWidth={3} 
            dot={{ fill: "#3b82f6", r: 5 }} 
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          💡 <span className="font-semibold">Mẹo:</span> Thời gian tập trung tối ưu cho học sinh là 2-4 giờ mỗi ngày
        </p>
      </div>
    </div>
  );
}