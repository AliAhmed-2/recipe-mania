import { Heading, Icon } from '~/components';
import { getColorFromPrice } from '~/utils';

export function RecipeOfTheWeek() {
  return (
    <div
      id="recipe-of-the-week"
      data-testid="recipe-of-the-week"
      className="mb-12 gap-4 px-12 py-14 md:px-32"
    >
      <Heading
        content={'Recipe of the Week'}
        type={'section'}
        className="text-start"
      />
      <p className="font-lg text-paragraph">
        Satisfy your cravings in a flash! Explore our Quick & Easy Meals for
        effortless recipes without compromising on mouthwatering taste.
      </p>
      {/* Recipe of the week card */}
      <div className="mt-12 flex flex-col gap-6 md:flex-row md:gap-0">
        {/* Recipe Image */}
        <div className="relative h-[32rem] overflow-hidden rounded-md md:w-1/2">
          <img
            src="/images/recipe-week.jpg"
            alt="recipe-of-the-week"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        {/* Recipe Information */}
        <div className="flex flex-col gap-6 py-2 md:w-1/2 md:pl-8 md:pr-14">
          <h3 className="flex flex-col font-secondary text-4xl font-semibold">
            Grilled Lemon Garlic Chicken
          </h3>
          <div className="flex w-full items-center justify-between gap-6">
            <div className="flex-center gap-2">
              <Icon fileName={'serving'} />
              <p className="font-light text-paragraph">{12} Servings</p>
            </div>
            <div className="flex-center gap-2">
              <Icon fileName={'cooking_time'} />
              <p className="font-light text-paragraph">{90} Minutes</p>
            </div>
          </div>
          <div className="flex items-center">
            <p className="text-lg font-light opacity-80">
              Food score:{' '}
              <span className="font-medium text-green-800">
                {Math.floor(78)}
              </span>
            </p>
            <p
              className={`ml-auto text-lg font-semibold ${getColorFromPrice(129)}`}
              data-testid="price"
            >
              ${Math.floor(129)}{' '}
              <span className="font-light text-black opacity-70">
                Per Serving
              </span>
            </p>
          </div>
          <p className="text text-lg leading-8 opacity-90">
            This recipe <b>covers 31%</b> of your daily requirements of vitamins
            and minerals. One serving contains <b>670 calories</b>,{' '}
            <b>43g of protein</b>, and <b>24g of fat</b>. 6 people found this
            recipe to be yummy and satisfying. If you have garlic cloves, flat
            parsely, chicken thighs, and a few other ingredients on hand, you
            can make it. It is brought to you by Foodista. This recipe is
            typical of European cuisine. From preparation to the plate, this
            recipe takes around <b>45 minutes</b>. It is a good option if you're
            following a <b>dairy free</b> diet. Taking all factors into account,
            this recipe <b>earns a spoonacular score of 78%</b>, which is good.
          </p>
        </div>
      </div>
    </div>
  );
}
