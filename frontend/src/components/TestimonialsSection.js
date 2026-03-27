import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { testimonials } from '@/lib/mockDataEnhanced';
import { formatCurrency } from '@/lib/utils';
import { enhancements_en, enhancements_hi } from '@/lib/translationsEnhanced';

export const TestimonialsSection = () => {
  const { lang } = useLanguage();
  const te = lang === 'hi' ? enhancements_hi : enhancements_en;

  return (
    <section className="px-6 py-20 bg-[#09090B] border-y border-[#222222]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4">
            {te.testimonials.title}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[#000000] border border-[#222222] rounded-lg p-6 hover:border-[#10B981] transition-colors space-y-4"
            >
              {/* Rating */}
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>
              
              {/* Quote */}
              <p className="text-[#A1A1AA] leading-relaxed text-sm italic">
                "{lang === 'hi' ? testimonial.quoteHi : testimonial.quote}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#222222]">
                <img
                  src={testimonial.avatar_url}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-white font-bold text-sm">
                    {lang === 'hi' ? testimonial.nameHi : testimonial.name}
                  </p>
                  <p className="text-[#71717A] text-xs">
                    {lang === 'hi' ? testimonial.companyHi : testimonial.company}
                  </p>
                  <p className="text-[#10B981] text-xs font-semibold mt-1">
                    {te.testimonials.earned}: {formatCurrency(testimonial.earned)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
