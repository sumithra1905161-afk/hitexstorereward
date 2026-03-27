import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { faqs } from '@/lib/mockDataEnhanced';
import { enhancements_en, enhancements_hi } from '@/lib/translationsEnhanced';

export const FAQSection = () => {
  const { lang } = useLanguage();
  const te = lang === 'hi' ? enhancements_hi : enhancements_en;
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'earning', 'withdrawal', 'referral', 'membership', 'rewards'];
  
  const filteredFaqs = selectedCategory === 'all'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <section className="px-6 py-20 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4">
          {te.faq.title}
        </h2>
      </div>
      
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-md text-sm font-semibold uppercase tracking-wide transition-colors ${
              selectedCategory === cat
                ? 'bg-[#10B981] text-black'
                : 'bg-transparent border border-[#222222] text-[#A1A1AA] hover:border-[#10B981] hover:text-[#10B981]'
            }`}
          >
            {te.faq.categories[cat]}
          </button>
        ))}
      </div>
      
      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq) => (
          <div
            key={faq.id}
            className="bg-[#09090B] border border-[#222222] rounded-lg overflow-hidden hover:border-[#10B981] transition-colors"
          >
            <button
              onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
              className="w-full px-6 py-4 flex items-center justify-between text-left"
            >
              <span className="text-white font-semibold">
                {lang === 'hi' ? faq.questionHi : faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-[#10B981] transition-transform ${
                  openFaq === faq.id ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openFaq === faq.id && (
              <div className="px-6 pb-4 text-[#A1A1AA] leading-relaxed">
                {lang === 'hi' ? faq.answerHi : faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
