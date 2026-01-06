
import React, { useState, useEffect } from 'react';
import { Recipe, Difficulty } from './types';
import { generateRecipe } from './services/geminiService';
import RecipeHero from './components/RecipeHero';
import IngredientList from './components/IngredientList';
import StepByStepInstructions from './components/StepByStepInstructions';
import NutritionFacts from './components/NutritionFacts';

const DEFAULT_RECIPE: Recipe = {
  id: 'initial',
  title: 'Wild Mushroom Risotto',
  description: 'A creamy, classic Italian arborio rice dish infused with earthy porcini mushrooms, finished with aromatic truffle oil and aged parmesan.',
  cookingTime: '45 mins',
  difficulty: Difficulty.Medium,
  servings: 4,
  imageUrl: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=1200&h=600&auto=format&fit=crop',
  ingredients: [
    { id: '1', item: 'Arborio Rice', amount: '2 cups' },
    { id: '2', item: 'Vegetable Broth', amount: '6 cups' },
    { id: '3', item: 'Mixed Wild Mushrooms', amount: '1 lb' },
    { id: '4', item: 'Shallots', amount: '2, minced' },
    { id: '5', item: 'Dry White Wine', amount: '1/2 cup' },
    { id: '6', item: 'Parmesan Cheese', amount: '1/2 cup' },
    { id: '7', item: 'Butter', amount: '4 tbsp' }
  ],
  steps: [
    { instruction: 'Bring broth to a simmer in a saucepan and keep warm.', isCompleted: false },
    { instruction: 'Sauté mushrooms in 2 tbsp butter until golden, then set aside.', isCompleted: false },
    { instruction: 'Melt remaining butter, sauté shallots until translucent.', isCompleted: false },
    { instruction: 'Add rice and toast for 2 minutes until edges are clear.', isCompleted: false },
    { instruction: 'Add wine and stir until fully absorbed.', isCompleted: false },
    { instruction: 'Add warm broth one ladle at a time, stirring constantly until absorbed.', isCompleted: false },
    { instruction: 'Stir in mushrooms and parmesan once rice is al dente.', isCompleted: false }
  ],
  nutrition: {
    calories: '420',
    protein: '12g',
    carbs: '58g',
    fats: '14g',
    fiber: '3g',
    sugar: '2g'
  }
};

const App: React.FC = () => {
  const [recipe, setRecipe] = useState<Recipe>(DEFAULT_RECIPE);
  const [searchQuery, setSearchQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsGenerating(true);
    try {
      const newRecipe = await generateRecipe(searchQuery);
      setRecipe(newRecipe);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Failed to generate recipe:', error);
      alert('Could not find that recipe. Try something like "Lemon Garlic Salmon".');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbf7] pb-24 selection:bg-stone-200">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-2xl border-b border-stone-100/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 md:h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-stone-900 rounded-2xl flex items-center justify-center shadow-lg shadow-stone-900/10">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            </div>
            <span className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-stone-900">Culina</span>
          </div>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-12">
            <div className="relative w-full group">
              <input
                type="text"
                placeholder="What are we cooking today?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-100/80 border-transparent focus:bg-white focus:ring-4 focus:ring-stone-100 focus:border-stone-200 transition-all rounded-full px-8 py-4 text-stone-800 placeholder-stone-400 pl-14"
              />
              <svg className="w-6 h-6 absolute left-5 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-stone-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </form>

          <button className="px-8 py-3 bg-stone-900 text-white rounded-full font-semibold hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/10 active:scale-95">
            Sign In
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-16">
        {isGenerating ? (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center animate-pulse">
            <div className="w-24 h-24 mb-8 relative">
              <div className="absolute inset-0 border-4 border-stone-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-stone-900 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h2 className="text-4xl font-serif font-bold text-stone-800 mb-3">Crafting your recipe...</h2>
            <p className="text-stone-500 text-lg">Curating the finest methods and measurements.</p>
          </div>
        ) : (
          <div className="space-y-16 md:space-y-24">
            <RecipeHero 
              title={recipe.title}
              description={recipe.description}
              imageUrl={recipe.imageUrl}
              cookingTime={recipe.cookingTime}
              difficulty={recipe.difficulty}
              servings={recipe.servings}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
              {/* Left Column: Ingredients & Nutrition */}
              <div className="lg:col-span-4 space-y-12 lg:sticky lg:top-32">
                <IngredientList ingredients={recipe.ingredients} />
                <NutritionFacts nutrition={recipe.nutrition} />
              </div>

              {/* Right Column: Instructions */}
              <div className="lg:col-span-8">
                <StepByStepInstructions steps={recipe.steps} />
                
                {/* Community/Social Section Placeholder */}
                <div className="mt-16 p-10 rounded-3xl bg-stone-100 border border-stone-200">
                  <h4 className="text-2xl font-serif font-bold text-stone-900 mb-6 flex items-center gap-3">
                    <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    Chef's Notes
                  </h4>
                  <p className="text-stone-600 text-lg leading-relaxed font-light italic">
                    "When preparing this dish, always ensure your ingredients are at room temperature. The subtle textures depend on consistent heat distribution during the emulsification phase. Don't rush the process; the best results come from patience."
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Search Bar (Sticky Bottom) */}
      <div className="md:hidden fixed bottom-8 left-6 right-6 z-50">
        <form onSubmit={handleSearch} className="relative shadow-2xl">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-stone-200 shadow-2xl rounded-full px-8 py-5 pr-20 focus:ring-4 focus:ring-stone-100 outline-none text-lg"
          />
          <button 
            type="submit"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-12 h-12 bg-stone-900 rounded-full flex items-center justify-center text-white shadow-lg shadow-stone-900/20 active:scale-90 transition-transform"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
        </form>
      </div>

      {/* Simple Footer */}
      <footer className="mt-32 pt-24 pb-16 border-t border-stone-100 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <p className="font-serif italic text-xl text-stone-400 mb-8">Crafted for culinary enthusiasts worldwide.</p>
          <div className="flex justify-center gap-12 text-sm font-semibold text-stone-500 uppercase tracking-widest">
            <a href="#" className="hover:text-stone-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-stone-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-stone-900 transition-colors">Contact</a>
          </div>
          <p className="mt-12 text-stone-300 text-xs tracking-tighter uppercase">© 2024 Culina Digital. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
