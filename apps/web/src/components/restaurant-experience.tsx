import Image from 'next/image';

const moments = [
  {
    label: 'Le geste',
    title: 'Précis, puis généreux.',
    image: 'https://images.unsplash.com/photo-1576006144029-e42bb7166c76?auto=format&fit=crop&w=1200&q=82',
    className: 'col-span-2 min-h-72 sm:col-span-1 sm:row-span-2 sm:min-h-full',
  },
  {
    label: 'L’assiette',
    title: 'La saison en lumière.',
    image: 'https://images.unsplash.com/photo-1616401616927-3c81de22dfa8?auto=format&fit=crop&w=1200&q=82',
    className: 'min-h-52',
  },
  {
    label: 'Le moment',
    title: 'Un verre, et le temps ralentit.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=82',
    className: 'min-h-52',
  },
];

export function RestaurantExperience() {
  return (
    <section id="experience" className="relative overflow-hidden bg-[#1E3A5F] px-6 py-16 text-[#FAF6EC] sm:py-20 lg:py-24" aria-labelledby="experience-title">
      <div className="pointer-events-none absolute -right-32 top-10 size-96 rounded-full border border-[#C6A15B]/15" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-16 top-24 size-72 rounded-full border border-[#C6A15B]/20" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-16">
        <div className="max-w-xl">
          <p className="font-script text-3xl text-[#C6A15B]">L’expérience Savoraille</p>
          <h2 id="experience-title" className="font-display mt-3 text-4xl leading-[0.98] font-semibold sm:text-5xl lg:text-6xl">
            Plus qu’un repas, un moment qui reste.
          </h2>
          <p className="mt-6 text-base leading-7 text-[#FAF6EC]/72 sm:text-lg sm:leading-8">
            La lumière est douce, les assiettes arrivent au rythme de la saison et chaque geste raconte une cuisine française vivante.
          </p>
          <div className="mt-8 flex items-center gap-4 text-xs font-bold tracking-[0.13em] text-[#C6A15B] uppercase">
            <span>Produits choisis</span>
            <span className="h-px w-10 bg-[#C6A15B]/55" aria-hidden="true" />
            <span>Service attentionné</span>
          </div>
          <a href="#reservation" className="mt-8 inline-flex items-center gap-3 rounded-lg bg-[#FAF6EC] px-5 py-3.5 text-sm font-bold text-[#1E3A5F] outline-none transition-colors hover:bg-[#C6A15B] hover:text-[#241F19] focus-visible:ring-2 focus-visible:ring-[#C6A15B]">
            Vivre l’expérience
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-rows-2 sm:gap-4" aria-label="Trois moments de l’expérience Savoraille">
          {moments.map((moment, index) => (
            <figure key={moment.label} className={`group relative overflow-hidden rounded-2xl border border-[#C6A15B]/30 bg-[#102B4D] shadow-[0_18px_42px_rgba(7,28,51,0.28)] ${moment.className}`}>
              <Image src={moment.image} alt={moment.title} fill loading="lazy" sizes={index === 0 ? '(min-width: 1024px) 30vw, 100vw' : '(min-width: 1024px) 24vw, 50vw'} className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071C33]/90 via-[#071C33]/10 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="text-[0.65rem] font-bold tracking-[0.15em] text-[#C6A15B] uppercase">{moment.label}</p>
                <p className="font-display mt-1 text-xl leading-tight font-semibold sm:text-2xl">{moment.title}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
