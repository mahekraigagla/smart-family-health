
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { GrowthData } from '@/types/health';

interface GrowthChartsProps {
  growthData: GrowthData[];
}

const GrowthCharts: React.FC<GrowthChartsProps> = ({ growthData }) => {
  const chartData = growthData.map(data => ({
    age: data.age,
    height: data.height,
    weight: data.weight,
    date: data.date.toLocaleDateString()
  })).sort((a, b) => a.age - b.age);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Height Growth Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" label={{ value: 'Age (years)', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Height (cm)', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  labelFormatter={(value) => `Age: ${value} years`}
                  formatter={(value, name) => [`${value} cm`, 'Height']}
                />
                <Line type="monotone" dataKey="height" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weight Growth Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" label={{ value: 'Age (years)', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  labelFormatter={(value) => `Age: ${value} years`}
                  formatter={(value, name) => [`${value} kg`, 'Weight']}
                />
                <Line type="monotone" dataKey="weight" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Growth Data Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Age</th>
                  <th className="text-left p-2">Height (cm)</th>
                  <th className="text-left p-2">Weight (kg)</th>
                  <th className="text-left p-2">BMI</th>
                </tr>
              </thead>
              <tbody>
                {growthData.map((data) => {
                  const bmi = (data.weight / ((data.height / 100) ** 2)).toFixed(1);
                  return (
                    <tr key={data.id} className="border-b">
                      <td className="p-2">{data.date.toLocaleDateString()}</td>
                      <td className="p-2">{data.age} years</td>
                      <td className="p-2">{data.height}</td>
                      <td className="p-2">{data.weight}</td>
                      <td className="p-2">{bmi}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GrowthCharts;
