import { motion } from 'framer-motion';
import { Bell, Menu, Search, User } from 'lucide-react';
import { useFestival } from '@/context/FestivalContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { unreadAlertCount, totalAttendees } = useFestival();

  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-40">
      <div className="h-full px-4 lg:px-6 flex items-center justify-between gap-4">
        {/* Mobile Menu */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Search */}
        <div className="hidden sm:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search venues, alerts..."
              className="pl-10 bg-muted/50 border-border focus:bg-muted"
            />
          </div>
        </div>

        {/* Festival Info */}
        <div className="hidden md:flex items-center gap-6">
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Total Attendees</p>
            <motion.p
              key={totalAttendees}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-lg font-bold gradient-text"
            >
              {totalAttendees.toLocaleString()}
            </motion.p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Festival</p>
            <p className="text-sm font-semibold text-foreground">CULTRANG @ IIT GOA</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            {unreadAlertCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-danger text-danger-foreground text-xs flex items-center justify-center font-medium"
              >
                {unreadAlertCount}
              </motion.span>
            )}
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}
