
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { t } from '@/utils/i18n';

const HealthAnalyticsDashboard = () => {
  // Mock data for demonstration
  const medicineAdherenceData = [
    { date: '2024-01', adherence: 85 },
    { date: '2024-02', adherence: 92 },
    { date: '2024-03', adherence: 88 },
    { date: '2024-04', adherence: 95 },
    { date: '2024-05', adherence: 90 },
    { date: '2024-06', adherence: 87 }
  ];

  const expenseData = [
    { month: 'Jan', amount: 2500 },
    { month: 'Feb', amount: 3200 },
    { month: 'Mar', amount: 1800 },
    { month: 'Apr', amount: 4100 },
    { month: 'May', amount: 2900 },
    { month: 'Jun', amount: 3500 }
  ];

  const healthOverviewData = [
    { name: 'Medicines Taken', value: 85, color: '#8884d8' },
    { name: 'Appointments Kept', value: 92, color: '#82ca9d' },
    { name: 'Checkups Done', value: 78, color: '#ffc658' },
    { name: 'Vaccinations Up-to-date', value: 95, color: '#ff7300' }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('analytics')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('medicineAdherence')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={medicineAdherenceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="adherence" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('expenseAnalysis')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={expenseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{t('healthOverview')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={healthOverviewData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {healthOverviewData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="space-y-2">
                {healthOverviewData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-2 bg-muted rounded">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="font-semibold">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthAnalyticsDashboard;
