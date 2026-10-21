import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const DEFAULT_IMAGES: Record<number, string> = {
  0: '/src/assets/images/isolated_cloud_burger_1792541785844.jpg',
  1: '/src/assets/images/isolated_cheddar_melt_1792542424218.jpg',
  2: '/src/assets/images/isolated_smash_patties_1792542424036.jpg',
  3: '/src/assets/images/isolated_bacon_pickles_1792542425472.jpg',
};

export default function BurgerShowcase() {
  const [activeLayer, setActiveLayer] = useState<number>(0);
  const [customImages, setCustomImages] = useState<Record<number, string>>({});

  // Load any previously uploaded custom images from localStorage so they remain saved
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cloud_burger_custom_images');
      if (saved) {
        setCustomImages(JSON.parse(saved));
      }
    } catch {
      // Ignore storage errors in sandbox
    }
  }, []);

  const layers = [
    {
      id: 0,
      title: 'O Lanche Completo & Brioche',
      desc: 'Massa leve e amanteigada de brioche com gergelim tostado, harmonizando perfeitamente com todas as camadas suculentas.',
      tag: 'Equilíbrio Total',
      alt: 'Hambúrguer artesanal completo da CLOUD com pão brioche, cheddar e smash duplo',
    },
    {
      id: 1,
      title: 'Cheddar Duplo Fundido',
      desc: 'Queijo cheddar legítimo generosamente derretido sobre a carne quente, escorrendo em cascata cremosa.',
      tag: 'Cremosidade Pura',
      alt: 'Carne com queijo cheddar duplo derretido em abundância',
    },
    {
      id: 2,
      title: 'Double Smash 180g na Chapa',
      desc: 'Dois discos de carne 100% fresca prensados em chapa de alta temperatura. Crosta crocante e suculência preservada.',
      tag: 'Coração da Chapa',
      alt: 'Dois smash burgers com crosta caramelizada e flor de sal',
    },
    {
      id: 3,
      title: 'Bacon Crocante, Picles & Molho',
      desc: 'Fatias de bacon artesanal defumado, picles crocantes cortados finos e maionese especial da casa.',
      tag: 'Crocância & Acidez',
      alt: 'Tiras de bacon crocante com picles artesanal e molho da casa',
    },
  ];

  const currentItem = layers[activeLayer] || layers[0];
  const currentImageSrc = customImages[activeLayer] || DEFAULT_IMAGES[activeLayer] || DEFAULT_IMAGES[0];

  return (
    <section
      id="hamburguer"
      aria-label="Anatomia do Hambúrguer CLOUD"
      className="py-20 lg:py-28 bg-[#0A0B0D] relative overflow-hidden border-y border-[#17191D]"
    >
      {/* Preload default images */}
      <div className="hidden" aria-hidden="true">
        {Object.values(DEFAULT_IMAGES).map((src, i) => (
          <img key={i} src={src} alt="" />
        ))}
      </div>

      {/* Ambient warm radial glow behind the burger */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-[#FFD429]/10 rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with ScrollReveal */}
        <ScrollReveal direction="up" distance={20} delay={0.1}>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-[2px] bg-[#FFD429]" aria-hidden="true" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#FFD429]">
                Anatomia do Sabor
              </span>
              <span className="w-5 h-[2px] bg-[#FFD429]" aria-hidden="true" />
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#F5F4F0] uppercase leading-[1.12]">
              O HAMBÚRGUER PERFEITO
            </h2>

            <p className="text-[#A4A6AC] text-sm sm:text-base mt-2.5 max-w-lg mx-auto leading-relaxed">
              Sem caixas, sem molduras. O hambúrguer artesanal da CLOUD isolado em sua forma mais pura.
            </p>
          </div>
        </ScrollReveal>

        {/* Central Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Dynamic Isolated Burger Image with ScrollReveal */}
          <div className="lg:col-span-6 flex items-center justify-center relative min-h-[360px] sm:min-h-[420px]">
            <ScrollReveal direction="up" distance={28} delay={0.2} className="w-full flex justify-center">
              <div className="relative group w-full max-w-[340px] sm:max-w-[420px] flex flex-col items-center justify-center">
                
                {/* Image Presentation */}
                <div className="relative flex items-center justify-center w-full aspect-square">
                  <img
                    key={`${activeLayer}-${currentImageSrc}`}
                    src={currentImageSrc}
                    alt={currentItem.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)] animate-in fade-in zoom-in-95 duration-300"
                  />

                  {/* Ground reflection shadow */}
                  <div
                    className="absolute -bottom-4 w-3/4 h-8 bg-black/90 rounded-full blur-xl pointer-events-none"
                    aria-hidden="true"
                  />
                </div>

              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Layer Highlights & Clickable Options with Staggered ScrollReveal */}
          <div className="lg:col-span-6 space-y-3">
            
            {/* Interactive Layer Cards */}
            {layers.map((layer, index) => {
              const isSelected = activeLayer === layer.id;

              return (
                <ScrollReveal
                  key={layer.id}
                  direction="up"
                  distance={18}
                  delay={0.15 + index * 0.08}
                >
                  <div
                    onClick={() => setActiveLayer(layer.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveLayer(layer.id);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-selected={isSelected}
                    className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD429] ${
                      isSelected
                        ? 'bg-[#17191D] border-[#FFD429] shadow-lg shadow-[#FFD429]/10 translate-x-1 sm:translate-x-1.5'
                        : 'bg-[#131519]/70 border-[#23272E] hover:border-[#A4A6AC]/40 hover:bg-[#17191D]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-sm text-[#F5F4F0] flex items-center gap-2.5">
                        <span
                          className={`w-2.5 h-2.5 rounded-full transition-colors ${
                            isSelected ? 'bg-[#FFD429]' : 'bg-[#23272E]'
                          }`}
                          aria-hidden="true"
                        />
                        {layer.title}
                      </span>
                      
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded transition-colors ${
                          isSelected
                            ? 'bg-[#FFD429] text-[#0A0B0D]'
                            : 'bg-[#17191D] text-[#A4A6AC]'
                        }`}
                      >
                        {layer.tag}
                      </span>
                    </div>

                    <p className="text-xs text-[#A4A6AC] mt-1.5 leading-relaxed pl-5">
                      {layer.desc}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}

            {/* Quick CTA */}
            <ScrollReveal direction="up" distance={14} delay={0.5}>
              <div className="pt-3 flex items-center justify-between text-xs text-[#A4A6AC]">
                <span>Chapa de ferro a 240°C para caramelização máxima.</span>
                <a
                  href="#cardapio"
                  className="font-bold text-[#FFD429] hover:underline inline-flex items-center gap-1"
                >
                  <span>Ver cardápio completo</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </ScrollReveal>

          </div>

        </div>

      </div>
    </section>
  );
}
