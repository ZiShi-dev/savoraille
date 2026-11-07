const images = {
  aperitif: '/images/menu/aperitif.jpg',
  entree: '/images/menu/entree.jpg',
  volaille: '/images/menu/volaille.jpg',
  poisson: '/images/menu/poisson.jpg',
  vegetal: '/images/menu/vegetal.jpg',
  dessert: '/images/menu/dessert.jpg',
  boisson: '/images/menu/boisson.jpg',
  agneau: '/images/menu/agneau.jpg',
} as const;

export type MenuItem = {
  id: string;
  eyebrow: string;
  name: string;
  detail: string;
  price: string;
  image: string;
};

export type MenuSection = {
  id: string;
  label: string;
  shortLabel: string;
  subtitle: string;
  items: readonly MenuItem[];
};

export const menuSections: readonly MenuSection[] = [
  {
    id: 'aperitifs',
    label: 'Apéritifs & amuse-bouches',
    shortLabel: 'Apéritifs',
    subtitle: 'Avant le repas',
    items: [
      { id: 'gougere', eyebrow: 'Comté', name: 'Gougère au vieux comté', detail: 'Vieux comté, muscade.', price: '9 €', image: images.aperitif },
      { id: 'tomate-fumee', eyebrow: 'Tomate', name: 'Tartare de tomate fumée', detail: 'Tomate de saison, basilic, pain de campagne.', price: '11 €', image: images.entree },
      { id: 'rillettes-truite', eyebrow: 'Truite', name: 'Rillettes de truite', detail: 'Truite fumée, crème citron, fenouil.', price: '13 €', image: images.poisson },
      { id: 'croquette-volaille', eyebrow: 'Volaille', name: 'Croquette de volaille', detail: 'Volaille confite, moutarde à l’ancienne.', price: '12 €', image: images.volaille },
      { id: 'pissaladiere', eyebrow: 'Oignons', name: 'Mini pissaladière', detail: 'Oignons confits, olives, thym.', price: '10 €', image: images.aperitif },
      { id: 'huitre', eyebrow: 'Huître', name: 'Huître & granité citron', detail: 'Huître, granité citron, herbes.', price: '15 €', image: images.poisson },
      { id: 'briouates-agneau', eyebrow: 'Agneau', name: 'Briouates d’agneau', detail: 'Agneau, brick, yaourt citronné.', price: '13 €', image: images.agneau },
      { id: 'brick-oeuf', eyebrow: 'Œuf', name: 'Brick à l’œuf aux fines herbes', detail: 'Œuf coulant, persil, ciboulette.', price: '11 €', image: images.aperitif },
    ],
  },
  {
    id: 'entrees',
    label: 'Entrées',
    shortLabel: 'Entrées',
    subtitle: 'Pour commencer',
    items: [
      { id: 'veloute', eyebrow: 'Potimarron', name: 'Velouté de potimarron', detail: 'Potimarron, châtaigne, noisette, sauge.', price: '14 €', image: images.vegetal },
      { id: 'oeuf-parfait', eyebrow: 'Œuf', name: 'Œuf parfait', detail: 'Champignons, comté, beurre noisette.', price: '15 €', image: images.aperitif },
      { id: 'poireau', eyebrow: 'Poireau', name: 'Poireau vinaigrette', detail: 'Poireau braisé, herbes, jaune confit.', price: '13 €', image: images.entree },
      { id: 'truite-marinee', eyebrow: 'Truite', name: 'Truite marinée', detail: 'Truite, concombre, aneth, œufs de truite.', price: '17 €', image: images.poisson },
      { id: 'salade-lentilles', eyebrow: 'Lentilles', name: 'Salade de lentilles & grenade', detail: 'Lentilles du Puy, grenade, menthe.', price: '14 €', image: images.vegetal },
    ],
  },
  {
    id: 'plats',
    label: 'Plats principaux',
    shortLabel: 'Plats',
    subtitle: 'Le plat',
    items: [
      { id: 'volaille', eyebrow: 'Volaille', name: 'Volaille fermière dorée', detail: 'Peau croustillante, jus de volaille.', price: '26 €', image: images.volaille },
      { id: 'lieu', eyebrow: 'Poisson', name: 'Lieu jaune nacré', detail: 'Lieu jaune, beurre, poireau.', price: '29 €', image: images.poisson },
      { id: 'potimarron', eyebrow: 'Légumes', name: 'Potimarron confit', detail: 'Potimarron, châtaigne, noisette.', price: '21 €', image: images.vegetal },
      { id: 'agneau-epices', eyebrow: 'Agneau', name: 'Agneau confit aux épices douces', detail: 'Épaule, cumin, coriandre, semoule.', price: '30 €', image: images.agneau },
      { id: 'tagine-poulet', eyebrow: 'Volaille', name: 'Tagine de poulet aux olives', detail: 'Poulet, olives, citron confit, semoule.', price: '27 €', image: images.volaille },
      { id: 'couscous-legumes', eyebrow: 'Légumes', name: 'Couscous royal aux légumes', detail: 'Semoule, légumes, pois chiches.', price: '24 €', image: images.vegetal },
    ],
  },
  {
    id: 'desserts',
    label: 'Desserts',
    shortLabel: 'Desserts',
    subtitle: 'Après le plat',
    items: [
      { id: 'tarte-pomme', eyebrow: 'Pomme', name: 'Tarte fine aux pommes', detail: 'Pomme, crème vanille, caramel salé.', price: '11 €', image: images.dessert },
      { id: 'chocolat', eyebrow: 'Chocolat', name: 'Chocolat grand cru', detail: 'Chocolat noir, praliné, glace au grué.', price: '12 €', image: images.dessert },
      { id: 'paris-brest', eyebrow: 'Noisette', name: 'Paris-Brest', detail: 'Choux, praliné noisette.', price: '13 €', image: images.aperitif },
      { id: 'fraises', eyebrow: 'Fraise', name: 'Fraises & verveine', detail: 'Fraises, verveine, meringue.', price: '12 €', image: images.entree },
    ],
  },
  {
    id: 'boissons',
    label: 'Boissons',
    shortLabel: 'Boissons',
    subtitle: '100 % sans alcool',
    items: [
      { id: 'citronnade', eyebrow: 'Maison', name: 'Citronnade au thym', detail: 'Citron, thym.', price: '6 €', image: images.boisson },
      { id: 'eau-botanique', eyebrow: 'Maison', name: 'Eau pétillante botanique', detail: 'Concombre, verveine, baie rose.', price: '5 €', image: images.boisson },
      { id: 'jus-fruits', eyebrow: 'Pressé', name: 'Jus de fruits pressés', detail: 'Orange, pomme ou grenade.', price: '7 €', image: images.boisson },
      { id: 'the-menthe', eyebrow: 'Maison', name: 'Thé à la menthe maison', detail: 'Menthe, thé vert, fleur d’oranger.', price: '5 €', image: images.boisson },
      { id: 'limonade-rose', eyebrow: 'Maison', name: 'Limonade rose au litchi', detail: 'Litchi, framboise, citron vert.', price: '6 €', image: images.boisson },
    ],
  },
];

export const menuItems = menuSections.flatMap((section) => section.items);
