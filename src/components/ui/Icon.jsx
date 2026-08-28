import {
  Bike,
  Cake,
  CalendarDays,
  ChefHat,
  Coffee,
  CookingPot,
  Drumstick,
  Flame,
  Handshake,
  Heart,
  Leaf,
  PartyPopper,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sprout,
  Star,
  Users,
  Utensils,
} from "lucide-react";

/**
 * Explicit registry so the data files can reference icons by name while the
 * bundler still tree-shakes everything unused out of lucide.
 */
const REGISTRY = {
  Bike,
  Cake,
  CalendarDays,
  ChefHat,
  Coffee,
  CookingPot,
  Drumstick,
  Flame,
  Handshake,
  Heart,
  Leaf,
  PartyPopper,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sprout,
  Star,
  Users,
  Utensils,
};

export default function Icon({ name, className = "size-6", ...props }) {
  const Glyph = REGISTRY[name] ?? Utensils;
  return <Glyph className={className} aria-hidden="true" {...props} />;
}
