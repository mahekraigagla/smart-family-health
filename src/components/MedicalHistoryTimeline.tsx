
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, Activity } from "lucide-react";
import { HealthRecord } from '@/types/health';

interface MedicalHistoryTimelineProps {
  records: HealthRecord[];
}

const MedicalHistoryTimeline: React.FC<MedicalHistoryTimelineProps> = ({ records }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'medical':
        return <Activity className="h-4 w-4" />;
      case 'lab':
        return <FileText className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'medical':
        return 'bg-blue-500';
      case 'lab':
        return 'bg-green-500';
      case 'prescription':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const sortedRecords = [...records].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="space-y-4">
      {sortedRecords.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No medical history records found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
          
          {sortedRecords.map((record, index) => (
            <div key={record.id} className="relative flex items-start space-x-4 pb-6">
              {/* Timeline dot */}
              <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${getTypeColor(record.type)}`}>
                <div className="text-white">
                  {getTypeIcon(record.type)}
                </div>
              </div>
              
              {/* Content */}
              <Card className="flex-1">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{record.title}</h3>
                    <Badge variant="outline">
                      {record.date.toLocaleDateString()}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {record.description}
                  </p>
                  {record.value && (
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">
                        {record.value} {record.unit}
                      </Badge>
                    </div>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="capitalize">
                      {record.type}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicalHistoryTimeline;
