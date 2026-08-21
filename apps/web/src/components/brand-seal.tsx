type BrandSealProps = {
  className?: string;
  inverse?: boolean;
};

export function BrandSeal({ className, inverse = false }: BrandSealProps) {
  const primary = inverse ? '#FAF6EC' : '#1E3A5F';
  const accent = '#C6A15B';

  return (
    <svg viewBox="0 0 120 120" role="img" aria-label="Cachet Savoraille" className={className}>
      <defs>
        <path id="seal-top" d="M 23 62 A 37 37 0 0 1 97 62" />
        <path id="seal-bottom" d="M 20 66 A 42 42 0 0 0 100 66" />
      </defs>
      <circle cx="60" cy="60" r="55" fill="none" stroke={primary} strokeWidth="2" />
      <circle cx="60" cy="60" r="49" fill="none" stroke={accent} strokeWidth="1" />
      <circle cx="60" cy="60" r="31" fill="none" stroke={primary} strokeWidth="1" opacity="0.35" />
      <text fill={primary} fontFamily="Manrope, sans-serif" fontSize="7" fontWeight="700" letterSpacing="2.1">
        <textPath href="#seal-top" startOffset="50%" textAnchor="middle">SAVORAILLE</textPath>
      </text>
      <text fill={primary} fontFamily="Manrope, sans-serif" fontSize="5.2" fontWeight="600" letterSpacing="1.45">
        <textPath href="#seal-bottom" startOffset="50%" textAnchor="middle">MAISON FRANÇAISE</textPath>
      </text>
      <text x="60" y="74" textAnchor="middle" fill={primary} fontFamily="Cormorant Garamond, Georgia, serif" fontSize="50" fontWeight="600">S</text>
      <circle cx="17" cy="60" r="2" fill={accent} />
      <circle cx="103" cy="60" r="2" fill={accent} />
    </svg>
  );
}
