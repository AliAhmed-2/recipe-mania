import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '~/components';
import { FilterGroupProps } from '~/interfaces';

const Chips: React.FC<FilterGroupProps> = ({
  title,
  options,
  onChange,
  icon = false,
  iconPath = '',
  disabled = false,
  page = 'search',
  preSelected = [],
}) => {
  const [isExpanded, setIsExpanded] = useState(title ? false : true);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(preSelected);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  useEffect(() => {
    if (preSelected?.length) {
      setSelectedOptions(preSelected);
      setIsExpanded(true);
    }
  }, [preSelected]);

  const handleChipsChange = (option: string) => {
    if (disabled) return;
    let updatedOptions;
    if (selectedOptions.includes(option)) {
      updatedOptions = selectedOptions.filter((item) => item !== option);
    } else {
      updatedOptions = [...selectedOptions, option];
    }
    setSelectedOptions(updatedOptions);
    onChange(updatedOptions);
  };

  const renderIcon = (name: string, active: boolean) => {
    if (active)
      return <Icon fileName={`${iconPath}/${name.replace(' ', '_')}-active`} />;
    else return <Icon fileName={`${iconPath}/${name.replace(' ', '_')}`} />;
  };

  return (
    <div className="mb-4">
      {title ? (
        <div
          className="flex cursor-pointer items-center justify-between border-b border-gray-300 py-3"
          onClick={toggleExpand}
        >
          <h3 className="text-base font-medium xs:text-lg">{title}</h3>
          <span className="transform text-xl transition-transform duration-200">
            {isExpanded ? '-' : '+'}
          </span>
        </div>
      ) : null}
      <div
        ref={contentRef}
        className={`transition-max-height overflow-hidden duration-300 ease-in-out ${
          isExpanded ? 'max-h-96' : 'max-h-0'
        }`}
        data-testid="chips-container"
      >
        <div
          className={`mt-2 flex flex-wrap gap-2 pt-2 ${page === 'search' ? 'justify-start' : 'justify-end'}`}
        >
          {options.map((option) => (
            <div
              className={`flex-center cursor-pointer select-none gap-2 rounded border px-2 py-1 text-sm transition-colors ${selectedOptions.includes(option.value) ? 'border-primary-800 bg-primary-100 text-primary-800' : 'border-gray-400 text-gray-400'} ${disabled ? 'opacity-60' : 'opacity-100'}`}
              onClick={() => handleChipsChange(option.value)}
              key={option.value}
            >
              {icon
                ? renderIcon(
                    option.value,
                    selectedOptions.includes(option.value),
                  )
                : null}
              <p className={`${page === 'profile' ? 'text-sm' : null}`}>
                {option.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chips;
