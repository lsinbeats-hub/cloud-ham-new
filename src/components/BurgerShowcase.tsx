import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Camera, Check, Upload, X, RotateCcw, Image as ImageIcon } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import initialShowcaseImages from '../data/showcaseImages.json';

const DEFAULT_FALLBACK: Record<number, string> = {
  0: '/images/isolated_cloud_burger_1792541785844.jpg',
  1: '/images/isolated_cheddar_melt_1792542424218.jpg',
  2: '/images/isolated_smash_patties_1792542424036.jpg',
  3: '/images/isolated_bacon_pickles_1792542425472.jpg',
};

export default function BurgerShowcase() {
  const [activeLayer, setActiveLayer] = useState<number>(0);
  const [persistedImages, setPersistedImages] = useState<Record<number, string>>(() => {
    return {
      0: initialShowcaseImages['0'] || DEFAULT_FALLBACK[0],
      1: initialShowcaseImages['1'] || DEFAULT_FALLBACK[1],
      2: initialShowcaseImages['2'] || DEFAULT_FALLBACK[2],
      3: initialShowcaseImages['3'] || DEFAULT_FALLBACK[3],
    };
  });
  const [customImages, setCustomImages] = useState<Record<number, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  // Auto-sync any previously stored images in browser localStorage to the project backend
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cloud_burger_custom_images');
      if (saved) {
        const parsed = JSON.parse(saved);
        setCustomImages(parsed);

        // Automatically sync to local dev server to write actual image files
        fetch('/api/save-custom-images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ images: parsed }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data?.success && data?.images) {
              setPersistedImages((prev) => ({ ...prev, ...data.images }));
            }
          })
          .catch(() => {
            // Silently ignore if offline or in static production mode
          });
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
  const currentImageSrc =
    customImages[activeLayer] ||
    persistedImages[activeLayer] ||
    DEFAULT_FALLBACK[activeLayer] ||
    DEFAULT_FALLBACK[0];

  // Handle image upload from file picker
  const handleFileUpload = (layerId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const updated = { ...customImages, [layerId]: result };
      setCustomImages(updated);
      try {
        localStorage.setItem('cloud_burger_custom_images', JSON.stringify(updated));
      } catch {
        // Storage limit reached or disabled
      }
    };
    reader.readAsDataURL(file);
  };

  // Permanently save custom images to project repository files for Vercel deployment
  const handleSaveToProject = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    try {
      const res = await fetch('/api/save-custom-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: customImages }),
      });
      const data = await res.json();
      if (data?.success && data?.images) {
        setPersistedImages((prev) => ({ ...prev, ...data.images }));
        setSaveStatus('success');
      } else {
        setSaveStatus('error');
      }
    } catch {
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  // Revert to original default images
  const handleResetDefaults = () => {
    setCustomImages({});
    try {
      localStorage.removeItem('cloud_burger_custom_images');
    } catch {
      // Ignore
    }
    setPersistedImages({
      0: DEFAULT_FALLBACK[0],
      1: DEFAULT_FALLBACK[1],
      2: DEFAULT_FALLBACK[2],
      3: DEFAULT_FALLBACK[3],
    });
    fetch('/api/save-custom-images', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ images: DEFAULT_FALLBACK }),
    }).catch(() => {});
    setSaveStatus('reset');
  };

  return (
    <section
      id="hamburguer"
      aria-label="Anatomia do Hambúrguer CLOUD"
      className="py-20 lg:py-28 bg-[#0A0B0D] relative overflow-hidden border-y border-[#17191D]"
    >
      {/* Ambient warm radial glow behind the burger */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-[#FFD429]/10 rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with ScrollReveal & Discreet Photo Manager */}
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

            {/* Quick Action to manage/verify photos for Vercel */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-[#A4A6AC] hover:text-[#FFD429] bg-[#17191D]/80 hover:bg-[#1E2127] border border-[#23272E] hover:border-[#FFD429]/40 transition-all cursor-pointer shadow-sm"
              >
                <Camera className="w-3.5 h-3.5 text-[#FFD429]" />
                <span>Gerenciar Fotos da Versão Final (Vercel)</span>
              </button>
            </div>
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

                {/* Subtle layer title under burger */}
                <div className="mt-2 text-center text-xs text-[#A4A6AC]">
                  Visualizando: <span className="font-semibold text-[#FFD429]">{currentItem.title}</span>
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

      {/* MODAL: Gerenciador de Fotos para a Versão Final da Vercel */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-2xl bg-[#131519] border border-[#23272E] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#23272E] bg-[#17191D]">
              <div>
                <h3 className="font-display font-bold text-lg text-[#F5F4F0] flex items-center gap-2">
                  <Camera className="w-5 h-5 text-[#FFD429]" />
                  <span>Fotos da Anatomia do Hambúrguer (Versão Final Vercel)</span>
                </h3>
                <p className="text-xs text-[#A4A6AC] mt-0.5">
                  Troque ou confirme as imagens de cada etapa. Clique em &quot;Gravar Fotos no Projeto&quot; para ficarem salvas permanentemente no código.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-[#A4A6AC] hover:text-[#F5F4F0] hover:bg-[#23272E] rounded-lg transition-colors cursor-pointer"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content - List of 4 Layers */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              {layers.map((layer) => {
                const layerImage =
                  customImages[layer.id] ||
                  persistedImages[layer.id] ||
                  DEFAULT_FALLBACK[layer.id];

                return (
                  <div
                    key={layer.id}
                    className="p-3.5 rounded-xl bg-[#0A0B0D] border border-[#23272E] flex items-center gap-4"
                  >
                    {/* Thumbnail preview */}
                    <div className="w-16 h-16 rounded-lg bg-[#17191D] border border-[#23272E] overflow-hidden flex-shrink-0 flex items-center justify-center relative group">
                      <img
                        src={layerImage}
                        alt={layer.title}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>

                    {/* Layer Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#FFD429]">
                          Camada {layer.id + 1}:
                        </span>
                        <h4 className="text-sm font-semibold text-[#F5F4F0] truncate">
                          {layer.title}
                        </h4>
                      </div>
                      <p className="text-xs text-[#A4A6AC] truncate mt-0.5">
                        {layer.tag}
                      </p>
                    </div>

                    {/* Upload button for this layer */}
                    <div>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/jpg"
                        ref={(el) => {
                          fileInputRefs.current[layer.id] = el;
                        }}
                        onChange={(e) => handleFileUpload(layer.id, e)}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRefs.current[layer.id]?.click()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#F5F4F0] bg-[#1E2127] hover:bg-[#282D35] border border-[#2E333D] rounded-lg transition-colors cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5 text-[#FFD429]" />
                        <span>Trocar Foto</span>
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Status alerts */}
              {saveStatus === 'success' && (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>
                    Fotos gravadas com sucesso no projeto! Ao fazer o commit/deploy na Vercel, todos os visitantes verão estas imagens automaticamente.
                  </span>
                </div>
              )}

              {saveStatus === 'reset' && (
                <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Fotos restauradas para o padrão de fábrica.</span>
                </div>
              )}

              {saveStatus === 'error' && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                  <X className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>Ocorreu um erro ao salvar no servidor. Tente novamente.</span>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="px-6 py-4 bg-[#17191D] border-t border-[#23272E] flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleResetDefaults}
                className="inline-flex items-center gap-1.5 text-xs text-[#A4A6AC] hover:text-[#F5F4F0] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurar fotos originais</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-[#A4A6AC] hover:text-[#F5F4F0] bg-[#1E2127] rounded-lg transition-colors cursor-pointer"
                >
                  Fechar
                </button>

                <button
                  type="button"
                  onClick={handleSaveToProject}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-[#0A0B0D] bg-[#FFD429] hover:bg-[#FFE066] active:bg-[#E6BD1F] rounded-lg transition-all cursor-pointer disabled:opacity-50 shadow-md shadow-[#FFD429]/20"
                >
                  <Check className="w-4 h-4" />
                  <span>{isSaving ? 'Gravando no Projeto...' : 'Gravar Fotos no Projeto (Vercel)'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
