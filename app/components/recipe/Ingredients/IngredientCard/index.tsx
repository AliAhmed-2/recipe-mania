import { useState } from 'react';
import { IngredientCardProps } from './types';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { getImagePath } from './utils';

export const IngredientCard: React.FC<IngredientCardProps> = ({
  ingredient,
}) => {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <div
      className={`flex-col-center relative w-40 cursor-pointer gap-2 rounded border-2 border-primary-600 px-2 pb-4 pt-2 transition-all ${checked ? 'bg-orange-gradient-500' : 'bg-orange-gradient-100'}`}
      onClick={() => setChecked(!checked)}
    >
      <div
        className={`absolute left-2 top-2 opacity-0 transition-opacity ${checked ? 'opacity-100' : 'opacity-0'}`}
      >
        <IoIosCheckmarkCircle
          color="#228B22"
          fontSize={24}
        />
      </div>
      <img
        src={`/images/ingredients/${getImagePath(ingredient.name)}`}
        alt=""
        height={50}
        width={50}
      />
      <div className="flex-col-center gap-1 text-gray-700">
        <p className="text-center text-xs italic">
          {ingredient.amount} {ingredient.unit}
        </p>
        {ingredient.name === 'ham' ? (ingredient.name = 'meat') : null}
        <p className="text-sm capitalize">{ingredient.name}</p>
      </div>
    </div>
  );
};
