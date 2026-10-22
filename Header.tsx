import { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, MapPin, Clock } from 'lucide-react';
import Logo from './Logo';
import { CLOUD_CONFIG } from '../data/cloudConfig';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappUrl = `https://wa.me/${CLOUD_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    CLOUD_CONFIG.contact.whatsappDefaultMessage
  )}`;

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Cardápio', href: '#cardapio' },
    { label: 'O Burger', href: '#hamburguer' },
    { label: 'História', href: '#historia' },
    { label: 'Localização', href: '#localizacao' },
  ];

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4">
      <div
        className={`max-w-6xl mx-auto transition-all duration-300 rounded-2xl ${
          isScrolled
            ? 'bg-[#0A0B0D]/90 backdrop-blur-xl border border-[#23272E] shadow-2xl shadow-black/80 py-3 px-5 sm:px-6'
            : 'bg-[#0A0B0D]/60 backdrop-blur-md border border-[#17191D]/80 py-3.5 px-5 sm:px-6'
        }`}
      >
        <div className="flex items-center justify-between gap-6 sm:gap-8">
          
          {/* Zone 1: Pure Typographic CLOUD Brand Wordmark */}
          <a
            href="#inicio"
            aria-label="CLOUD Hamburgueria - Início"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD429] rounded py-1"
          >
            <Logo size="md" />
          </a>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav
            aria-label="Navegação Principal"
            className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-semibold uppercase tracking-wider text-[#A4A6AC]"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap shrink-0 hover:text-[#F5F4F0] transition-colors duration-150 py-1 relative focus-visible:outline-none focus-visible:text-[#FFD429]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Quick Status & Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            
            {/* Quick status pill for desktop */}
            <div className="hidden lg:flex items-center gap-2 text-[11px] text-[#A4A6AC] bg-[#17191D]/80 px-3 py-1.5 rounded-lg border border-[#23272E]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD429] animate-pulse" aria-hidden="true" />
              <span>Chapa aberta às 18h</span>
            </div>

            {/* Primary Action Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-4.5 sm:py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0A0B0D] bg-[#FFD429] hover:bg-[#ffe066] active:bg-[#e6bd1f] rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 shadow-md shadow-[#FFD429]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD429]"
            >
              <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Fale com a gente</span>
            </a>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#A4A6AC] hover:text-[#F5F4F0] rounded-lg bg-[#17191D]/80 hover:bg-[#17191D] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD429]"
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu de navegação'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Menu className="w-4 h-4" aria-hidden="true" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden max-w-6xl mx-auto mt-2 bg-[#0A0B0D]/98 backdrop-blur-2xl border border-[#23272E] rounded-2xl p-5 shadow-2xl transition-all duration-200">
          <nav className="flex flex-col gap-3 text-sm font-semibold">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="text-[#A4A6AC] hover:text-[#FFD429] transition-colors py-2 border-b border-[#17191D]/60 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs text-[#23272E]">&rarr;</span>
              </a>
            ))}
            
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleNavClick}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0A0B0D] bg-[#FFD429] rounded-lg hover:bg-[#ffe066] transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>WhatsApp Oficial</span>
              </a>

              <a
                href={CLOUD_CONFIG.location.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleNavClick}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-[#A4A6AC] hover:text-[#F5F4F0] bg-[#17191D] rounded-lg transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#FFD429]" aria-hidden="true" />
                <span>Rua Augusta, 1850</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
