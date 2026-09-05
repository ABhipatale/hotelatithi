import { IMAGES } from "./images";

/**
 * The photographed dishes shown as picture cards.
 *
 * Prices here are reconciled against the printed card in
 * `public/menu-card-hotel-atithi.pdf` wherever it names the same dish. Six did
 * not match and were corrected. Several cards below are NOT on that card at
 * all — कांदा भजी, भजी प्लेट, कांदा पोहे, स्पेशल चहा, मटण मसालेदारी and
 * मटण थाळी विथ सोलकढी — so their prices are unverified; and the card prices
 * जत्रा धनगरी थाळी only as स्पेशल मटण धनगरी थाळी at ₹360, not ₹240. The hotel
 * needs to confirm those before launch. `fullMenuData.js` is the authority.
 *
 * Originally transcribed from the hotel's own menu cards
 * (src/assets/menucard-*.webp).
 *
 * Only dishes we hold a genuine photograph of appear as picture cards — the
 * rest of the card is published below the grid as the real menu photographs,
 * so nothing is illustrated with a stand-in.
 *
 * NOTE: the supplied cards show two price revisions for several items; the
 * figures below follow the spiral-bound card. Confirm before launch.
 * `full` carries the full-plate rate where a half/full pair exists.
 */
export const MENU_CATEGORIES = [
  { id: "all", labelMr: "सर्व", labelEn: "All" },
  { id: "thali", labelMr: "थाळी", labelEn: "Thali" },
  { id: "mutton", labelMr: "मटण", labelEn: "Mutton" },
  { id: "veg", labelMr: "व्हेज", labelEn: "Veg" },
  { id: "starters", labelMr: "स्टार्टर", labelEn: "Starters" },
  { id: "breakfast", labelMr: "नाश्ता", labelEn: "Breakfast" },
];

export const MENU_ITEMS = [
  // ---------------- thali ----------------
  {
    id: "jatra-dhangari-thali",
    nameMr: "जत्रा धनगरी थाळी",
    nameEn: "Jatra Dhangari Thali",
    descMr: "मटण / चिकन — कमी कालावधीत प्रसिद्ध झालेली थाळी",
    price: 240,
    category: "thali",
    // A whole thali, centred, and already close to the card's 4:3 — so the
    // crop takes almost nothing off it. The previous shot was a corner of a
    // busy table: laminated card, tissues and a steel tumbler, with the food
    // pushed to the edge of the frame.
    image: IMAGES.thaliChapatiTop,
    badge: "सर्वाधिक प्रसिद्ध",
    veg: false,
  },
  {
    id: "mutton-thali",
    nameMr: "मटण थाळी",
    nameEn: "Mutton Thali",
    descMr: "तांबडा रस्सा, सुक्कं, भाकरी, भात आणि ताक",
    price: 350,
    category: "thali",
    // Two full thalis with the taak the description promises. Replaces the
    // studio cut-out, whose flat yellow backdrop bled into the card corners
    // and made it the one tile in the grid that was not a photograph.
    image: IMAGES.guestsThaliWindow,
    position: "object-[50%_72%]",
    veg: false,
  },
  {
    id: "solkadhi-thali",
    nameMr: "मटण थाळी विथ सोलकढी",
    nameEn: "Mutton Thali with Solkadhi",
    descMr: "रस्सा, सुक्कं आणि थंडगार सोलकढी",
    price: 260,
    category: "thali",
    // The only close-up that actually shows the solkadhi this dish is named
    // for, alongside the rassa and sukka. The previous frame was dim and the
    // solkadhi was the one thing in it you could not pick out.
    image: IMAGES.thaliSteelCloseup,
    position: "object-[50%_45%]",
    veg: false,
  },
  {
    id: "veg-thali",
    nameMr: "व्हेज थाळी",
    nameEn: "Veg Thali",
    descMr: "पनीर मसाला, मिक्स व्हेज, डाळ, कोशिंबीर, ३ चपाती, गोड पदार्थ",
    price: 200,
    category: "thali",
    image: IMAGES.thaliVeg,
    veg: true,
  },
  {
    id: "pithla-thali",
    nameMr: "स्पेशल पिठलं थाळी",
    nameEn: "Special Pithla Thali",
    descMr: "पिठलं-भाकरी, ठेचा, कांदा, लोणचं आणि ताक भात",
    price: 200,
    category: "thali",
    image: IMAGES.thaliVegTaak,
    badge: "गावरान",
    veg: true,
  },

  // ---------------- mutton ----------------
  {
    id: "mutton-handi",
    nameMr: "मटण हंडी",
    nameEn: "Mutton Handi",
    descMr: "गावरान मसाल्यातील दाट रस्सा, सोबत बटर नान",
    price: 900,
    full: 550,
    category: "mutton",
    image: IMAGES.handiNaan,
    badge: "स्पेशल",
    veg: false,
  },
  {
    id: "mutton-masaledari",
    nameMr: "मटण मसालेदारी",
    nameEn: "Mutton Masaledari",
    descMr: "झणझणीत तांबडा रस्सा आणि गरम नान",
    price: 350,
    full: 650,
    category: "mutton",
    image: IMAGES.rassaButterNaan,
    veg: false,
  },
  {
    id: "mutton-sukka",
    nameMr: "मटण सुक्का",
    nameEn: "Mutton Sukka",
    descMr: "खोबरं-मसाल्यात परतलेलं कोरडं मटण",
    price: 240,
    category: "mutton",
    image: IMAGES.thaliMuttonTable,
    veg: false,
  },
  {
    id: "kheema-pav",
    nameMr: "खिमा पाव",
    nameEn: "Kheema Pav",
    descMr: "बारीक मटण खिमा आणि गरम पाव",
    price: 130,
    category: "mutton",
    image: IMAGES.kheemaPav,
    veg: false,
  },
  {
    id: "mutton-top",
    nameMr: "मटण फ्राय मसाला प्लेट",
    nameEn: "Mutton Fry Masala Plate",
    descMr: "भाकरीसोबत खाण्यासाठी खमंग मटण प्लेट",
    price: 150,
    category: "mutton",
    image: IMAGES.thaliMuttonTop,
    veg: false,
  },

  // ---------------- starters ----------------
  {
    id: "kanda-bhaji",
    nameMr: "कांदा भजी",
    nameEn: "Kanda Bhaji",
    descMr: "कुरकुरीत भजी, तळलेली मिरची आणि चटणी",
    price: 80,
    category: "starters",
    image: IMAGES.kandaBhajiPlates,
    badge: "पावसाळी स्पेशल",
    veg: true,
  },
  {
    id: "kanda-bhaji-plate",
    nameMr: "भजी प्लेट",
    nameEn: "Bhaji Plate",
    descMr: "गरमागरम, चहासोबत उत्तम",
    price: 80,
    category: "starters",
    image: IMAGES.kandaBhaji,
    veg: true,
  },
  {
    id: "masala-papad",
    nameMr: "मसाला पापड",
    nameEn: "Masala Papad",
    descMr: "कांदा, टोमॅटो आणि शेव",
    price: 50,
    category: "starters",
    image: IMAGES.masalaPapad,
    veg: true,
  },

  // ---------------- breakfast ----------------
  {
    id: "kanda-pohe",
    nameMr: "कांदा पोहे",
    nameEn: "Kanda Pohe",
    descMr: "सकाळच्या नाश्त्याची खास चव",
    price: 40,
    category: "breakfast",
    image: IMAGES.kandaPohe,
    veg: true,
  },
  {
    id: "chaha",
    nameMr: "स्पेशल चहा",
    nameEn: "Special Chai",
    descMr: "कडक आणि वाफाळता चहा",
    price: 15,
    category: "breakfast",
    image: IMAGES.chaha,
    veg: true,
  },
];

/** The hotel's actual printed menu, published as-is. */
export const MENU_CARDS = [
  { id: "mc1", image: IMAGES.menucardNonveg2, labelMr: "नॉनव्हेज मेनू" },
  { id: "mc2", image: IMAGES.menucardVeg1, labelMr: "व्हेज मेनू" },
  { id: "mc3", image: IMAGES.menucardNonveg1, labelMr: "थाळी आणि दरपत्रक" },
  { id: "mc4", image: IMAGES.menucardVeg2, labelMr: "व्हेज दरपत्रक" },
  { id: "mc5", image: IMAGES.menucardDhaba, labelMr: "स्पेशल मेनू" },
];
