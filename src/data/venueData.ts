export interface Venue {
  id: string;
  name: string;
  icon: string;
  capacity: number;
  currentCrowd: number;
  location: {
    lat: number;
    lng: number;
  };
  lastUpdated: Date;
}

export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  venue: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}

export const initialVenues: Venue[] = [
  {
    id: '1',
    name: 'Main Stage',
    icon: 'Mic2',
    capacity: 5000,
    currentCrowd: 4200,
    location: { lat: 15.4279, lng: 73.9870 },
    lastUpdated: new Date(),
  },
  {
    id: '2',
    name: 'Dance Arena',
    icon: 'Music',
    capacity: 3000,
    currentCrowd: 1800,
    location: { lat: 15.4289, lng: 73.9880 },
    lastUpdated: new Date(),
  },
  {
    id: '3',
    name: 'Food Court',
    icon: 'Utensils',
    capacity: 2000,
    currentCrowd: 1950,
    location: { lat: 15.4269, lng: 73.9860 },
    lastUpdated: new Date(),
  },
  {
    id: '4',
    name: 'Gaming Zone',
    icon: 'Gamepad2',
    capacity: 1500,
    currentCrowd: 800,
    location: { lat: 15.4299, lng: 73.9890 },
    lastUpdated: new Date(),
  },
  {
    id: '5',
    name: 'Art Gallery',
    icon: 'Palette',
    capacity: 1000,
    currentCrowd: 350,
    location: { lat: 15.4259, lng: 73.9850 },
    lastUpdated: new Date(),
  },
  {
    id: '6',
    name: 'Music Lounge',
    icon: 'Headphones',
    capacity: 1200,
    currentCrowd: 1100,
    location: { lat: 15.4309, lng: 73.9900 },
    lastUpdated: new Date(),
  },
];

export const initialAlerts: Alert[] = [
  {
    id: '1',
    type: 'critical',
    venue: 'Food Court',
    message: 'Approaching maximum capacity (97%)',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    isRead: false,
  },
  {
    id: '2',
    type: 'warning',
    venue: 'Music Lounge',
    message: 'Crowd growing rapidly (+80 in 5 mins)',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    isRead: false,
  },
  {
    id: '3',
    type: 'info',
    venue: 'Main Stage',
    message: 'Performance starting in 15 minutes',
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    isRead: true,
  },
];

export function getVenueStatus(venue: Venue): 'safe' | 'warning' | 'critical' {
  const percentage = (venue.currentCrowd / venue.capacity) * 100;
  if (percentage >= 90) return 'critical';
  if (percentage >= 70) return 'warning';
  return 'safe';
}

export function getStatusLabel(status: 'safe' | 'warning' | 'critical'): string {
  switch (status) {
    case 'safe': return 'Safe';
    case 'warning': return 'Near Capacity';
    case 'critical': return 'Overcrowded';
  }
}

export function generateHistoricalData() {
  const data = [];
  const now = new Date();

  for (let i = 12; i >= 0; i--) {
    const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
    const baseCount = 2000 + Math.sin(i / 3) * 1500;
    const actual = Math.round(baseCount + Math.random() * 500);
    const predicted = Math.round(baseCount + Math.random() * 300);

    data.push({
      time: hour.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      actual,
      predicted,
    });
  }

  // Add future predictions
  for (let i = 1; i <= 4; i++) {
    const hour = new Date(now.getTime() + i * 60 * 60 * 1000);
    const baseCount = 3000 + Math.sin((12 + i) / 3) * 1500;
    const predicted = Math.round(baseCount + Math.random() * 400);

    data.push({
      time: hour.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      actual: null,
      predicted,
    });
  }

  return data;
}
