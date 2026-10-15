import type { Product } from './data';

export type Preferences = {
  app: 'any' | 'yes' | 'no';
  motor: 'any' | 'integrated' | 'separate' | 'manual';
  set: 'any' | 'single' | 'double';
};

export function findProducts(products: Product[], preferences: Preferences): Product[] {
  return products.filter(product => {
    const motor = product.category.startsWith('Manuell') ? 'manual' : product.wearStyle.includes('separat') ? 'separate' : 'integrated';
    const matchesApp = preferences.app === 'any' || product.app === (preferences.app === 'yes');
    const matchesMotor = preferences.motor === 'any' || preferences.motor === motor;
    const matchesSet = preferences.set === 'any' || (preferences.set === 'double' ? product.set.includes('Doppel') : product.set.includes('Einzel'));
    return matchesApp && matchesMotor && matchesSet;
  });
}
