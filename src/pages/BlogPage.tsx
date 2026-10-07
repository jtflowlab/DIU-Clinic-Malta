import React, { useState } from 'react';
import { 
  ChevronRight, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  Sparkles,
  BookOpen,
  X
} from 'lucide-react';
import { blogPosts, getAssetUrl } from '@/data/clinicData';
import { BlogPost } from '@/types';

interface BlogPageProps {
  onOpenBooking: (defaults?: any) => void;
  onNavigate: (route: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  onOpenBooking,
  onNavigate
}) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', 'Anxious Patient Care', 'Cosmetic & Digital Dentistry', 'Implantology & Surgery', 'Restorative Technology'];

  const filteredPosts = blogPosts.filter(p => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <div className="pt-24 pb-28 bg-[#F8FAFC] text-slate-900 font-body">
      
      {/* 1. Header Banner */}
      <section className="bg-white border-b border-slate-200 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
            <button 
              onClick={() => onNavigate('/')}
              className="hover:text-[#0E2B4C] cursor-pointer bg-transparent border-none p-0"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#0E2B4C] font-bold">Blog &amp; Dental Guides</span>
          </div>

          <div className="max-w-3xl">
            <span className="inline-block px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#2BB4A7] text-xs font-bold uppercase tracking-wider mb-3">
              Patient Education &amp; Clinical Guides
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#0E2B4C] font-heading mb-6 leading-tight">
              Dental Insights, Care Guides <br />
              <span className="text-[#2BB4A7]">&amp; Clinical Advice</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
              Expert articles and clinical explanations authored by our specialist dental team at St. James Hospital in Sliema, Malta.
            </p>
          </div>

        </div>
      </section>

      {/* 2. Blog Posts Grid & Filter */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2.5 mb-12 pb-4 border-b border-slate-200">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  activeCategory === cat
                    ? 'bg-[#0E2B4C] text-white border-[#0E2B4C] shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat === 'all' ? 'All Articles' : cat}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={getAssetUrl(post.image)}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0E2B4C] text-[11px] font-bold uppercase tracking-wider border border-slate-200 shadow-2xs">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#2BB4A7]" />
                        <span>{post.readTime}</span>
                      </span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-[#0E2B4C] font-heading mb-3 group-hover:text-[#2BB4A7] transition-colors leading-snug">
                      {post.title}
                    </h2>

                    <p className="text-slate-600 text-sm leading-relaxed mb-6 font-body">
                      {post.excerpt}
                    </p>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <div>
                        <strong className="text-[#0E2B4C] font-semibold">{post.author}</strong>
                        <div className="text-[11px] text-slate-400">{post.authorRole}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 pt-0">
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="w-full py-3 rounded-full bg-[#0E2B4C] hover:bg-[#07192d] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Read Complete Article</span>
                    <ArrowRight className="w-4 h-4 text-[#2BB4A7]" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* WakeUpLead Slot Container (Reserved for future code insertion) */}
          <div id="wakeuplead-blog-container" className="rounded-3xl border border-dashed border-slate-300 p-8 text-center bg-slate-50/50 my-10">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              DiU Patient Knowledge Base
            </span>
            <p className="text-xs text-slate-500">
              Clinical articles are continuously updated by our surgical and restorative team at St. James Hospital Sliema.
            </p>
          </div>

        </div>
      </section>

      {/* Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-6 sm:p-10 text-slate-900 my-8 max-h-[90vh] overflow-y-auto border border-slate-200">
            
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer border border-slate-200 transition-colors"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="inline-block px-3 py-1 rounded-full bg-teal-50 text-[#2BB4A7] text-xs font-bold uppercase tracking-wider mb-3 border border-teal-200">
                {selectedPost.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0E2B4C] font-heading mb-3">
                {selectedPost.title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-slate-500 pb-4 border-b border-slate-100">
                <span>By <strong>{selectedPost.author}</strong> ({selectedPost.authorRole})</span>
                <span>•</span>
                <span>{selectedPost.readTime}</span>
              </div>
            </div>

            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-body mb-8">
              {selectedPost.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-[#E8F8F6] border border-[#C5EDE8] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-sm font-bold text-[#0E2B4C]">Have questions about this treatment?</div>
                <div className="text-xs text-slate-600">Consult with {selectedPost.author} at St. James Hospital.</div>
              </div>
              <button
                onClick={() => {
                  const doctorName = selectedPost.author;
                  setSelectedPost(null);
                  onOpenBooking({ doctor: doctorName });
                }}
                className="px-6 py-2.5 rounded-full bg-[#0E2B4C] text-white font-bold text-xs uppercase tracking-wider cursor-pointer shrink-0"
              >
                Book Consultation
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
