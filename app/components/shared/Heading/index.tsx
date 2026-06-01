import React from 'react';
import { HeadingProps } from './types';

export const Heading: React.FC<HeadingProps> = ({
  type,
  className = '',
  id,
  content,
}) => {
  const tagMap = {
    section: 'h2',
    page: 'h1',
    recipe: 'h3',
    main: 'h1',
  } as const;

  // Getting heading tag according to heading type
  const HeadingTag = tagMap[type] || 'h3';

  return (
    <HeadingTag
      id={id}
      className={`my-4 text-4xl font-semibold ${getHeadingStyle(type)} ${className}`}
    >
      {content}
    </HeadingTag>
  );
};

const getHeadingStyle = (type: string) => {
  if (type === 'page') {
    return 'text-center';
  }
  if (type === 'section') {
    return 'font-secondary text-black text-2xl font-semibold text-start text-primary-900';
  }
  if (type === 'recipe') {
    return 'font-primary text-lg font-medium text-start whitespace-nowrap	text-ellipsis overflow-hidden';
  }
};
