import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { RxCrossCircled } from 'react-icons/rx';
import { Heading, Rating, Icon } from '~/components';
import { RecipeIntroductionProps } from './types';

export const Introduction: React.FC<RecipeIntroductionProps> = ({
  title,
  sourceName,
  spoonacularScore,
  veryHealthy,
  dairyFree,
  isHalal,
}) => {
  return (
    <div className="mb-4 flex flex-col p-4">
      {isHalal ? (
        <div className="z-10 flex items-center gap-1 self-start rounded bg-green-800 bg-opacity-85 p-1 px-2 text-green-200">
          <IoMdCheckmarkCircleOutline />
          Halal
        </div>
      ) : (
        <div className="z-10 flex items-center gap-1 self-start rounded bg-red-800 bg-opacity-85 p-1 px-2 text-red-200">
          <RxCrossCircled />
          Not Halal
        </div>
      )}
      <Heading
        content={title}
        type={'page'}
        className="my-0 text-start text-black"
      />
      <div className="flex flex-col items-start gap-4 xxs:flex-row">
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <Icon
              fileName={'user-circle'}
              size="lg"
              className="opacity-80"
            />
            <span className="font-medium text-primary-700">{sourceName}</span>
          </div>
          <Rating score={spoonacularScore} />
        </div>
        <div className="flex gap-4">
          {(true || veryHealthy) && (
            <div className="z-10 rounded bg-green-200 bg-opacity-85 p-1 px-2 text-sm text-green-700">
              Healthy
            </div>
          )}
          {(true || dairyFree) && (
            <div className="z-10 rounded bg-blue-200 bg-opacity-85 p-1 px-2 text-sm text-blue-700">
              Dairy-free
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
