import React, { useState } from 'react';
import { IconProps } from './types';

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-9 w-9',
};

export const Icon: React.FC<IconProps> = ({
  size = 'md',
  fileName,
  tooltip,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const sizeClass = sizeClasses[size];

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={fileName}
    >
      <img
        src={`/icons/${fileName}.svg`}
        alt={`${fileName} icon`}
        className={`${sizeClass} object-contain ${className}`}
      />
      {tooltip && isHovered && (
        <div className="absolute bottom-full left-1/2 mb-1 -translate-x-1/2 transform rounded bg-primary-500 px-2 py-1 text-xs text-white">
          {tooltip}
        </div>
      )}
    </div>
  );
};
