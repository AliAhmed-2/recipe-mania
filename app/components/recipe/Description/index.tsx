import ImageWithPlaceholder from '~/components/shared/Image';
import RecipeStat from './RecipeStat';
import { DescriptionProps } from './types';
import parse from 'html-react-parser';
import { Heading } from '~/components';

export const Description: React.FC<DescriptionProps> = ({
  image,
  readyInMinutes,
  servings,
  pricePerServing,
  summary,
}) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="relative h-[26rem] w-full overflow-hidden rounded-md">
        <ImageWithPlaceholder
          src={image}
          alt={`recipe-${image}`}
          placeholder="#ffe9d2"
          className="h-full w-full object-cover transition-all hover:h-[102%]"
          wrapperClassName="absolute inset-0"
        />
      </div>
      <div className="flex justify-center gap-16">
        <RecipeStat
          icon={'cooking_time'}
          title={'Ready In'}
          value={readyInMinutes}
          subtitle={'mins'}
        />
        <RecipeStat
          icon={'serving'}
          title={'Servings'}
          value={servings}
          subtitle={'person'}
        />
        <RecipeStat
          icon={'price_serving'}
          title={'Price per Serving'}
          value={pricePerServing}
          subtitle={'USD'}
        />
      </div>
      <div>
        <Heading
          content={'Summary'}
          type={'section'}
          className="!mt-0 mb-4"
        />
        <p className="text-lg leading-7 text-gray-700 opacity-85 sm:text-sm">
          {parse(summary)}
        </p>
      </div>
    </div>
  );
};
