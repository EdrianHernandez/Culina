import React from 'react';
import { Difficulty } from '../types';

const RecipeHero = ({ 
  title, 
  description, 
  imageUrl, 
  cookingTime, 
  difficulty, 
  servings 
}) => {
  const difficultyColor = {
    [Difficulty.Easy]: 'bg-emerald-100 text-emerald-800',
    [Difficulty.Medium]: 'bg-amber-100 text-amber-800',
    [Difficulty.Hard]: 'bg-rose-100 text-rose-800',
  };

  return (
    <div className="recipe-hero-container relative w-full animate-fade-in group">
      <div className="relative h-[500px] md:h-[700px] w-full overflow-hidden rounded-[2.5rem] shadow-2xl">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />
        
        <div className="absolute bottom-0 left-0 p-8 md:p-16 text-white w-full max-w-5xl">
          <div className="flex flex-wrap gap-4 mb-8">
            <span className="badge-time px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl text-sm font-semibold border border-white/20 flex items-center gap-2.5">
              <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              {cookingTime}
            </span>
            <span className={`badge-difficulty px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest ${difficultyColor[difficulty]}`}>
              {difficulty}
            </span>
            <span className="badge-servings px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl text-sm font-semibold border border-white/20 flex items-center gap-2.5">
               <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              {servings} Servings
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-serif font-bold mb-6 drop-shadow-2xl leading-[0.9] tracking-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-stone-200/90 max-w-3xl font-light leading-relaxed drop-shadow-lg">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeHero;
