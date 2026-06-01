import {
  cuisineOptions,
  dietOptions,
  mealOptions,
} from '~/components/search/Filters/constants';
import { Logo } from '../Logo';
import { FooterMenu } from './FooterMenu';

export const Footer = () => {
  return (
    <div
      id="footer"
      data-testid="footer"
      className="bg-light mt-0 flex w-full flex-col border-gray-300"
    >
      <div className="flex w-full flex-col items-center justify-between gap-8 border-t bg-white px-12 py-8 md:flex-row md:gap-0 md:px-48">
        {/* Footer Left */}
        <div className="px-18 flex flex-col items-center gap-4 md:w-1/2 md:items-start">
          <div className="flex flex-col gap-1">
            <Logo size="lg" />
            <h2 className="text-2xl text-[#88482d]">Recipe Mania</h2>
          </div>
          <p className="text-center opacity-60 md:text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            ullamcorper volutpat est ac ultrices. Curabitur ornare nisl orci,
            nec auctor elit bibendum nec.
          </p>
        </div>
        {/* Footer Right */}
        <div className="flex gap-12">
          <FooterMenu
            title={'Cuisines'}
            searchParam="cuisine"
            menuItems={cuisineOptions.slice(0, 5)}
          />
          <FooterMenu
            title={'Diets'}
            searchParam={'diet'}
            menuItems={dietOptions}
          />
          <FooterMenu
            title={'Meals'}
            searchParam={'type'}
            menuItems={mealOptions}
          />
        </div>
      </div>
    </div>
  );
};
