export type Restaurant = {
  id: string;
  name: string;
  city: string;
  area: string;
  address: string;
  hours: string;
  services: string[];
  latitude: number;
  longitude: number;
};

export const restaurants: readonly Restaurant[] = [
  { id: 'paris-marais', name: 'Savoraille Paris', city: 'Paris', area: 'Le Marais', address: '24 rue du Temple · Paris 4e', hours: 'Mar–Dim · 12 h–23 h', services: ['Sur place', 'À emporter', 'Livraison'], latitude: 48.8593, longitude: 2.3532 },
  { id: 'lyon-presquile', name: 'Savoraille Lyon', city: 'Lyon', area: 'Presqu’île', address: '18 rue Mercière · Lyon 2e', hours: 'Mar–Dim · 12 h–23 h', services: ['Sur place', 'À emporter'], latitude: 45.7624, longitude: 4.8328 },
  { id: 'bordeaux-chartrons', name: 'Savoraille Bordeaux', city: 'Bordeaux', area: 'Les Chartrons', address: '31 quai des Chartrons · Bordeaux', hours: 'Mar–Dim · 12 h–23 h', services: ['Sur place', 'À emporter', 'Livraison'], latitude: 44.8508, longitude: -0.5715 },
] as const;

export function distanceInKilometres(latitude: number, longitude: number, restaurant: Restaurant) {
  const radius = 6371;
  const toRadians = (value: number) => value * Math.PI / 180;
  const latitudeDelta = toRadians(restaurant.latitude - latitude);
  const longitudeDelta = toRadians(restaurant.longitude - longitude);
  const a = Math.sin(latitudeDelta / 2) ** 2
    + Math.cos(toRadians(latitude)) * Math.cos(toRadians(restaurant.latitude)) * Math.sin(longitudeDelta / 2) ** 2;

  return radius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
