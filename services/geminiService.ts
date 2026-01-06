
import { GoogleGenAI, Type } from "@google/genai";
import { Recipe, Difficulty } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateRecipe = async (dishName: string): Promise<Recipe> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a detailed professional recipe for: ${dishName}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          cookingTime: { type: Type.STRING },
          difficulty: { type: Type.STRING, enum: ['Easy', 'Medium', 'Hard'] },
          servings: { type: Type.NUMBER },
          ingredients: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                item: { type: Type.STRING },
                amount: { type: Type.STRING }
              },
              required: ['item', 'amount']
            }
          },
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                instruction: { type: Type.STRING }
              },
              required: ['instruction']
            }
          },
          nutrition: {
            type: Type.OBJECT,
            properties: {
              calories: { type: Type.STRING },
              protein: { type: Type.STRING },
              carbs: { type: Type.STRING },
              fats: { type: Type.STRING },
              fiber: { type: Type.STRING },
              sugar: { type: Type.STRING }
            }
          }
        },
        required: ['title', 'description', 'cookingTime', 'difficulty', 'servings', 'ingredients', 'steps', 'nutrition']
      }
    }
  });

  const recipeData = JSON.parse(response.text || '{}');
  
  // Clean/transform for our app
  return {
    ...recipeData,
    id: Math.random().toString(36).substr(2, 9),
    imageUrl: `https://picsum.photos/seed/${encodeURIComponent(dishName)}/1200/600`,
    steps: recipeData.steps.map((s: any) => ({ ...s, isCompleted: false })),
    ingredients: recipeData.ingredients.map((i: any) => ({ ...i, id: Math.random().toString(36).substr(2, 5) }))
  };
};
