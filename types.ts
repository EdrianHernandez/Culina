
export interface Ingredient {
  item: string;
  amount: string;
  id: string;
}

export interface CookingStep {
  instruction: string;
  isCompleted: boolean;
}

export interface NutritionInfo {
  calories: string;
  protein: string;
  carbs: string;
  fats: string;
  fiber: string;
  sugar: string;
}

export enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard'
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  cookingTime: string;
  difficulty: Difficulty;
  servings: number;
  ingredients: Ingredient[];
  steps: CookingStep[];
  nutrition: NutritionInfo;
  imageUrl: string;
}
