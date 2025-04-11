import { Calendar } from 'lucide-react';
import { memo } from 'react';

interface DateFormatterProps {
  dateString: string;
  showIcon?: boolean;
  className?: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Show relative time for entries within the past week
  if (diffDays < 7) {
    if (diffDays === 0) {
      // Today
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `Today at ${hours}:${formattedMinutes}`;
    } else if (diffDays === 1) {
      // Yesterday
      return "Yesterday";
    } else {
      // Within a week
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return days[date.getDay()];
    }
  }

  // For older entries, show the date
  return `${date.toLocaleDateString()}`;
};

// Get full formatted time for tooltip/title attribute
export const getFullDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const DateFormatter = memo(({ dateString, showIcon = true, className = "text-xs text-foreground/70" }: DateFormatterProps) => {
  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      title={getFullDateTime(dateString)}
    >
      {showIcon && <Calendar size={12} className="" />}
      <span>{formatDate(dateString)}</span>
    </div>
  );
});
