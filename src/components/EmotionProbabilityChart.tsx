'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface EmotionData {
  emotion: string;
  value: number;
}

interface EmotionRaw {
  emotion: string;
  value: string;
}

const COLORS: { [key: string]: string } = {
  'Happy': '#16a34a',
  'Tired': '#7c3aed',
  'Angry': '#dc2626',
  'Sad': '#3b82f6',
  'Anxious': '#ea580c',
  'Neutral': '#c3c3c3',
  // Vietnamese translations
  'Vui vẻ': '#16a34a',
  'Mệt mỏi': '#7c3aed',
  'Tức giận': '#dc2626',
  'Buồn bã': '#3b82f6',
  'Lo lắng': '#ea580c',
  'Trung tính': '#c3c3c3',
};

const EMOTION_TRANSLATION: { [key: string]: string } = {
  'Happy': 'Vui vẻ',
  'Tired': 'Mệt mỏi',
  'Angry': 'Tức giận',
  'Sad': 'Buồn bã',
  'Anxious': 'Lo lắng',
  'Neutral': 'Trung tính',
};

export default function EmotionProbabilityChart() {
  const [data, setData] = useState<EmotionData[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("https://script.google.com/macros/s/AKfycbwveizmxcCSjHsYqWwTgmc6y9XzVnsqOZ7MjY62dxc7LN7BwhYt2bSfSUiuDmDCC6MjFw/exec?b=true");
      const rawData = response.data;

        const processedData: EmotionData[] = rawData.map((item: EmotionRaw) => ({
          emotion: EMOTION_TRANSLATION[item.emotion] || item.emotion,
          value: Number(item.value),
        }));

        setData(processedData);
    };

    getData();
  }, []);

  // Custom label renderer for Vietnamese display
  const renderCustomLabel = (entry: EmotionData) => {
    return `${entry.emotion}: ${entry.value.toFixed(2)}%`;
  };

  return (
    <div className="p-6 shadow-lg border-2 border-gray-200 bg-white rounded-2xl hover:shadow-xl transition-shadow h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          😊 Phân tích Cảm xúc
        </h2>
        <p className="text-gray-600 text-base">
          Tỷ lệ các trạng thái cảm xúc trong học tập
        </p>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie 
            data={data} 
            dataKey="value" 
            nameKey="emotion" 
            cx="50%" 
            cy="50%" 
            outerRadius={100} 
            fill="#0284c7" 
            label={renderCustomLabel}
            labelLine={{ stroke: '#9ca3af', strokeWidth: 1 }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.emotion]} />
            ))}
          </Pie>
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
            formatter={(value: number) => `${value.toFixed(2)}%`}
          />
          <Legend 
            wrapperStyle={{ fontSize: '15px', fontWeight: 500 }}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          💡 <span className="font-semibold">Lưu ý:</span> Cảm xúc tích cực giúp con học tập hiệu quả hơn
        </p>
      </div>
    </div>
  );
}
