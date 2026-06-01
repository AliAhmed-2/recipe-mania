import { RecipeStatProps } from './types';
import { Icon } from '~/components';

const RecipeStat: React.FC<RecipeStatProps> = ({
  title,
  icon,
  value,
  subtitle,
}) => {
  return (
    <div className="flex items-center gap-4">
      <Icon
        fileName={icon}
        size="xl"
      />
      <div className="flex flex-col">
        <p>{title}</p>
        <p className="text-xl font-semibold text-primary-700">
          {value}{' '}
          <span className="text-xs font-normal text-black opacity-75">
            {subtitle}
          </span>
        </p>
      </div>
    </div>
  );
};

export default RecipeStat;
