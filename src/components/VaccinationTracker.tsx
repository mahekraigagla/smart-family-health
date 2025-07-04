
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { Vaccination } from '@/types/health';

interface VaccinationTrackerProps {
  vaccinations: Vaccination[];
}

const VaccinationTracker: React.FC<VaccinationTrackerProps> = ({ vaccinations }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'due':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'overdue':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'due':
        return 'bg-yellow-50 border-yellow-200';
      case 'overdue':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const groupedVaccinations = vaccinations.reduce((acc, vaccination) => {
    if (!acc[vaccination.status]) {
      acc[vaccination.status] = [];
    }
    acc[vaccination.status].push(vaccination);
    return acc;
  }, {} as Record<string, Vaccination[]>);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <h3 className="font-semibold text-green-700">Completed</h3>
            <p className="text-2xl font-bold text-green-600">
              {groupedVaccinations.completed?.length || 0}
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <h3 className="font-semibold text-yellow-700">Due Soon</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {groupedVaccinations.due?.length || 0}
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <h3 className="font-semibold text-red-700">Overdue</h3>
            <p className="text-2xl font-bold text-red-600">
              {groupedVaccinations.overdue?.length || 0}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vaccination Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vaccinations.map((vaccination) => (
              <div
                key={vaccination.id}
                className={`border rounded-lg p-4 ${getStatusColor(vaccination.status)}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(vaccination.status)}
                    <h3 className="font-medium">{vaccination.vaccine}</h3>
                  </div>
                  <Badge
                    variant={vaccination.status === 'completed' ? 'default' : 'secondary'}
                    className="capitalize"
                  >
                    {vaccination.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Date Given:</span>
                    <p className="text-muted-foreground">
                      {vaccination.date.toLocaleDateString()}
                    </p>
                  </div>
                  {vaccination.nextDue && (
                    <div>
                      <span className="font-medium">Next Due:</span>
                      <p className="text-muted-foreground">
                        {vaccination.nextDue.toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
                
                {vaccination.status === 'due' && (
                  <Button size="sm" className="mt-3">
                    Schedule Appointment
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VaccinationTracker;
