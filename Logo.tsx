interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg tracking-[0.2em]',
    md: 'text-2xl tracking-[0.22em]',
    lg: 'text-3xl sm:text-4xl tracking-[0.25em]',
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {/* Somente o nome CLOUD puro, sem nenhum ícone, ilustração ou símbolo ao lado */}
      <span className={`font-display font-black text-[#F5F4F0] uppercase ${sizeClasses[size]}`}>
        CLOUD
      </span>
    </div>
  );
}
