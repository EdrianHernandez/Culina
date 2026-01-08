import React from 'react';

const IngredientList = ({ ingredients }) => {
  return (
    <div className="ingredient-list-section bg-white p-10 md:p-12 rounded-[2rem] shadow-sm border border-stone-100">
      <h3 className="text-3xl font-serif font-bold text-stone-800 mb-10 flex items-center gap-4">
        <span className="w-10 h-10 rounded-2xl bg-stone-900 text-white flex items-center justify-center shadow-lg shadow-stone-900/10">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
          </svg>
        </span>
        Ingredients
      </h3>
      
      <div className="space-y-2">
        {ingredients.map((ingredient) => (
          <label 
            key={ingredient.id} 
            className="ingredient-row flex items-center justify-between group cursor-pointer py-4 px-3 -mx-3 rounded-xl hover:bg-stone-50 transition-all border-b border-stone-50 last:border-0"
          >
            <div className="flex items-center gap-5">
              <div className="relative flex items-center">
                <input 
                  type="checkbox" 
                  className="peer w-6 h-6 rounded-lg border-2 border-stone-200 text-stone-900 focus:ring-stone-400 focus:ring-offset-2 transition-all cursor-pointer appearance-none checked:bg-stone-900 checked:border-stone-900"
                />
                <svg className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-1 top-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <span className="text-stone-700 text-lg font-medium group-hover:text-stone-950 transition-colors peer-checked:text-stone-300 peer-checked:line-through">
                {ingredient.item}
              </span>
            </div>
            <span className="quantity-label text-stone-400 font-mono text-base font-medium group-hover:text-stone-600">
              {ingredient.amount}
            </span>
          </label>
        ))}
      </div>
      
      <div className="mt-12 pt-8 border-t border-stone-100 flex items-center justify-between text-stone-400 text-xs uppercase tracking-[0.2em] font-bold">
        <span>Ready for prep</span>
        <button className="text-stone-900 hover:text-stone-600 transition-colors flex items-center gap-2 group">
          Share List
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default IngredientList;
