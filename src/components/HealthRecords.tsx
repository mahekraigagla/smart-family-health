
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, TrendingUp, Users } from "lucide-react";
import { HealthRecord, GrowthData, Vaccination } from '@/types/health';
import { t } from '@/utils/i18n';
import MedicalHistoryTimeline from './MedicalHistoryTimeline';
import VaccinationTracker from './VaccinationTracker';
import GrowthCharts from './GrowthCharts';

const HealthRecords = () => {
  const [activeTab, setActiveTab] = useState('history');

  // Mock data
  const mockHealthRecords: HealthRecord[] = [
    {
      id: '1',
      familyMemberId: '1',
      type: 'medical',
      title: 'Annual Checkup',
      description: 'Complete physical examination with blood work',
      date: new Date('2024-06-15'),
    },
    {
      id: '2',
      familyMemberId: '1',
      type: 'lab',
      title: 'Blood Sugar Test',
      description: 'Fasting blood glucose test',
      date: new Date('2024-06-10'),
      value: 95,
      unit: 'mg/dL'
    }
  ];

  const mockGrowthData: GrowthData[] = [
    {
      id: '1',
      familyMemberId: '2',
      date: new Date('2024-01-01'),
      height: 120,
      weight: 25,
      age: 8
    },
    {
      id: '2',
      familyMemberId: '2',
      date: new Date('2024-06-01'),
      height: 125,
      weight: 27,
      age: 8.5
    }
  ];

  const mockVaccinations: Vaccination[] = [
    {
      id: '1',
      familyMemberId: '2',
      vaccine: 'MMR Booster',
      date: new Date('2024-03-15'),
      status: 'completed'
    },
    {
      id: '2',
      familyMemberId: '2',
      vaccine: 'Annual Flu Shot',
      date: new Date('2024-09-01'),
      nextDue: new Date('2025-09-01'),
      status: 'due'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t('healthRecords')}</h2>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Add Record
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {t('medicalHistory')}
          </TabsTrigger>
          <TabsTrigger value="vaccinations" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            {t('vaccinations')}
          </TabsTrigger>
          <TabsTrigger value="growth" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            {t('growthCharts')}
          </TabsTrigger>
          <TabsTrigger value="lab" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            {t('labResults')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="history">
          <MedicalHistoryTimeline records={mockHealthRecords} />
        </TabsContent>

        <TabsContent value="vaccinations">
          <VaccinationTracker vaccinations={mockVaccinations} />
        </TabsContent>

        <TabsContent value="growth">
          <GrowthCharts growthData={mockGrowthData} />
        </TabsContent>

        <TabsContent value="lab">
          <Card>
            <CardHeader>
              <CardTitle>{t('labResults')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockHealthRecords
                  .filter(record => record.type === 'lab')
                  .map(record => (
                    <div key={record.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{record.title}</h3>
                        <Badge variant="outline">
                          {record.date.toLocaleDateString()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {record.description}
                      </p>
                      {record.value && (
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-lg">
                            {record.value}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {record.unit}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthRecords;
