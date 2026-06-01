import { Form } from '@remix-run/react';
import { Heading, SearchInput } from '~/components';
import BackgroundImage from '~/components/shared/BackgroundImage';

export function Hero() {
  return (
    <div
      id="hero"
      aria-label="hero"
      data-testid="hero"
      className={`bg-gray-800`}
    >
      <BackgroundImage
        actualImage="/images/hero-image.png"
        className="relative"
      >
        <div className="flex-col-center h-[350px] w-full gap-20 md:h-[550px]">
          <div className="relative z-20">
            <Heading
              content={'Fuel your body & soul - '}
              type={'page'}
              className="text-white"
            />
            <Heading
              content={'find recipes that taste amazing!'}
              type={'page'}
              className="text-white"
            />
          </div>
          <Form
            className="flex-center w-full"
            method="post"
            data-testid="hero-form"
          >
            <SearchInput
              showSearchButton
              showSuggestions={true}
              placeholder="Search for recipes..."
            />
          </Form>
        </div>
      </BackgroundImage>
    </div>
  );
}
