import { MessageCircle, Instagram, MapPin, ArrowUpRight } from 'lucide-react';
import { CLOUD_CONFIG } from '../data/cloudConfig';
import ScrollReveal from './ScrollReveal';

export default function Contact() {
  const whatsappUrl = `https://wa.me/${CLOUD_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    CLOUD_CONFIG.contact.whatsappDefaultMessage
  )}`;

  return (
    <section
      id="contato"
      aria-label="Canais de Contato"
      className="py-24 lg:py-28 bg-[#0E1013] border-t border-[#17191D] relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <ScrollReveal direction="up" distance={16} delay={0.1}>
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <span className="w-6 h-[2px] bg-[#FFD429]" aria-hidden="true" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#FFD429]">
              Canais Diretos
            </span>
            <span className="w-6 h-[2px] bg-[#FFD429]" aria-hidden="true" />
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" distance={24} delay={0.2}>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#F5F4F0] uppercase mb-4 text-balance">
            VAMOS TE ESPERAR.
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" distance={20} delay={0.3}>
          <p className="text-base sm:text-lg text-[#A4A6AC] max-w-xl mx-auto mb-12 text-pretty font-normal">
            Confira nossa localização, conheça o cardápio e acompanhe as novidades da CLOUD.
          </p>
        </ScrollReveal>

        {/* Contact Action Cards with Staggered ScrollReveal */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-left">
          
          {/* WhatsApp Card */}
          <ScrollReveal direction="up" distance={24} delay={0.35}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-[#131519] border border-[#23272E] hover:border-[#FFD429]/60 transition-all duration-200 flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD429] h-full"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#17191D] border border-[#23272E] group-hover:border-[#FFD429]/40 flex items-center justify-center text-[#FFD429] mb-4 transition-colors">
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#A4A6AC] block">
                  Atendimento Rápido
                </span>
                <h3 className="font-display font-bold text-lg text-[#F5F4F0] mt-1 group-hover:text-[#FFD429] transition-colors">
                  WhatsApp Oficial
                </h3>
                <p className="text-xs text-[#A4A6AC] mt-1.5 leading-relaxed">
                  Tire dúvidas sobre ingredientes, mesas e eventos.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#17191D] flex items-center justify-between text-xs font-bold text-[#FFD429]">
                <span>Iniciar conversa</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
              </div>
            </a>
          </ScrollReveal>

          {/* Instagram Card */}
          <ScrollReveal direction="up" distance={24} delay={0.45}>
            <a
              href={CLOUD_CONFIG.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-[#131519] border border-[#23272E] hover:border-[#FFD429]/60 transition-all duration-200 flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD429] h-full"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#17191D] border border-[#23272E] group-hover:border-[#FFD429]/40 flex items-center justify-center text-[#FFD429] mb-4 transition-colors">
                  <Instagram className="w-5 h-5" aria-hidden="true" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#A4A6AC] block">
                  Bastidores & Novidades
                </span>
                <h3 className="font-display font-bold text-lg text-[#F5F4F0] mt-1 group-hover:text-[#FFD429] transition-colors">
                  {CLOUD_CONFIG.contact.instagramHandle}
                </h3>
                <p className="text-xs text-[#A4A6AC] mt-1.5 leading-relaxed">
                  Acompanhe o dia a dia da chapa, fotos e novidades da casa.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#17191D] flex items-center justify-between text-xs font-bold text-[#FFD429]">
                <span>Seguir no Instagram</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
              </div>
            </a>
          </ScrollReveal>

          {/* Google Maps Card */}
          <ScrollReveal direction="up" distance={24} delay={0.55}>
            <a
              href={CLOUD_CONFIG.location.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-[#131519] border border-[#23272E] hover:border-[#FFD429]/60 transition-all duration-200 flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD429] h-full"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#17191D] border border-[#23272E] group-hover:border-[#FFD429]/40 flex items-center justify-center text-[#FFD429] mb-4 transition-colors">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#A4A6AC] block">
                  Como Chegar
                </span>
                <h3 className="font-display font-bold text-lg text-[#F5F4F0] mt-1 group-hover:text-[#FFD429] transition-colors">
                  Google Maps
                </h3>
                <p className="text-xs text-[#A4A6AC] mt-1.5 leading-relaxed">
                  Navegue com GPS em tempo real até a porta da CLOUD.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#17191D] flex items-center justify-between text-xs font-bold text-[#FFD429]">
                <span>Abrir rota no Maps</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
              </div>
            </a>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}
