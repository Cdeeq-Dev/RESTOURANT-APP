import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Sparkles } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  subtitle: string;
  stepName: string;
  icon?: React.ReactNode;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  subtitle,
  stepName,
  icon,
}) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <div className="glass-panel p-10 md:p-14 rounded-3xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto mb-6">
          {icon || <Clock className="w-8 h-8" />}
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Step Implementation Placeholder ({stepName})</span>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
          {title}
        </h1>

        <p className="text-slate-300 text-sm md:text-base max-w-lg mx-auto mb-8 font-light leading-relaxed">
          {subtitle}
        </p>

        <Link
          to="/"
          className="glass-btn-primary px-8 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Menu</span>
        </Link>
      </div>
    </div>
  );
};
