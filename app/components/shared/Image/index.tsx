import React, { useEffect, useState } from 'react';
import { ImageWithPlaceholderProps } from './types';
import { Logo } from '~/components';

const ImageWithPlaceholder: React.FC<ImageWithPlaceholderProps> = ({
  src,
  alt,
  placeholder = '#1f2937',
  className = '',
  wrapperClassName = '',
  style = {},
  wrapperStyle = {},
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;

    if (img.complete) {
      setIsLoaded(true);
    } else {
      img.onload = () => setIsLoaded(true);
      img.onerror = () => console.error(`Failed to load image: ${src}`);
    }
  }, [src]);

  return (
    <div
      className={`relative overflow-hidden ${wrapperClassName} h-full`}
      style={{
        ...wrapperStyle,
        transition: `opacity 300ms ease-in-out`,
      }}
    >
      <div
        className={`flex-center absolute inset-0 transition-opacity duration-300 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          background: placeholder.startsWith('http')
            ? `url(${placeholder})`
            : placeholder,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Logo className="h-28 w-28 animate-pulse" />
      </div>

      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        style={style}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default ImageWithPlaceholder;
