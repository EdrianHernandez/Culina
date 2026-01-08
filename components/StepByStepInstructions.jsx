import React, { useState } from 'react';

const StepByStepInstructions = ({ steps: initialSteps }) => {
  const [steps, setSteps] = useState(initialSteps);

  const toggleStep = (index) => {
    const newSteps = [...steps];
    newSteps[index].isCompleted = !newSteps[index].isCompleted;
    setSteps(newSteps);
  };

  const completedCount = steps.filter(s => s.isCompleted).length;
  const progressPercent = (completedCount / steps.length) * 100;

  return (
    <div className="steps-container bg-white p-10 md:p-16 rounded-[2.5rem] shadow-sm border border-stone-100">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <h3 className="text-4xl font-serif font-bold text-stone-900 mb-2">Instructions</h3>
          <p className="text-stone-500 text-lg">Follow along carefully for perfect results.</p>
        </div>
        <div className="flex flex-col items-end gap-3 min-w-[200px]">
          <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-stone-900 transition-all duration-700 ease-in-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-sm font-black text-stone-900 font-mono tracking-tighter uppercase">
            Progress: {Math.round(progressPercent)}%
          </span>
        </div>
      </div>

      <div className="space-y-12">
        {steps.map((step, index) => (
          <div 
            key={index} 
            onClick={() => toggleStep(index)}
            className={`recipe-step group relative flex gap-8 p-8 md:p-10 rounded-3xl border-2 transition-all cursor-pointer hover:shadow-xl hover:shadow-stone-100/50 ${
              step.isCompleted 
                ? 'bg-stone-50 border-stone-200' 
                : 'bg-white border-transparent hover:border-stone-100'
            }`}
          >
            <div className="flex-shrink-0">
              <span className={`step-number flex items-center justify-center w-14 h-14 rounded-2xl font-serif text-2xl font-bold transition-all shadow-sm ${
                step.isCompleted 
                  ? 'bg-stone-900 text-white rotate-12 scale-90' 
                  : 'bg-stone-100 text-stone-400 group-hover:bg-stone-200 group-hover:text-stone-600'
              }`}>
                {step.isCompleted ? (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                ) : (
                  index + 1
                )}
              </span>
            </div>
            <div className="flex-grow pt-1">
              <p className={`text-xl md:text-2xl leading-[1.6] font-light transition-all ${
                step.isCompleted ? 'text-stone-300 line-through italic' : 'text-stone-800'
              }`}>
                {step.instruction}
              </p>
            </div>
            {!step.isCompleted && (
               <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                  <span className="text-stone-300 text-sm uppercase tracking-widest font-bold rotate-90 whitespace-nowrap">Check</span>
               </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepByStepInstructions;
