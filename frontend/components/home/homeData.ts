import { Gem, RefreshCw, Briefcase, ShoppingBag, Package, Layers } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Service {
  title: string;
  description: string;
  Icon: LucideIcon;
}

export const services: Service[] = [
  {
    title: 'Custom Cutting',
    description: "Receive a tailored cutting experience designed to reveal a gemstone's highest potential.",
    Icon: Gem,
  },
  {
    title: 'Re-Polish & Re-Cut',
    description: 'Breathe new life into existing cut stones and restore their beauty without compromising weight.',
    Icon: RefreshCw,
  },
  {
    title: 'Jeweler Services',
    description: 'Online service requests and work orders  for industry professionals for quick turn arounds and shorter lead times.',
    Icon: Briefcase,
  },
  {
    title: 'Sell Gemstones',
    description: 'An online shop with custom and flexible purchasing features, including pay now, pay later, inquiries and negotiations directly through the site.',
    Icon: ShoppingBag,
  },
  {
    title: 'Buy Rough',
    description: 'Source quality rough gemstones for your cutting projects.',
    Icon: Package,
  },
  {
    title: 'Buy Gems In Bulk',
    description: 'Wholesale purchasing from jewelers and dealers.',
    Icon: Layers,
  },
];
