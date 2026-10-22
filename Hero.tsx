import { ArrowDown, MapPin } from 'lucide-react';
import { CLOUD_CONFIG } from '../data/cloudConfig';
import ScrollReveal from './ScrollReveal';

export default function Hero() {
  return (
    <section
      id="inicio"
      aria-label="Apresentação CLOUD"
      className="relative min-h-[90vh] lg:min-h-[94vh] flex items-center justify-start pt-32 pb-20 lg:py-28 overflow-hidden bg-[#0A0B0D]"
    >
      {/* Background: Authentic diner / burger bar area photo */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={CLOUD_CONFIG.images.dinerBackground}
          alt="Ambiente acolhedor do salão da hamburgueria CLOUD com mesas de madeira e iluminação âmbar"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />

        {/* Sophisticated dark gradient overlays ensuring high-contrast text readability */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0A0B0D] via-[#0A0B0D]/85 to-[#0A0B0D]/40"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0A0B0D] via-transparent to-[#0A0B0D]/70"
          aria-hidden="true"
        />

        {/* Warm amber accent highlight in the ambient space */}
        <div
          className="absolute top-1/3 left-10 w-96 h-96 bg-[#FFD429]/10 rounded-full blur-[140px] pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Main Content Area - Aligned to the Left with entrance transitions */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="max-w-2xl text-left flex flex-col items-start">
          
          {/* Subtle Brand Kicker */}
          <ScrollReveal delay={0.1} direction="up" distance={16}>
            <div className="inline-flex items-center gap-2.5 mb-5">
              <span className="w-6 h-[2px] bg-[#FFD429]" aria-hidden="true" />
              <span className="text-xs font-bold tracking-[0.22em] uppercase text-[#FFD429]">
                {CLOUD_CONFIG.brand.shortDescriptor}
              </span>
            </div>
          </ScrollReveal>

          {/* Hero Main Headline */}
          <ScrollReveal delay={0.2} direction="up" distance={24}>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#F5F4F0] leading-[1.08] mb-5 whitespace-pre-line text-balance drop-shadow-md">
              {CLOUD_CONFIG.brand.heroHeadline}
            </h1>
          </ScrollReveal>

          {/* Hero Subtitle */}
          <ScrollReveal delay={0.3} direction="up" distance={20}>
            <p className="text-base sm:text-lg text-[#F5F4F0]/90 max-w-xl leading-relaxed font-normal mb-8 text-pretty drop-shadow-sm">
              {CLOUD_CONFIG.brand.heroSubhead}
            </p>
          </ScrollReveal>

          {/* Action Buttons */}
          <ScrollReveal delay={0.4} direction="up" distance={20}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <a
                href="#cardapio"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-xs font-bold tracking-wider uppercase text-[#0A0B0D] bg-[#FFD429] hover:bg-[#ffe066] active:bg-[#e6bd1f] rounded-lg transition-all duration-150 shadow-lg shadow-[#FFD429]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD429]"
              >
                <span>Conheça nosso cardápio</span>
                <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
              </a>

              <a
                href="#localizacao"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-xs font-medium tracking-wide text-[#F5F4F0] bg-[#17191D]/80 hover:bg-[#23272E] border border-[#23272E] hover:border-[#FFD429]/40 backdrop-blur-md rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD429]"
              >
                <MapPin className="w-3.5 h-3.5 text-[#FFD429]" aria-hidden="true" />
                <span>Como chegar</span>
              </a>
            </div>
          </ScrollReveal>

          {/* Unboxed trust markers */}
          <ScrollReveal delay={0.5} direction="up" distance={16}>
            <div className="mt-10 pt-5 border-t border-white/10 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#F5F4F0]/80">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFD429]" aria-hidden="true" />
                <span>Carne 100% fresca</span>
              </div>
              <span className="text-white/20 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFD429]" aria-hidden="true" />
                <span>Pão brioche selado</span>
              </div>
              <span className="text-white/20 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFD429]" aria-hidden="true" />
                <span>Chapa de ferro quente</span>
              </div>
              <span className="text-white/20 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFD429]" aria-hidden="true" />
                <span>Receitas autorais</span>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
