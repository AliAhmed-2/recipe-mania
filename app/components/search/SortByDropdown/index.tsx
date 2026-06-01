import React from 'react';
import Select, { StylesConfig } from 'react-select';
import { OptionInterface } from '~/interfaces';
import { DropdownSelectProps } from './types';
import { sortOptions } from './constants';

export const SortByDropdown: React.FC<DropdownSelectProps> = ({ onChange }) => {
  const customStyles: StylesConfig<OptionInterface, false> = {
    control: (provided) => ({
      ...provided,
      'background': 'white',
      'boxShadow': 'none',
      '&:hover': {
        borderColor: 'transparent',
      },
      'border': 'none',
      'borderRadius': '0.375rem',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#C57D5D',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    option: (provided, state) => ({
      ...provided,
      'backgroundColor': state.isSelected
        ? '#C57D5D'
        : state.isFocused
          ? '#f4e7e2'
          : 'white',
      'color': state.isSelected ? 'white' : '#333',
      '&:hover': {
        backgroundColor: '#f4e7e2',
        color: '#333',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
    }),
  };

  return (
    <div className="xs:w-64 flex w-72 items-center justify-between gap-2">
      <label className="text-sm text-gray-500">Sort by:</label>
      <Select
        options={sortOptions}
        styles={customStyles}
        placeholder="Select option..."
        className="react-select-container self-start"
        classNamePrefix="react-select"
        isSearchable
        onChange={onChange}
      />
    </div>
  );
};
