import { LucideIcon, Mic2, Music, Utensils, Gamepad2, Palette, Headphones } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
    Mic2,
    Music,
    Utensils,
    Gamepad2,
    Palette,
    Headphones,
};

export function VenueIcon({ icon, className }: { icon: string, className?: string }) {
    const IconComponent = iconMap[icon] || Music;
    return <IconComponent className={className} />;
}
