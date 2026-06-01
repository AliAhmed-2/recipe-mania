import { RatingProps } from './types';
import { Icon } from '~/components';

export const Rating: React.FC<RatingProps> = ({ score }) => {
  const ratingPoints = Math.round(score / 10);
  const totalPoints = 10;

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[...Array(totalPoints)].map((_, index) =>
          index < ratingPoints ? (
            <Icon
              key={index + ratingPoints}
              fileName={'fire-rating-active'}
            />
          ) : (
            <Icon
              key={index + ratingPoints}
              fileName={'fire-rating'}
            />
          ),
        )}
      </div>

      <span className="text-xs font-medium text-primary-800 opacity-80">
        ({ratingPoints} / {totalPoints})
      </span>
    </div>
  );
};
