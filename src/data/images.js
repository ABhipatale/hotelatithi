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

  // menu cards
  menucardVeg1,
  menucardVeg2,
  menucardNonveg1,
  menucardNonveg2,
  menucardDhaba,
};
