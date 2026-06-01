import React from 'react';
import { NutritionTableProps } from './types';

export const NutritionTable: React.FC<NutritionTableProps> = ({
  values,
  caloricBreakdown,
}) => {
  const renderValuesTable = () => {
    const headers = Object.keys(values[0]);

    const getHeaderKey = (value: string | number) => {
      if (value === 'percentOfDailyNeeds') return '% Daily';
      if (value === 'name') return 'Nutrition';
      return value;
    };

    return (
      <table className="w-full border border-gray-200 text-left text-sm">
        <thead className="">
          <tr className="bg-primary-600">
            {headers.map((header) => (
              <th
                key={header}
                className="border-b border-gray-200 p-4 text-start font-semibold capitalize text-white"
              >
                {getHeaderKey(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {values.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`hover:bg-gray-50 ${rowIndex % 2 === 0 ? 'bg-orange-gradient-100' : 'bg-orange-gradient-300'}`}
            >
              {headers.map((header) => (
                <td
                  key={header}
                  className={`border-b border-gray-200 p-4 text-start text-lg opacity-80 sm:text-base ${header === 'name' ? 'font-medium' : ''} `}
                >
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderCaloricBreakdownTable = () => {
    return (
      <table className="mt-6 w-full border border-gray-200 text-left text-sm">
        <thead>
          <tr className="bg-primary-600 text-white">
            <th className="border-b border-gray-200 p-4 text-start font-semibold">
              Nutrient
            </th>
            <th className="border-b border-gray-200 p-4 text-start font-semibold">
              Percentage
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(caloricBreakdown).map(([key, value], rowIndex) => (
            <tr
              key={key}
              className={`hover:bg-gray-50 ${rowIndex % 2 === 0 ? 'bg-orange-gradient-100' : 'bg-orange-gradient-300'}`}
            >
              <td className="border-b border-gray-200 p-4 text-start text-lg font-medium capitalize opacity-80 sm:text-base">
                {key?.replace('percent', '')}
              </td>
              <td className="border-b border-gray-200 p-4 text-start text-lg opacity-80 sm:text-base">
                {value as number}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="m-4 mt-0">
      {values && renderValuesTable()}
      {caloricBreakdown && renderCaloricBreakdownTable()}
    </div>
  );
};

export default NutritionTable;
