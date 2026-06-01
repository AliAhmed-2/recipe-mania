import { ActionFunction, json } from '@remix-run/node';
import prisma from '../../prisma/index';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const recipeId = Number(formData.get('id'));
  const isFavorite = formData.get('favorite') === 'true';
  const email = String(formData.get('email'));

  try {
    const user = await prisma.user.findFirst({ where: { email } });
    console.log('user', user);
    if (!user) {
      throw new Error(
        'Something went wrong. Please try again after refreshing the page.',
      );
    }
    let favorites = user.favorite_recipes;

    // adding as favorite
    if (isFavorite && !favorites.includes(recipeId)) {
      favorites.push(recipeId);
    }

    // removing as favorite
    if (!isFavorite && favorites.includes(recipeId)) {
      favorites = favorites.filter((id) => id !== recipeId);
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { favorite_recipes: favorites },
    });

    return json({
      success: true,
      message: 'Action performed successfully.',
      user: updatedUser,
    });
  } catch (error) {
    throw new Error(`Something went wrong. Details: ${error}`);
  }
};

export function shouldRevalidate() {
  return false;
}
