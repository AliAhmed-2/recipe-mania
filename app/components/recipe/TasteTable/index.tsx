import React from 'react';

import { Icon } from '~/components';

interface TasteProps {
  sweetness: number;
  saltiness: number;
  sourness: number;
  bitterness: number;
  savoriness: number;
  fattiness: number;
  spiciness: number;
}

interface TasteTableProps {
  taste: TasteProps;
}

const tastes = [
  'sweetness',
  'saltiness',
  'sourness',
  'bitterness',
  'spiciness',
];

export const TasteTable: React.FC<TasteTableProps> = ({ taste }) => (
  <div className="p-4">
    <table className="w-full border border-gray-200 text-left text-sm">
      <thead>
        <tr className="bg-primary-600 text-white">
          <th className="border-b border-gray-200 p-4 text-start font-semibold">
            Taste Scores
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(taste).map(([key, value], rowIndex) => {
          const tasteKey = key as keyof TasteProps;
          const roundedScore = Math.round(value / 10) * 10;
          const iconCount = Math.round(roundedScore / 10);

          if (!tastes.includes(tasteKey)) return;

          return (
            <tr
              key={key + rowIndex}
              className={`hover:bg-gray-50`}
            >
              <td className="p-4 text-start text-lg font-semibold capitalize opacity-80 sm:text-base">
                {tasteKey}
              </td>

              <td className="flex p-4 text-center">
                {Array.from({ length: iconCount }, (_, i) => (
                  <span key={i}>
                    {
                      <Icon
                        size="lg"
                        fileName={`tastes/${tasteKey}`}
                      />
                    }
                  </span>
                ))}
                {Array.from({ length: 10 - iconCount }, (_, i) => (
                  <span key={i}>
                    {
                      <Icon
                        size="lg"
                        fileName={`tastes/${tasteKey}`}
                        className="opacity-50 grayscale"
                      />
                    }
                  </span>
                ))}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
