import { useState } from 'react';
import { Info, X, ChevronRight, MessageCircle } from 'lucide-react';
import { CLOUD_CONFIG, MenuItem } from '../data/cloudConfig';
import ScrollReveal from './ScrollReveal';

export default function FeaturedMenu() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [showFullMenuModal, setShowFullMenuModal] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'Todos os Destaques' },
    { id: 'burgers', label: 'Hambúrgueres' },
    { id: 'combos', label: 'Combos' },
    { id: 'sides', label: 'Acompanhamentos' },
    { id: 'drinks', label: 'Bebidas' },
  ];

  const filteredItems = activeCategory === 'all'
    ? CLOUD_CONFIG.menuItems
    : CLOUD_CONFIG.menuItems.filter((item) => item.category === activeCategory);

  const whatsappMenuUrl = `https://wa.me/${CLOUD_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    'Olá! Gostaria de consultar o cardápio oficial completo da CLOUD.'
  )}`;

  return (
    <section
      id="cardapio"
      aria-label="Cardápio da CLOUD"
      className="py-16 lg:py-24 bg-[#0A0B0D] relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with ScrollReveal */}
        <ScrollReveal direction="up" distance={20} delay={0.1}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-[#17191D]">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-5 h-[2px] bg-[#FFD429]" aria-hidden="true" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#FFD429]">
                  Cardápio Visual
                </span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#F5F4F0] uppercase">
                OS FAVORITOS DA CLOUD
              </h2>
              <p className="text-[#A4A6AC] text-sm mt-1 max-w-lg">
                Conheça alguns dos sabores que fazem parte da nossa identidade.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#A4A6AC]/80 bg-[#17191D]/60 border border-[#23272E] px-3 py-1.5 rounded-lg self-start md:self-auto">
              <Info className="w-3.5 h-3.5 text-[#FFD429] shrink-0" aria-hidden="true" />
              <span>Itens demonstrativos para visualização comercial</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Category Filter Tabs */}
        <ScrollReveal direction="up" distance={16} delay={0.2}>
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none" role="tablist" aria-label="Categorias de produtos">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD429] ${
                    isActive
                      ? 'bg-[#FFD429] text-[#0A0B0D] shadow-sm'
                      : 'bg-[#17191D] text-[#A4A6AC] hover:text-[#F5F4F0] hover:bg-[#23272E]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Product Cards Grid with Staggered ScrollReveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <ScrollReveal
              key={item.id}
              direction="up"
              distance={28}
              delay={0.1 + (index % 3) * 0.1}
            >
              <div
                onClick={() => setSelectedProduct(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProduct(item);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Ver detalhes de ${item.name}`}
                className="group flex flex-col justify-between rounded-xl bg-[#131519] border border-[#23272E] hover:border-[#FFD429]/50 transition-all duration-200 overflow-hidden text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD429] h-full"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden bg-[#17191D] h-44 sm:h-48 w-full">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#131519] via-transparent to-transparent pointer-events-none opacity-60"
                    aria-hidden="true"
                  />

                  {item.highlight && (
                    <div className="absolute top-2.5 left-2.5 bg-[#0A0B0D]/85 backdrop-blur-sm border border-[#23272E] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-[#FFD429]">
                      {item.highlight}
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#A4A6AC] mb-1">
                      {item.categoryLabel}
                    </div>

                    <h3 className="font-display font-bold text-lg text-[#F5F4F0] group-hover:text-[#FFD429] transition-colors leading-snug">
                      {item.name}
                    </h3>

                    <p className="text-xs text-[#A4A6AC] mt-2 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Price and Action Bar */}
                  <div className="mt-4 pt-3 border-t border-[#17191D] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#A4A6AC] block">
                        Preço
                      </span>
                      <span className="font-display font-bold text-base text-[#F5F4F0] tabular-nums">
                        {item.priceFormatted}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#FFD429] group-hover:translate-x-0.5 transition-transform">
                      <span>Ver receita</span>
                      <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom Menu Action Bar with ScrollReveal */}
        <ScrollReveal direction="up" distance={20} delay={0.2}>
          <div className="mt-10 p-5 sm:p-6 rounded-xl bg-[#0E1013] border border-[#17191D] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="font-display font-bold text-base text-[#F5F4F0]">
                Quer conferir o cardápio completo da CLOUD?
              </h4>
              <p className="text-xs text-[#A4A6AC] mt-0.5">
                Consulte a versão no salão ou solicite diretamente pelo WhatsApp oficial.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setShowFullMenuModal(true)}
                className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#F5F4F0] bg-[#17191D] hover:bg-[#23272E] border border-[#23272E] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD429]"
              >
                Lista Completa
              </button>

              <a
                href={whatsappMenuUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0A0B0D] bg-[#FFD429] hover:bg-[#ffe066] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD429]"
              >
                <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </ScrollReveal>

      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-product-title"
        >
          <div className="relative w-full max-w-lg bg-[#131519] border border-[#23272E] rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 z-10 p-1.5 text-[#A4A6AC] hover:text-[#F5F4F0] bg-[#0A0B0D]/70 hover:bg-[#0A0B0D] rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD429]"
              aria-label="Fechar detalhes"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>

            <div className="h-48 w-full bg-[#17191D] relative">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#131519] via-transparent to-transparent"
                aria-hidden="true"
              />
              <div className="absolute bottom-3 left-4">
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#FFD429] block">
                  {selectedProduct.categoryLabel}
                </span>
                <h3
                  id="modal-product-title"
                  className="font-display font-bold text-xl text-[#F5F4F0]"
                >
                  {selectedProduct.name}
                </h3>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-sm text-[#A4A6AC] leading-relaxed">
                {selectedProduct.description}
              </p>

              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#F5F4F0] mb-2">
                  Ingredientes & Preparo
                </h4>
                <ul className="space-y-1.5 text-xs text-[#A4A6AC]">
                  {selectedProduct.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFD429] shrink-0" aria-hidden="true" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-[#17191D] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#A4A6AC] block">Preço de referência</span>
                  <span className="font-display font-black text-xl text-[#FFD429]">
                    {selectedProduct.priceFormatted}
                  </span>
                </div>

                <div className="text-[11px] text-[#A4A6AC] italic">
                  * Item demonstrativo
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Menu Overview Modal */}
      {showFullMenuModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-full-menu-title"
        >
          <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col bg-[#131519] border border-[#23272E] rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-[#17191D] flex items-center justify-between">
              <div>
                <h3 id="modal-full-menu-title" className="font-display font-bold text-xl text-[#F5F4F0]">
                  Cardápio da Casa — Visão Geral
                </h3>
                <p className="text-xs text-[#A4A6AC] mt-0.5">
                  Demonstração da estrutura de produtos da CLOUD Hamburgueria
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowFullMenuModal(false)}
                className="p-1.5 text-[#A4A6AC] hover:text-[#F5F4F0] rounded-lg hover:bg-[#17191D]"
                aria-label="Fechar cardápio geral"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              {CLOUD_CONFIG.menuItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-4 pb-3 border-b border-[#17191D]/80"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-sm text-[#F5F4F0]">
                        {item.name}
                      </span>
                      {item.highlight && (
                        <span className="text-[10px] uppercase font-bold text-[#FFD429]">
                          ({item.highlight})
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#A4A6AC] max-w-md">
                      {item.description}
                    </p>
                  </div>
                  <div className="text-xs font-display font-bold text-[#FFD429] tabular-nums whitespace-nowrap">
                    {item.priceFormatted}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 bg-[#0E1013] border-t border-[#17191D] flex items-center justify-between text-xs text-[#A4A6AC]">
              <span>Consumo no salão e balcão.</span>
              <a
                href={whatsappMenuUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#FFD429] hover:underline"
              >
                Tirar dúvidas no WhatsApp &rarr;
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
