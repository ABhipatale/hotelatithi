/**
 * Photography map.
 *
 * MOST of these are the hotel's own photographs. Seven are NOT — the three hero
 * slides, the signature medallion and three menu cards render sourced stock,
 * and `heroMuttonBowl` traces back to a file whose own XMP declares it
 * AI-generated. README.md lists every pair with the evidence. Do not restate
 * "no stock imagery is used" here; that claim was in this header and it was
 * false.
 *
 * Vite fingerprints and serves these from /assets, so importing them keeps
 * cache-busting automatic.
 */

// — the place —
import exteriorFront from "../assets/exterior-front.webp";
import exteriorSide from "../assets/exterior-side.webp";
import exteriorParking from "../assets/exterior-parking.webp";
import signboard from "../assets/signboard.webp";
import hallIndoor from "../assets/hall-indoor.webp";
import hallIndoorWide from "../assets/hall-indoor-wide.webp";
import gardenSeating from "../assets/garden-seating.webp";
import guestsJevan from "../assets/guests-jevan.webp";
import ownerPortrait from "../assets/owner-portrait.webp";
import icecreamParlour from "../assets/icecream-parlour.webp";

// — hero rotation —
import heroCurryBrass from "../assets/hero-curry-brass.webp";
import heroPaneerSpread from "../assets/hero-paneer-spread.webp";
import heroMuttonBowl from "../assets/hero-mutton-bowl.webp";

// — newer dish and guest photography —
import dishTandooriSizzler from "../assets/dish-tandoori-sizzler.webp";
import guestsThaliWindow from "../assets/guests-thali-window.webp";
import thaliSteelCloseup from "../assets/thali-steel-closeup.webp";
import thaliChapatiTop from "../assets/thali-chapati-top.webp";

// — studio cut-outs (subject lifted off its flat backdrop) —
import cutoutMuttonThali from "../assets/cutout-mutton-thali.webp";
import cutoutVegThali from "../assets/cutout-veg-thali.webp";

// — signature thalis —
import thaliJatraDhangari from "../assets/thali-jatra-dhangari.webp";
import cardJatraDhangari from "../assets/card-jatra-dhangari.webp";
import thaliMuttonHero from "../assets/thali-mutton-hero.webp";
import thaliMuttonTable from "../assets/thali-mutton-table.webp";
import thaliMuttonTop from "../assets/thali-mutton-top.webp";
import thaliSolkadhi from "../assets/thali-solkadhi.webp";
import thaliVeg from "../assets/thali-veg.webp";
import thaliVegTaak from "../assets/thali-veg-taak.webp";

// — dishes —
import handiNaan from "../assets/handi-naan.webp";
import rassaButterNaan from "../assets/rassa-butter-naan.webp";
import kheemaPav from "../assets/kheema-pav.webp";
import kandaBhaji from "../assets/kanda-bhaji.webp";
import kandaBhajiPlates from "../assets/kanda-bhaji-plates.webp";
import kandaBhajiWide from "../assets/kanda-bhaji-wide.webp";
import kandaPohe from "../assets/kanda-pohe.webp";
import masalaPapad from "../assets/masala-papad.webp";
import chaha from "../assets/chaha.webp";

// — the hotel's own photography, shot September 2026 —
// Twelve thalis on the green marble table against the red brick wall, the lit
// signboard after dark, and the hall mid-service. These are the files that let
// the site stop leaning on sourced stock for its food photography.
import thaliMuttonSolkadhi from "../assets/thali-mutton-solkadhi.webp";
import thaliVegFull from "../assets/thali-veg-full.webp";
import thaliBhakriTaak from "../assets/thali-bhakri-taak.webp";
import thaliVegPapad from "../assets/thali-veg-papad.webp";
import thaliMuttonButter from "../assets/thali-mutton-butter.webp";
import muttonFryPlate from "../assets/mutton-fry-plate.webp";
import thaliVegGreen from "../assets/thali-veg-green.webp";
import thaliNonvegLarge from "../assets/thali-nonveg-large.webp";
import thaliMuttonRiceReal from "../assets/thali-mutton-rice-real.webp";
import thaliSpecialEgg from "../assets/thali-special-egg.webp";
import thaliMuttonRassa from "../assets/thali-mutton-rassa.webp";
import thaliChickenSpread from "../assets/thali-chicken-spread.webp";
import signNeonCloseup from "../assets/sign-neon-closeup.webp";
import signNight from "../assets/sign-night.webp";
import hallGuestsNight from "../assets/hall-guests-night.webp";
import hallGuestsWide from "../assets/hall-guests-wide.webp";

// — menu cards —
import menucardVeg1 from "../assets/menucard-veg-1.webp";
import menucardVeg2 from "../assets/menucard-veg-2.webp";
import menucardNonveg1 from "../assets/menucard-nonveg-1.webp";
import menucardNonveg2 from "../assets/menucard-nonveg-2.webp";
import menucardDhaba from "../assets/menucard-dhaba.webp";

/**
 * Kept so call sites don't change: local imports already resolve to a final
 * URL, so this simply passes them through.
 */
export function photo(src) {
  return src;
}

export const IMAGES = {
  // the place
  exteriorFront,
  exteriorSide,
  exteriorParking,
  signboard,
  hallIndoor,
  hallIndoorWide,
  gardenSeating,
  guestsJevan,
  ownerPortrait,
  icecreamParlour,

  // hero rotation
  heroCurryBrass,
  heroPaneerSpread,
  heroMuttonBowl,

  // newer dish and guest photography
  dishTandooriSizzler,
  guestsThaliWindow,
  thaliSteelCloseup,
  thaliChapatiTop,

  // studio cut-outs
  cutoutMuttonThali,
  cutoutVegThali,

  // signature thalis
  thaliJatraDhangari,
  cardJatraDhangari,
  thaliMuttonHero,
  thaliMuttonTable,
  thaliMuttonTop,
  thaliSolkadhi,
  thaliVeg,
  thaliVegTaak,

  // dishes
  handiNaan,
  rassaButterNaan,
  kheemaPav,
  kandaBhaji,
  kandaBhajiPlates,
  kandaBhajiWide,
  kandaPohe,
  masalaPapad,
  chaha,

  // the hotel's own, September 2026
  thaliMuttonSolkadhi,
  thaliVegFull,
  thaliBhakriTaak,
  thaliVegPapad,
  thaliMuttonButter,
  muttonFryPlate,
  thaliVegGreen,
  thaliNonvegLarge,
  thaliMuttonRiceReal,
  thaliSpecialEgg,
  thaliMuttonRassa,
  thaliChickenSpread,
  signNeonCloseup,
  signNight,
  hallGuestsNight,
  hallGuestsWide,

  // menu cards
  menucardVeg1,
  menucardVeg2,
  menucardNonveg1,
  menucardNonveg2,
  menucardDhaba,
};
