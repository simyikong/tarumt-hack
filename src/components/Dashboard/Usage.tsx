import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Usage = () => {
  // Sample data for the line chart
  const data = [
    { time: '00:00', value: 2400 },
    { time: '03:00', value: 4567 },
    { time: '06:00', value: 1398 },
    { time: '09:00', value: 9800 },
    { time: '12:00', value: 3908 },
    { time: '15:00', value: 4800 },
    { time: '18:00', value: 3800 },
    { time: '21:00', value: 4300 },
  ];

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-8 mb-4">Real-Time Analysis</h1>
    </div>
  );
};

export default Usage;
