import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motivationalQuotes } from '@/data/mockData';

export const QuoteCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % motivationalQuotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextQuote = () => {
    setCurrentIndex((prev) => (prev + 1) % motivationalQuotes.length);
    setIsAutoPlaying(false);
  };

  const prevQuote = () => {
    setCurrentIndex((prev) => (prev - 1 + motivationalQuotes.length) % motivationalQuotes.length);
    setIsAutoPlaying(false);
  };

  const goToQuote = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 shadow-soft border border-border/50">
        <div className="flex items-center justify-center mb-6">
          <Quote className="w-8 h-8 text-primary opacity-50" />
        </div>

        <div className="relative h-32 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="text-center space-y-4"
            >
              <blockquote className="text-lg md:text-xl font-medium text-foreground leading-relaxed">
                "{motivationalQuotes[currentIndex].text}"
              </blockquote>
              <cite className="text-sm text-muted-foreground font-medium">
                — {motivationalQuotes[currentIndex].author}
              </cite>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevQuote}
            className="hover:bg-primary/10"
            aria-label="Previous quote"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex space-x-2">
            {motivationalQuotes.map((_, index) => (
              <button
                key={index}
                onClick={() => goToQuote(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary w-6'
                    : 'bg-primary/30 hover:bg-primary/50'
                }`}
                aria-label={`Go to quote ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextQuote}
            className="hover:bg-primary/10"
            aria-label="Next quote"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Auto-play indicator */}
        {isAutoPlaying && (
          <motion.div
            className="absolute bottom-2 right-2 text-xs text-muted-foreground"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Auto-playing
          </motion.div>
        )}
      </div>
    </div>
  );
};