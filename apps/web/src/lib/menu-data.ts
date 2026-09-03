const images = {
  aperitif: 'https://images.unsplash.com/photo-1576006144029-e42bb7166c76?auto=format&fit=crop&w=1600&q=82',
  entree: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1600&q=82',
  volaille: 'https://images.unsplash.com/photo-1616401616927-3c81de22dfa8?auto=format&fit=crop&w=1600&q=82',
  poisson: 'https://images.unsplash.com/photo-1776097633704-6666ffafc58d?auto=format&fit=crop&w=1600&q=82',
  vegetal: 'https://images.unsplash.com/photo-1470338950318-40320a722782?auto=format&fit=crop&w=1600&q=82',
  dessert: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1600&q=82',
  boisson: 'https://images.unsplash.com/photo-1677825949218-608c76ed1fbf?auto=format&fit=crop&w=1600&q=82',
  agneau: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=1600&q=82',
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
    subtitle: 'Pour ouvrir l’appétit',
    items: [
      { id: 'gougere', eyebrow: 'Bouchée chaude', name: 'Gougère au vieux comté', detail: 'Une pâte légère et dorée, garnie de vieux comté affiné et d’une pointe de muscade.', price: '9 €', image: images.aperitif },
      { id: 'tomate-fumee', eyebrow: 'Fraîcheur', name: 'Tartare de tomate fumée', detail: 'Tomates de saison, huile de basilic et pain de campagne croustillant.', price: '11 €', image: images.entree },
      { id: 'rillettes-truite', eyebrow: 'Bord de mer', name: 'Rillettes de truite', detail: 'Truite délicatement fumée, crème citronnée et pickles de fenouil.', price: '13 €', image: images.poisson },
      { id: 'croquette-volaille', eyebrow: 'Croustillant', name: 'Croquette de volaille', detail: 'Volaille confite, cœur fondant et moutarde douce à l’ancienne.', price: '12 €', image: images.volaille },
      { id: 'pissaladiere', eyebrow: 'Du Sud', name: 'Mini pissaladière', detail: 'Oignons doucement confits, olives noires, thym et pâte croustillante.', price: '10 €', image: images.aperitif },
      { id: 'huitre', eyebrow: 'Iodé', name: 'Huître & granité citron', detail: 'Huître fraîche, granité citronné et huile délicate aux herbes.', price: '15 €', image: images.poisson },
      { id: 'briouates-agneau', eyebrow: 'Épices douces', name: 'Briouates d’agneau', detail: 'Agneau mariné aux herbes, feuilles de brick croustillantes et yaourt au citron.', price: '13 €', image: images.agneau },
      { id: 'brick-oeuf', eyebrow: 'Croustillant', name: 'Brick à l’œuf aux fines herbes', detail: 'Œuf coulant, persil, ciboulette et pâte brick dorée au beurre clarifié.', price: '11 €', image: images.aperitif },
    ],
  },
  {
    id: 'entrees',
    label: 'Entrées',
    shortLabel: 'Entrées',
    subtitle: 'Les premiers parfums',
    items: [
      { id: 'veloute', eyebrow: 'De saison', name: 'Velouté de potimarron', detail: 'Crème de châtaigne, noisettes torréfiées et huile de sauge.', price: '14 €', image: images.vegetal },
      { id: 'oeuf-parfait', eyebrow: 'Signature', name: 'Œuf parfait', detail: 'Champignons rôtis, émulsion de comté et mouillettes au beurre noisette.', price: '15 €', image: images.aperitif },
      { id: 'poireau', eyebrow: 'Végétal', name: 'Poireau vinaigrette', detail: 'Poireau braisé, vinaigrette aux herbes et jaune d’œuf confit.', price: '13 €', image: images.entree },
      { id: 'truite-marinee', eyebrow: 'Fraîcheur', name: 'Truite marinée', detail: 'Crème crue, concombre, aneth et œufs de truite légèrement fumés.', price: '17 €', image: images.poisson },
      { id: 'salade-lentilles', eyebrow: 'Végétal', name: 'Salade de lentilles & grenade', detail: 'Lentilles du Puy, grenade, menthe fraîche et vinaigrette au citron confit.', price: '14 €', image: images.vegetal },
    ],
  },
  {
    id: 'plats',
    label: 'Plats principaux',
    shortLabel: 'Plats',
    subtitle: 'Le cœur de la table',
    items: [
      { id: 'volaille', eyebrow: 'Signature de la maison', name: 'Volaille fermière dorée', detail: 'Une peau croustillante, une chair tendre et un jus réduit lentement pour concentrer toute la saveur du terroir.', price: '26 €', image: images.volaille },
      { id: 'lieu', eyebrow: 'Arrivage du marché', name: 'Lieu jaune nacré', detail: 'Une cuisson juste nacrée, réveillée par un beurre vif et la douceur fondante du poireau de saison.', price: '29 €', image: images.poisson },
      { id: 'potimarron', eyebrow: 'Création végétale', name: 'Potimarron confit', detail: 'Le potimarron caramélise doucement avant de rencontrer la rondeur de la châtaigne et le croquant des noisettes.', price: '21 €', image: images.vegetal },
      { id: 'agneau-epices', eyebrow: 'Épices douces', name: 'Agneau confit aux épices douces', detail: 'Épaule fondante, jus parfumé au cumin et coriandre, semoule dorée et légumes rôtis.', price: '30 €', image: images.agneau },
      { id: 'tagine-poulet', eyebrow: 'Volaille du terroir', name: 'Tagine de poulet aux olives', detail: 'Poulet fermier, olives vertes, citrons confits et herbes fraîches, servi avec semoule légère.', price: '27 €', image: images.volaille },
      { id: 'couscous-legumes', eyebrow: 'Saveurs du marché', name: 'Couscous royal aux légumes', detail: 'Semoule aérienne, légumes de saison, pois chiches et bouillon parfumé aux épices douces.', price: '24 €', image: images.vegetal },
    ],
  },
  {
    id: 'desserts',
    label: 'Desserts',
    shortLabel: 'Desserts',
    subtitle: 'La dernière gourmandise',
    items: [
      { id: 'tarte-pomme', eyebrow: 'Tout en finesse', name: 'Tarte fine aux pommes', detail: 'Pommes caramélisées, crème crue vanillée et caramel au beurre salé.', price: '11 €', image: images.dessert },
      { id: 'chocolat', eyebrow: 'Intense', name: 'Chocolat grand cru', detail: 'Crémeux chocolat noir, croustillant praliné et glace au grué de cacao.', price: '12 €', image: images.dessert },
      { id: 'paris-brest', eyebrow: 'Classique français', name: 'Paris-Brest', detail: 'Pâte à choux, praliné noisette généreux et éclats de fruits secs.', price: '13 €', image: images.aperitif },
      { id: 'fraises', eyebrow: 'Fruit de saison', name: 'Fraises & verveine', detail: 'Fraises fraîches, crème légère, verveine citronnée et meringue craquante.', price: '12 €', image: images.entree },
    ],
  },
  {
    id: 'boissons',
    label: 'Boissons',
    shortLabel: 'Boissons',
    subtitle: '100 % sans alcool',
    items: [
      { id: 'citronnade', eyebrow: 'Fait maison', name: 'Citronnade au thym', detail: 'Citron pressé, sirop léger au thym frais et eau filtrée.', price: '6 €', image: images.boisson },
      { id: 'eau-botanique', eyebrow: 'Fait maison', name: 'Eau pétillante botanique', detail: 'Bulles fines, concombre, verveine et une pointe de baie rose.', price: '5 €', image: images.boisson },
      { id: 'jus-fruits', eyebrow: 'Pressé à la demande', name: 'Jus de fruits pressés', detail: 'Orange, pomme ou grenade, pressés devant vous et servis bien frais.', price: '7 €', image: images.boisson },
      { id: 'the-menthe', eyebrow: 'Chaud & frais', name: 'Thé à la menthe maison', detail: 'Menthe fraîche, thé vert parfumé et une touche de fleur d’oranger.', price: '5 €', image: images.boisson },
      { id: 'limonade-rose', eyebrow: 'Fait maison', name: 'Limonade rose au litchi', detail: 'Litchi, framboise, citron vert et eau gazeuse légèrement sucrée.', price: '6 €', image: images.boisson },
    ],
  },
];

export const menuItems = menuSections.flatMap((section) => section.items);
