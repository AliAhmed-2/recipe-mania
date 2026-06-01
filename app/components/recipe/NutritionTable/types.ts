export interface NutritionTableProps {
  values: { [key: string]: string | number }[];
  caloricBreakdown: { [key: string]: number };
}
