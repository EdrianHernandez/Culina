
import React from 'react';
import { NutritionInfo } from '../types';

interface NutritionFactsProps {
  nutrition: NutritionInfo;
}

const NutritionFacts: React.FC<NutritionFactsProps> = ({ nutrition }) => {
  const facts = [
    { label: 'Calories', value: nutrition.calories, unit: 'kcal' },
    { label: 'Protein', value: nutrition.protein, unit: 'g' },
    { label: 'Carbs', value: nutrition.carbs, unit: 'g' },
    { label: 'Fats', value: nutrition.fats, unit: 'g' },
    { label: 'Fiber', value: nutrition.fiber, unit: 'g' },
    { label: 'Sugar', value: nutrition.sugar, unit: 'g' },
  ];

  return (
    <div className="nutrition-container bg-stone-950 text-white p-10 md:p-12 rounded-[2rem] shadow-2xl border border-white/5 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[4rem] pointer-events-none" />
      
      <h3 className="text-2xl font-serif font-bold mb-10 flex items-center gap-3">
        <span className="text-stone-500 font-sans text-xs uppercase tracking-[0.3em] font-bold">Nutritional Profile</span>
      </h3>
      
      <table className="nutrition-table w-full text-left">
        <thead>
          <tr className="text-stone-600 text-[10px] uppercase tracking-[0.2em] font-black">
            <th className="pb-6">Nutrition Factor</th>
            <th className="pb-6 text-right">Per Portion</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {facts.map((fact) => (
            <tr key={fact.label} className="nutrition-row group hover:bg-white/[0.03] transition-colors">
              <td className="py-6 font-medium text-stone-400 text-lg">{fact.label}</td>
              <td className="py-6 text-right">
                <span className="text-2xl font-bold text-white font-mono tracking-tighter">
                  {fact.value.replace(/[a-zA-Z]/g, '')}
                </span>
                <span className="text-xs text-stone-600 ml-1.5 font-mono uppercase font-bold">
                  {fact.unit}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10">
        <p className="text-[11px] text-stone-500 leading-relaxed uppercase tracking-wider text-center">
          * AI-Calculated estimates. Actual values may fluctuate based on brand selection and cooking duration.
        </p>
      </div>
    </div>
  );
};

export default NutritionFacts;
