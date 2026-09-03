export type DishExtra = {
  id: string;
  label: string;
  price: number;
};

const extrasBySection: Record<string, readonly DishExtra[]> = {
  aperitifs: [
    { id: 'herb-sauce', label: 'Sauce aux herbes', price: 1.5 },
    { id: 'toasted-bread', label: 'Pain de campagne grillé', price: 2 },
    { id: 'house-pickles', label: 'Pickles maison', price: 1 },
  ],
  entrees: [
    { id: 'toasted-bread', label: 'Pain de campagne grillé', price: 2 },
    { id: 'comte-cream', label: 'Crème de comté', price: 3 },
    { id: 'fresh-herbs', label: 'Herbes fraîches', price: 1 },
  ],
  plats: [
    { id: 'mashed-potatoes', label: 'Purée maison', price: 4 },
    { id: 'seasonal-vegetables', label: 'Légumes de saison', price: 5 },
    { id: 'extra-sauce', label: 'Sauce supplémentaire', price: 2 },
  ],
  desserts: [
    { id: 'vanilla-ice-cream', label: 'Glace vanille', price: 3 },
    { id: 'whipped-cream', label: 'Crème fouettée', price: 2 },
    { id: 'fruit-coulis', label: 'Coulis de fruits', price: 2 },
  ],
  boissons: [
    { id: 'fresh-citrus', label: 'Agrumes frais', price: 1 },
    { id: 'house-syrup', label: 'Sirop maison', price: 1 },
    { id: 'ice', label: 'Glaçons', price: 0 },
  ],
};

const allergensBySection: Record<string, readonly string[]> = {
  aperitifs: ['Gluten', 'Lait'],
  entrees: ['Lait', 'Œufs'],
  plats: ['Lait'],
  desserts: ['Gluten', 'Lait', 'Œufs', 'Fruits à coque'],
  boissons: [],
};

export const getDishExtras = (sectionId: string) => extrasBySection[sectionId] ?? [];
export const getDishAllergens = (sectionId: string) => allergensBySection[sectionId] ?? [];
