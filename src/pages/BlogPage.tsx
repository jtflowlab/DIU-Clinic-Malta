import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Clock, 
  ArrowRight, 
  ArrowLeft,
  Calendar,
  Share2,
  Table,
  CheckCircle2
} from 'lucide-react';
import { blogPosts, getAssetUrl } from '@/data/clinicData';
import { BlogPost } from '@/types';

interface BlogPageProps {
  onOpenBooking: (defaults?: any) => void;
  onNavigate: (route: string) => void;
  currentRoute?: string;
}

// WhatsApp Icon SVG
const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.888 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export const BlogPage: React.FC<BlogPageProps> = ({
  onOpenBooking,
  onNavigate,
  currentRoute = '/blog'
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedShare, setCopiedShare] = useState(false);

  // Determine if a single article full page is requested
  const isArticleView = currentRoute.startsWith('/blog/') && currentRoute !== '/blog';
  const articleSlug = isArticleView ? currentRoute.replace('/blog/', '').toLowerCase().trim() : null;

  const currentPost = isArticleView
    ? blogPosts.find(p => 
        p.slug.toLowerCase() === articleSlug || 
        p.id.toLowerCase() === articleSlug ||
        (articleSlug === 'veneers' && (p.slug === 'veneers' || p.id === 'worn-teeth-guide')) ||
        (articleSlug === 'digital-smile-design' && (p.slug === 'digital-smile-design' || p.id === 'dsd-works')) ||
        (articleSlug === 'implant-consultation' && p.slug === 'implant-consultation') ||
        (articleSlug === 'childs-first-visit' && p.slug === 'childs-first-visit') ||
        (articleSlug === 'nervous-patients' && p.slug === 'nervous-patients') ||
        (articleSlug === 'hygiene-visit' && p.slug === 'hygiene-visit') ||
        (articleSlug === 'csi-implants' && p.slug === 'csi-implants')
      )
    : null;

  const categories = [
    'all', 
    'Veneers & crowns', 
    'Implants', 
    'Digital Smile Design', 
    'Family dentistry', 
    'Anxious patients', 
    'Prevention'
  ];

  const filteredPosts = blogPosts.filter(p => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  const handleShareWhatsApp = (post: BlogPost) => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/blog/${post.slug}` : `https://diu-clinic-malta.vercel.app/blog/${post.slug}`;
    const text = encodeURIComponent(`Read this article from DiU Clinic Malta: ${post.title}\n${url}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleCopyLink = (post: BlogPost) => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/blog/${post.slug}` : `https://diu-clinic-malta.vercel.app/blog/${post.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  // -------------------------------------------------------------------------
  // FULL PAGE ARTICLE VIEW (Worksheet #310)
  // -------------------------------------------------------------------------
  if (isArticleView && currentPost) {
    return (
      <div className="pt-24 pb-28 bg-[#F8FAFC] text-slate-900 font-body min-h-screen">
        
        {/* Article Header Hero */}
        <section className="bg-white border-b border-slate-200 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6 flex-wrap">
              <button 
                onClick={() => onNavigate('/')}
                className="hover:text-[#0E2B4C] cursor-pointer bg-transparent border-none p-0 text-slate-500 hover:underline"
              >
                Home
              </button>
              <ChevronRight className="w-3.5 h-3.5" />
              <button 
                onClick={() => onNavigate('/blog')}
                className="hover:text-[#0E2B4C] cursor-pointer bg-transparent border-none p-0 text-slate-500 hover:underline"
              >
                Blog
              </button>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#0E2B4C] font-bold truncate max-w-xs sm:max-w-md">
                {currentPost.title}
              </span>
            </div>

            {/* Back button */}
            <button
              onClick={() => onNavigate('/blog')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0E2B4C] hover:text-[#2BB4A7] mb-6 cursor-pointer bg-transparent border-none p-0"
            >
              <ArrowLeft className="w-4 h-4 text-[#2BB4A7]" />
              <span>Back to all articles</span>
            </button>

            {/* Category badge */}
            <div>
              <span className="inline-block px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#2BB4A7] text-xs font-bold uppercase tracking-wider mb-4">
                {currentPost.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0E2B4C] font-heading mb-6 leading-tight">
              {currentPost.title}
            </h1>

            {/* Meta bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-slate-900">By {currentPost.author}</span>
                <span>•</span>
                <span>{currentPost.authorRole}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#2BB4A7]" />
                  <span>{currentPost.readTime}</span>
                </span>
                <span>•</span>
                <span>{currentPost.date}</span>
              </div>

              {/* Share Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShareWhatsApp(currentPost)}
                  className="px-3 py-1.5 rounded-full bg-[#25D366] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer hover:bg-[#20ba59] transition-colors"
                  title="Share on WhatsApp"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                  <span>Share</span>
                </button>
                <button
                  onClick={() => handleCopyLink(currentPost)}
                  className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer hover:bg-slate-200 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>{copiedShare ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* Article Body */}
        <article className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Featured Image */}
            <div className="rounded-3xl overflow-hidden aspect-[16/9] mb-10 bg-slate-100 border border-slate-200 shadow-md">
              <img
                src={getAssetUrl(currentPost.image)}
                alt={currentPost.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = getAssetUrl('clinic/md_3d_scanner_and_pt.jpg');
                }}
              />
            </div>

            {/* Paragraphs */}
            <div className="space-y-6 text-slate-700 text-base sm:text-lg leading-relaxed font-body">
              {currentPost.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* If Veneers article: Full Comparison Table and Clinical Case Photos */}
            {currentPost.slug === 'veneers' && (
              <div className="my-12 pt-8 border-t border-slate-200">
                <div className="flex items-center gap-2 mb-6">
                  <Table className="w-5 h-5 text-[#2BB4A7]" />
                  <h2 className="text-2xl font-bold text-[#0E2B4C] font-heading">
                    At a glance: comparing the options
                  </h2>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm mb-10">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#0E2B4C] text-white uppercase text-[11px] tracking-wider">
                      <tr>
                        <th className="p-4">Option</th>
                        <th className="p-4">Best For</th>
                        <th className="p-4">Durability</th>
                        <th className="p-4">Tooth Prep</th>
                        <th className="p-4">Reversibility</th>
                        <th className="p-4">Starting Cost</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      <tr className="hover:bg-slate-50">
                        <td className="p-4 font-bold text-[#0E2B4C]">Composite bonding</td>
                        <td className="p-4 text-slate-600">Small chips, gaps, minor edge reshaping</td>
                        <td className="p-4 text-slate-600">5–7 years</td>
                        <td className="p-4 text-slate-600">Minimal or none</td>
                        <td className="p-4 text-emerald-600 font-semibold">Yes</td>
                        <td className="p-4 font-bold text-[#0E2B4C]">Consultation / from €120</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-4 font-bold text-[#0E2B4C]">Ceramic veneers</td>
                        <td className="p-4 text-slate-600">Discoloured teeth, uneven shape, front aesthetics</td>
                        <td className="p-4 text-slate-600">10–15+ years</td>
                        <td className="p-4 text-slate-600">Thin enamel layer</td>
                        <td className="p-4 text-slate-500">Irreversible</td>
                        <td className="p-4 font-bold text-[#0E2B4C]">Consultation</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-4 font-bold text-[#0E2B4C]">Full ceramic crowns</td>
                        <td className="p-4 text-slate-600">Severely worn, broken teeth, bite reconstruction</td>
                        <td className="p-4 text-slate-600">15+ years</td>
                        <td className="p-4 text-slate-600">Circumferential prep</td>
                        <td className="p-4 text-slate-500">Irreversible</td>
                        <td className="p-4 font-bold text-[#0E2B4C]">Consultation</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Case Photos */}
                <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#2BB4A7] mb-2 font-heading">
                    Clinical Case Study · Dr Susanna Diacono
                  </div>
                  <h3 className="text-lg font-bold text-[#0E2B4C] mb-4 font-heading">
                    Reconstruction of worn teeth using ceramic restorations:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white">
                      <img
                        src={getAssetUrl('dental_case_before.jpg')}
                        alt="Before treatment: Worn tooth structure"
                        className="w-full aspect-[4/3] object-cover"
                      />
                      <div className="p-3 text-xs font-bold text-slate-600 text-center">
                        Initial presentation with incisal wear &amp; shortened teeth
                      </div>
                    </div>
                    <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white">
                      <img
                        src={getAssetUrl('dental_case_after.jpg')}
                        alt="After treatment: Ceramic reconstruction"
                        className="w-full aspect-[4/3] object-cover"
                      />
                      <div className="p-3 text-xs font-bold text-[#0E2B4C] text-center">
                        Restored anatomical tooth height &amp; natural smile harmony
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Author / Booking CTA Box */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#E8F8F6] border border-[#C5EDE8] flex flex-col sm:flex-row items-center justify-between gap-6 mt-12 shadow-sm">
              <div>
                <h3 className="text-xl font-bold text-[#0E2B4C] font-heading mb-1">
                  Have questions about this treatment?
                </h3>
                <p className="text-xs sm:text-sm text-slate-700">
                  Discuss your options with {currentPost.author} ({currentPost.authorRole}) at St James Hospital, Sliema.
                </p>
              </div>
              <button
                onClick={() => onOpenBooking({ doctor: currentPost.author })}
                className="px-8 py-3.5 rounded-full bg-[#0E2B4C] hover:bg-[#07192d] text-white font-bold text-xs uppercase tracking-wider cursor-pointer shrink-0 transition-all shadow-md flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#2BB4A7]" />
                <span>Book a consultation</span>
              </button>
            </div>

            {/* Bottom Navigation */}
            <div className="mt-12 pt-8 border-t border-slate-200 flex justify-between items-center">
              <button
                onClick={() => onNavigate('/blog')}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0E2B4C] hover:text-[#2BB4A7] cursor-pointer bg-transparent border-none p-0"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to all articles</span>
              </button>
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer bg-transparent border-none p-0 font-medium"
              >
                Back to top ↑
              </button>
            </div>

          </div>
        </article>

      </div>
    );
  }

  // -------------------------------------------------------------------------
  // BLOG LISTING OVERVIEW VIEW (/blog)
  // -------------------------------------------------------------------------
  return (
    <div className="pt-24 pb-28 bg-[#F8FAFC] text-slate-900 font-body">
      
      {/* 1. Header Banner */}
      <section className="bg-white border-b border-slate-200 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
            <button 
              onClick={() => onNavigate('/')}
              className="hover:text-[#0E2B4C] cursor-pointer bg-transparent border-none p-0 text-slate-500 hover:underline"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#0E2B4C] font-bold">Blog</span>
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
              Expert articles and clinical explanations authored by our specialist dental team at St James Hospital in Sliema, Malta.
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = getAssetUrl('clinic/md_3d_scanner_and_pt.jpg');
                      }}
                    />
                    <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0E2B4C] text-[11px] font-bold uppercase tracking-wider border border-slate-200 shadow-2xs">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-6 sm:p-7">
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

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-body line-clamp-3">
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

                <div className="p-6 sm:p-7 pt-0">
                  <button
                    onClick={() => onNavigate(`/blog/${post.slug}`)}
                    className="w-full py-3 rounded-full bg-[#0E2B4C] hover:bg-[#07192d] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 text-[#2BB4A7]" />
                  </button>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
export default BlogPage;
