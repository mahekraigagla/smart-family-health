
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Bell, BellOff } from "lucide-react";
import { NotificationPreference } from '@/types/health';
import { t } from '@/utils/i18n';
import { useToast } from "@/hooks/use-toast";

const NotificationCenter = () => {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<NotificationPreference>({
    medicines: true,
    appointments: true,
    checkups: true,
    vaccinations: true
  });
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    // Check notification permission
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }

    // Load preferences from localStorage
    const saved = localStorage.getItem('notificationPreferences');
    if (saved) {
      setPreferences(JSON.parse(saved));
    }
  }, []);

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      
      if (permission === 'granted') {
        toast({
          title: "Notifications Enabled",
          description: "You'll now receive health reminders",
        });
      }
    }
  };

  const updatePreference = (key: keyof NotificationPreference, value: boolean) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    localStorage.setItem('notificationPreferences', JSON.stringify(newPreferences));
  };

  const showTestNotification = () => {
    if (notificationPermission === 'granted') {
      new Notification('Test Notification', {
        body: 'This is a test health reminder from Pariwar+',
        icon: '/favicon.ico'
      });
    }
  };

  const scheduleReminder = (title: string, body: string, delay: number) => {
    setTimeout(() => {
      if (notificationPermission === 'granted') {
        new Notification(title, {
          body,
          icon: '/favicon.ico'
        });
      }
      
      toast({
        title,
        description: body,
      });
    }, delay);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {notificationPermission !== 'granted' && (
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Enable Browser Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    Get timely health reminders even when the app is closed
                  </p>
                </div>
                <Button onClick={requestNotificationPermission}>
                  Enable
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {Object.entries(preferences).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <label className="font-medium">
                    {t(`${key}Reminder` as keyof typeof preferences)}
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Get reminders for {key.toLowerCase()}
                  </p>
                </div>
                <Switch
                  checked={value}
                  onCheckedChange={(checked) => updatePreference(key as keyof NotificationPreference, checked)}
                />
              </div>
            ))}
          </div>

          {notificationPermission === 'granted' && (
            <Button onClick={showTestNotification} variant="outline" className="w-full">
              Test Notification
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Reminders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            onClick={() => scheduleReminder('Medicine Reminder', 'Time to take your evening medication', 5000)}
            variant="outline"
            className="w-full justify-start"
          >
            Test Medicine Reminder (5s)
          </Button>
          <Button
            onClick={() => scheduleReminder('Appointment Reminder', 'Doctor appointment tomorrow at 10 AM', 3000)}
            variant="outline"
            className="w-full justify-start"
          >
            Test Appointment Reminder (3s)
          </Button>
          <Button
            onClick={() => scheduleReminder('Health Checkup', 'Annual health checkup due this month', 2000)}
            variant="outline"
            className="w-full justify-start"
          >
            Test Checkup Reminder (2s)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationCenter;
