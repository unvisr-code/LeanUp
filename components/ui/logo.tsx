import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'light'
}) => {
  const sizes = {
    sm: { fontSize: '1.25rem', letterSpacing: '-0.02em', height: '1.75rem' },
    md: { fontSize: '1.5rem', letterSpacing: '-0.025em', height: '2rem' },
    lg: { fontSize: '1.875rem', letterSpacing: '-0.03em', height: '2.5rem' }
  };

  const { fontSize, letterSpacing, height } = sizes[size];
  const color = variant === 'dark' ? 'text-gray-900' : 'text-white';

  return (
    <div className={`flex items-center ${className}`} style={{ height }}>
      <span
        className={`${color} select-none tracking-tight`}
        style={{
          fontSize,
          letterSpacing,
          fontFamily: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif',
          lineHeight: 1
        }}
      >
        <span style={{ fontWeight: 600 }}>LEAN</span>
        <span style={{ fontWeight: 800 }}>UP</span>
      </span>
    </div>
  );
};