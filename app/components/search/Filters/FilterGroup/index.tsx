import React, { useState, useRef, useEffect } from 'react';
import { IoMdCheckmark } from 'react-icons/io';
import { FilterGroupProps } from '~/interfaces';

const FilterGroup: React.FC<FilterGroupProps> = ({
  title,
  options,
  onChange,
  preSelected,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  useEffect(() => {
    if (preSelected?.length) {
      setSelectedOptions(preSelected);
      setIsExpanded(true);
    }
  }, [preSelected]);

  const handleCheckboxChange = (option: string) => {
    let updatedOptions;
    if (selectedOptions.includes(option)) {
      updatedOptions = selectedOptions.filter((item) => item !== option);
    } else {
      updatedOptions = [...selectedOptions, option];
    }
    setSelectedOptions(updatedOptions);
    onChange(updatedOptions);
  };

  return (
    <div className="mb-4">
      <div
        className="flex cursor-pointer items-center justify-between border-b border-gray-300 py-3"
        onClick={toggleExpand}
      >
        <h3 className="text-base font-medium xs:text-lg">{title}</h3>
        <span className="transform text-xl transition-transform duration-200">
          {isExpanded ? '-' : '+'}
        </span>
      </div>
      <div
        ref={contentRef}
        className={`transition-max-height overflow-hidden duration-300 ease-in-out ${
          isExpanded ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="mt-2 pl-3 pt-2">
          {options.map((option) => (
            <label
              key={option.value}
              className="mb-4 flex cursor-pointer items-center justify-between space-x-2"
            >
              <span
                className={`select-none ${selectedOptions.includes(option.value) ? 'text-primary-500' : 'text-gray-600'}`}
              >
                {option.label}
              </span>
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  value={option.value}
                  checked={selectedOptions.includes(option.value)}
                  onChange={() => handleCheckboxChange(option.value)}
                  className="h-4 w-4 appearance-none rounded border-2 border-gray-300 bg-white transition-colors duration-200 ease-in-out checked:border-primary-500 checked:bg-primary-500 focus:outline-none"
                />
                {selectedOptions.includes(option.value) && (
                  <IoMdCheckmark className="pointer-events-none absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform text-white" />
                )}
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterGroup;
