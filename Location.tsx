import { useState, useMemo } from 'react';
import { MapPin, Navigation, Clock, MessageCircle, ExternalLink } from 'lucide-react';
import { CLOUD_CONFIG } from '../data/cloudConfig';
import ScrollReveal from './ScrollReveal';

export default function Location() {
  const [mapLoaded, setMapLoaded] = useState(false);

  // Determine current opening status based on client's local time
  const currentStatus = useMemo(() => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const dayMap = [6, 0, 1, 2, 3, 4, 5];
    const scheduleIndex = dayMap[dayOfWeek];
    const todaySchedule = CLOUD_CONFIG.schedule[scheduleIndex];

    if (!todaySchedule || !todaySchedule.isOpen) {
      return {
        isOpenNow: false,
        text: 'Fechado hoje',
        subtext: 'Abrimos amanhã às 18:00',
      };
    }

    const currentHour = now.getHours() + now.getMinutes() / 60;
    const openH = todaySchedule.openHour ?? 18;
    const closeH = todaySchedule.closeHour ?? 23;

    const isOpenNow = currentHour >= openH && currentHour < closeH;

    if (isOpenNow) {
      return {
        isOpenNow: true,
        text: 'Aberto agora',
        subtext: `Atendimento hoje até ${todaySchedule.closeHour ? Math.floor(todaySchedule.closeHour) + ':00' : 'o fechamento'}`,
      };
    } else if (currentHour < openH) {
      return {
        isOpenNow: false,
        text: 'Abre mais tarde',
        subtext: `Hoje das ${todaySchedule.hours}`,
      };
    } else {
      return {
        isOpenNow: false,
        text: 'Fechado no momento',
        subtext: 'Encerramos por hoje. Te esperamos amanhã!',
      };
    }
  }, []);

  const whatsappUrl = `https://wa.me/${CLOUD_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    'Olá! Gostaria de confirmar a rota e informações sobre a hamburgueria CLOUD.'
  )}`;

  return (
    <section
      id="localizacao"
      aria-label="Localização e Horários"
      className="py-16 lg:py-24 bg-[#0A0B0D] relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with ScrollReveal */}
        <ScrollReveal direction="up" distance={20} delay={0.1}>
          <div className="max-w-2xl mb-10">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-5 h-[2px] bg-[#FFD429]" aria-hidden="true" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#FFD429]">
                Como Chegar
              </span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[#F5F4F0] uppercase">
              ENCONTRE A CLOUD
            </h2>
            <p className="text-[#A4A6AC] text-sm mt-1">
              Venha viver a experiência do hambúrguer autêntico diretamente no nosso salão.
            </p>
          </div>
        </ScrollReveal>

        {/* Responsive Layout with Compact Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Address, Route CTA, Hours (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Address Box + Traçar Rota Button with ScrollReveal */}
            <ScrollReveal direction="up" distance={22} delay={0.2}>
              <div className="p-5 sm:p-6 rounded-xl bg-[#131519] border border-[#23272E] space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#FFD429] mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#A4A6AC] block">
                        Endereço da Hamburgueria
                      </span>
                      <h3 className="font-display font-bold text-lg text-[#F5F4F0] mt-0.5">
                        {CLOUD_CONFIG.location.street}
                      </h3>
                      <p className="text-xs text-[#A4A6AC] mt-0.5">
                        {CLOUD_CONFIG.location.neighborhood} · {CLOUD_CONFIG.location.city} - {CLOUD_CONFIG.location.state}
                      </p>
                      <p className="text-[11px] text-[#A4A6AC]/75 mt-0.5">
                        CEP: {CLOUD_CONFIG.location.zipCode} ({CLOUD_CONFIG.location.referencePoint})
                      </p>
                    </div>
                  </div>

                  {/* Real-time status badge */}
                  <div className="text-right shrink-0">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F5F4F0]">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          currentStatus.isOpenNow ? 'bg-emerald-400 animate-pulse' : 'bg-[#FFD429]'
                        }`}
                        aria-hidden="true"
                      />
                      {currentStatus.text}
                    </span>
                    <span className="block text-[10px] text-[#A4A6AC] mt-0.5">
                      {currentStatus.subtext}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-[#17191D] flex flex-col sm:flex-row gap-3">
                  <a
                    href={CLOUD_CONFIG.location.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#0A0B0D] bg-[#FFD429] hover:bg-[#ffe066] rounded-lg transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD429]"
                  >
                    <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>TRAÇAR ROTA NO MAPS</span>
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-medium text-[#F5F4F0] bg-[#17191D] hover:bg-[#23272E] border border-[#23272E] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD429]"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#FFD429]" aria-hidden="true" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Operating Hours Table with ScrollReveal */}
            <ScrollReveal direction="up" distance={22} delay={0.3}>
              <div className="p-5 sm:p-6 rounded-xl bg-[#131519] border border-[#23272E]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#A4A6AC]">
                    Horários de Funcionamento
                  </span>
                  <span className="text-[10px] text-[#A4A6AC]">
                    Horário de Brasília
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                  {CLOUD_CONFIG.schedule.map((day, idx) => {
                    const todayIndex = [6, 0, 1, 2, 3, 4, 5][new Date().getDay()];
                    const isToday = todayIndex === idx;

                    return (
                      <div
                        key={day.dayName}
                        className={`flex items-center justify-between text-xs py-1 px-2 rounded transition-colors ${
                          isToday
                            ? 'bg-[#17191D] text-[#FFD429] font-bold'
                            : 'text-[#A4A6AC]'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          {isToday && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD429]" aria-hidden="true" />
                          )}
                          <span>{day.dayName}</span>
                        </span>

                        <span className="tabular-nums">
                          {day.hours}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Right Column: Compact Map with ScrollReveal (5 cols) */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="up" distance={26} delay={0.35}>
              <div className="rounded-xl overflow-hidden bg-[#131519] border border-[#23272E] shadow-lg flex flex-col">
                
                {/* Compact Map Header */}
                <div className="px-3.5 py-2.5 bg-[#0A0B0D]/90 border-b border-[#17191D] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-[#F5F4F0]">
                    <MapPin className="w-3.5 h-3.5 text-[#FFD429]" aria-hidden="true" />
                    <span className="font-semibold text-[11px]">Mapa da Região</span>
                  </div>

                  <a
                    href={CLOUD_CONFIG.location.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-[#FFD429] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Abrir no Google Maps</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                </div>

                {/* Controlled map frame */}
                <div className="relative w-full h-56 sm:h-64 bg-[#17191D] overflow-hidden">
                  <iframe
                    title="Mapa de Localização da CLOUD Hamburgueria"
                    src={CLOUD_CONFIG.location.googleMapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(95%)' }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    onLoad={() => setMapLoaded(true)}
                    className="w-full h-full"
                  />

                  {!mapLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#131519] p-4 text-center">
                      <MapPin className="w-6 h-6 text-[#FFD429] mb-2 animate-bounce" aria-hidden="true" />
                      <p className="text-xs font-semibold text-[#F5F4F0]">
                        Carregando mapa...
                      </p>
                    </div>
                  )}
                </div>

                {/* Compact Footer Note */}
                <div className="px-3.5 py-2 bg-[#0A0B0D] border-t border-[#17191D] flex items-center justify-between text-[10px] text-[#A4A6AC]">
                  <span>Rua Augusta, 1850</span>
                  <span className="text-[#FFD429]">Consolação, SP</span>
                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
