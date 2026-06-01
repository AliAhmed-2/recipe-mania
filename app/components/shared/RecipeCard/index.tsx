import { Heading, Icon, Button } from '~/components';
import { getColorFromPrice } from '~/utils';
import { RecipeCardProps } from './types';
import { useFetcher, useNavigate } from '@remix-run/react';
import ImageWithPlaceholder from '../Image';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const RecipeCard: React.FC<RecipeCardProps> = ({
  image,
  title,
  cookingTime,
  servings,
  score,
  id,
  healthy,
  dairyFree,
  pricePerServing,
  user,
  favorite,
  handleFavoriteRemove = null,
}) => {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const [animate, setAnimate] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    setIsFavorite(favorite);
  }, []);

  const handleRecipeClick = () => {
    navigate(`/recipe/${id}`);
  };

  const handleToggleFavorite = (e: { stopPropagation: () => void }) => {
    setAnimate(true);
    setIsFavorite(!isFavorite);
    const toastId = 'favorite-prompt'; // to prevent duplicate toasts
    e.stopPropagation();

    if (!user) {
      toast(
        <div className="flex flex-col items-start justify-start gap-2 font-primary text-primary-800">
          Please create an account add favorites! 🍕
          <div className="flex gap-2 self-end">
            <Button
              type="secondary"
              buttonText={'Signup'}
            />
          </div>
        </div>,
        {
          toastId: toastId,
          position: 'bottom-right',
          autoClose: 5000,
          pauseOnHover: true,
          transition: Bounce,
          progressStyle: { background: '#C57D5D' },
        },
      );
      return;
    }

    if (isFavorite && handleFavoriteRemove) {
      handleFavoriteRemove(id);
    }

    fetcher.submit(
      { id, favorite: !isFavorite, email: user.email },
      { method: 'post', action: '/actions/toggle-favorite' },
    );
  };

  return (
    <div
      onClick={handleRecipeClick}
      data-testid="recipe-card"
      className="relative flex h-fit w-[80%] cursor-pointer flex-col bg-white pb-3 ring-1 ring-gray-300 transition-all hover:ring-primary-200 xxs:min-w-[18rem] xxs:max-w-[18rem] xs:min-w-72 xs:max-w-72 md:min-w-80 md:max-w-80"
    >
      <div className="absolute right-2 top-2 flex w-full gap-2 pl-4">
        <button
          className="flex-center glass z-10 mr-auto rounded-full p-1"
          onClick={handleToggleFavorite}
          onAnimationEnd={() => setAnimate(false)}
        >
          {isFavorite ? (
            <IoMdHeart
              size={22}
              className={`relative top-[0.05rem] ${animate ? 'animate-favorite' : ''}`}
              color=" rgb(255, 65, 108)"
            />
          ) : (
            <IoMdHeartEmpty
              size={22}
              className={`relative top-[0.05rem] ${animate ? 'animate-favorite-remove' : ''}`}
              color=" rgb(255, 65, 108)"
            />
          )}
        </button>
        {healthy && (
          <div className="z-10 rounded bg-green-200 bg-opacity-85 p-1 px-2 text-sm text-green-700">
            Healthy
          </div>
        )}
        {dairyFree && (
          <div className="z-10 rounded bg-blue-200 bg-opacity-85 p-1 px-2 text-sm text-blue-700">
            Dairy-free
          </div>
        )}
      </div>

      <div className="relative h-56 w-full overflow-hidden rounded-md">
        <ImageWithPlaceholder
          src={image}
          alt={`recipe-${title}`}
          placeholder="#ffe9d2"
          className="h-full w-full object-cover transition-all hover:h-[102%]"
          wrapperClassName="absolute inset-0"
        />
      </div>
      <div className="flex flex-col gap-2 px-4">
        <Heading
          content={`${title.split(' ').slice(0, 6).join(' ')}`}
          type={'recipe'}
          className="my-0 mb-0"
        />
        <div className="flex w-full items-center justify-between gap-6">
          <div className="flex-center gap-2">
            <Icon fileName={'serving'} />
            <p className="font-light text-paragraph">{servings} Servings</p>
          </div>
          <div className="flex-center gap-2">
            <Icon fileName={'cooking_time'} />
            <p className="font-light text-paragraph">{cookingTime} Minutes</p>
          </div>
        </div>
        <div className="flex items-center">
          <p className="font-light opacity-80">
            Food score:{' '}
            <span
              className="font-medium text-green-800"
              data-testid="food-score"
            >
              {Math.floor(score)}
            </span>
          </p>
          <p
            className={`ml-auto text-sm font-semibold ${getColorFromPrice(pricePerServing)}`}
          >
            ${Math.floor(pricePerServing)}{' '}
            <span className="font-light text-black opacity-70">
              Per Serving
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
