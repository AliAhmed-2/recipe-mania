import React, { useState, useEffect } from 'react';
import { BackgroundImageProps } from './types';

const BackgroundImage: React.FC<BackgroundImageProps> = ({
  actualImage,
  placeholder = '#1f2937',
  className = '',
  style = {},
  children,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = actualImage;
    img.onload = () => setIsLoaded(true);
  }, [actualImage]);

  return (
    <div
      className={`relative ${className}`}
      style={{
        ...style,
        transition: `opacity 300ms ease-in-out`,
      }}
    >
      {/* Placeholder Layer */}
      <div
        className="absolute inset-0"
        style={{
          background: placeholder.startsWith('http')
            ? `url(${placeholder})`
            : placeholder,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: isLoaded ? 0 : 1,
          transition: `opacity 300ms ease-in-out`,
        }}
      ></div>

      {/* Actual Image Layer */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${actualImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: isLoaded ? 1 : 0,
          transition: `opacity 300ms ease-in-out`,
        }}
      ></div>

      {/* Children Content */}
      {children}
    </div>
  );
};

export default BackgroundImage;
