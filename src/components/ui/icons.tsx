type IconProps = {
  className?: string;
};

const base = "icon";

export function CalculatorIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`}>
      <rect x="4" y="2.5" width="16" height="19" rx="2.5" />
      <line x1="8" y1="6.5" x2="16" y2="6.5" />
      <line x1="7.5" y1="11" x2="7.5" y2="11" />
      <line x1="12" y1="11" x2="12" y2="11" />
      <line x1="16.5" y1="11" x2="16.5" y2="11" />
      <line x1="7.5" y1="14.5" x2="7.5" y2="14.5" />
      <line x1="12" y1="14.5" x2="12" y2="14.5" />
      <line x1="16.5" y1="14.5" x2="16.5" y2="14.5" />
      <line x1="7.5" y1="18" x2="7.5" y2="18" />
      <line x1="12" y1="18" x2="12" y2="18" />
      <line x1="16.5" y1="18" x2="16.5" y2="18" />
    </svg>
  );
}

export function ShieldCheckIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`}>
      <path d="M12 2.5l7.5 3v5.6c0 4.9-3.2 8.6-7.5 10.4-4.3-1.8-7.5-5.5-7.5-10.4V5.5l7.5-3z" />
      <path d="M8.7 12.2l2.3 2.3 4.3-4.7" />
    </svg>
  );
}

export function ClockIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.5 2" />
    </svg>
  );
}

export function UploadIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`}>
      <path d="M12 16V4" />
      <path d="M7.5 8.5L12 4l4.5 4.5" />
      <path d="M4 15v3.5A2.5 2.5 0 006.5 21h11a2.5 2.5 0 002.5-2.5V15" />
    </svg>
  );
}

export function CheckCircleIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.3 12.3l2.4 2.4 5-5.4" />
    </svg>
  );
}

export function LockIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`}>
      <rect x="5" y="10.5" width="14" height="10" rx="2" />
      <path d="M8 10.5V7.5a4 4 0 018 0v3" />
    </svg>
  );
}

export function MenuIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`}>
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

export function XIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`}>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}

export function ChevronRightIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`}>
      <polyline points="9 5 16 12 9 19" />
    </svg>
  );
}

export function AlertIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`}>
      <path d="M12 3.5l9.5 16.5H2.5L12 3.5z" />
      <line x1="12" y1="9.5" x2="12" y2="14" />
      <line x1="12" y1="17" x2="12" y2="17" />
    </svg>
  );
}
