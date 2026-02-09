import React from 'react';

interface ShinyTextProps {
  text: string;
  color?: string;
  shineColor?: string;
  speed?: number;
  delay?: number;
  spread?: number;
  yoyo?: boolean;
  pauseOnHover?: boolean;
  direction?: 'left' | 'right';
  disabled?: boolean;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  color = '#b5b5b5',
  shineColor = '#ffffff',
  speed = 2,
  delay = 0,
  spread = 120,
  yoyo = false,
  pauseOnHover = false,
  direction = 'left',
  disabled = false,
  className = '',
}) => {
  const animationDuration = `${speed}s`;
  const animationDelay = `${delay}s`;
  const animationDirection = yoyo ? 'alternate' : 'normal';
  
  const gradientDirection = direction === 'left' ? '90deg' : '-90deg';
  
  const backgroundStyle = disabled
    ? { color }
    : {
        background: `linear-gradient(
          ${gradientDirection},
          ${color} 0%,
          ${shineColor} 50%,
          ${color} 100%
        )`,
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        animation: `shine ${animationDuration} linear infinite`,
        animationDelay,
        animationDirection,
      };

  return (
    <>
      <style>{`
        @keyframes shine {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }
        ${pauseOnHover ? `
          .shiny-text:hover {
            animation-play-state: paused;
          }
        ` : ''}
      `}</style>
      <span
        className={`shiny-text ${className}`}
        style={backgroundStyle}
      >
        {text}
      </span>
    </>
  );
};

export default ShinyText;
