import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Venue, Alert, initialVenues, initialAlerts, getVenueStatus } from '@/data/venueData';

interface FestivalContextType {
  venues: Venue[];
  alerts: Alert[];
  totalAttendees: number;
  scanEntry: (venueId: string) => void;
  scanExit: (venueId: string) => void;
  markAlertRead: (alertId: string) => void;
  unreadAlertCount: number;
}

const FestivalContext = createContext<FestivalContextType | undefined>(undefined);

export function FestivalProvider({ children }: { children: React.ReactNode }) {
  const [venues, setVenues] = useState<Venue[]>(initialVenues);
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);

  const totalAttendees = venues.reduce((sum, v) => sum + v.currentCrowd, 0);
  const unreadAlertCount = alerts.filter(a => !a.isRead).length;

  /**
   * Simulate real-time crowd fluctuations every 5 seconds
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setVenues(prev => prev.map(venue => {
        const change = Math.floor(Math.random() * 21) - 10; // -10 to +10
        const newCrowd = Math.max(0, Math.min(venue.capacity, venue.currentCrowd + change));
        return {
          ...venue,
          currentCrowd: newCrowd,
          lastUpdated: new Date(),
        };
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  /**
   * Monitor venue capacity and trigger alerts for critical levels
   */
  useEffect(() => {
    venues.forEach(venue => {
      const status = getVenueStatus(venue);
      const percentage = Math.round((venue.currentCrowd / venue.capacity) * 100);

      if (status === 'critical') {
        const existingAlert = alerts.find(
          a => a.venue === venue.name && a.type === 'critical' && !a.isRead
        );

        if (!existingAlert) {
          const newAlert: Alert = {
            id: `alert-${Date.now()}`,
            type: 'critical',
            venue: venue.name,
            message: `Critical: ${percentage}% capacity reached!`,
            timestamp: new Date(),
            isRead: false,
          };
          setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
        }
      }
    });
  }, [venues, alerts, getVenueStatus]);


  const scanEntry = useCallback((venueId: string) => {
    setVenues(prev => prev.map(venue => {
      if (venue.id === venueId && venue.currentCrowd < venue.capacity) {
        return {
          ...venue,
          currentCrowd: venue.currentCrowd + 1,
          lastUpdated: new Date(),
        };
      }
      return venue;
    }));
  }, []);

  const scanExit = useCallback((venueId: string) => {
    setVenues(prev => prev.map(venue => {
      if (venue.id === venueId && venue.currentCrowd > 0) {
        return {
          ...venue,
          currentCrowd: venue.currentCrowd - 1,
          lastUpdated: new Date(),
        };
      }
      return venue;
    }));
  }, []);

  const markAlertRead = useCallback((alertId: string) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  }, []);

  return (
    <FestivalContext.Provider value={{
      venues,
      alerts,
      totalAttendees,
      scanEntry,
      scanExit,
      markAlertRead,
      unreadAlertCount,
    }}>
      {children}
    </FestivalContext.Provider>
  );
}

// Export hooks separately to avoid Fast Refresh warnings
export function useFestival() {
  const context = useContext(FestivalContext);
  if (!context) {
    throw new Error('useFestival must be used within FestivalProvider');
  }
  return context;
}
