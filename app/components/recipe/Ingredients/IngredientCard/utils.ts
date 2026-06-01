const ingredientMap: Record<string, string> = {
  cheese: 'cheese.png',
  salt: 'salt.png',
  pepper: 'salt.png',
  peas: 'vegetable.png',
  apple: 'vegetable.png',
  tomato: 'vegetable.png',
  apricot: 'vegetable.png',
  cream: 'cream.png',
  pasta: 'pasta.png',
  beef: 'meat.png',
  meat: 'meat.png',
  chicken: 'meat.png',
  ham: 'meat.png',
  butter: 'butter.png',
  powder: 'salt.png',
  lemon: 'lemon.svg',
  egg: 'eggs.png',
};

export const getImagePath = (ingredient: string): string => {
  for (const key in ingredientMap) {
    if (ingredient.includes(key)) {
      return ingredientMap[key];
    }
  }
  return 'general.png';
};
