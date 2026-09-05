/**
 * The complete price list, transcribed from the hotel's printed menu card
 * (`public/menu-card-hotel-atithi.pdf`, "Menu Card Nov 2025").
 *
 * The PDF carries no text layer at all — zero embedded fonts, ninety images —
 * so every line here was read off a rendered page by eye. If a price looks
 * wrong, the card is the authority; check it before changing anything.
 *
 * `price` is the full portion. `half` is set only where the card prints a
 * full/half pair. `note` carries the card's own description of a thali.
 *
 * ⚠️ The card contradicts itself on starters. Pages 2 and 6 print one set,
 * pages 11 and 12 print a fuller set with several different prices — Chicken
 * Tikka is ₹140 on page 6 and ₹200 on page 12, Tandoor Chicken ₹530 then ₹550.
 * The later pages are used here because they are more complete and appear to
 * supersede, but the hotel should confirm which is current.
 */

export const MENU_SECTIONS = [
  // ---------------------------------------------------------------- veg ---
  {
    id: "veg-soup",
    titleMr: "व्हेज सुप",
    titleEn: "Veg Soup",
    veg: true,
    items: [
      { mr: "टोमॅटो सुप", en: "Tomato Soup", price: 100 },
      { mr: "व्हेज मनचाऊ सुप", en: "Veg Manchow Soup", price: 100 },
    ],
  },
  {
    id: "veg-starters",
    titleMr: "व्हेज स्टार्टर",
    titleEn: "Veg Starters",
    veg: true,
    items: [
      { mr: "रोस्टेड पापड", en: "Roasted Papad", price: 25 },
      { mr: "फ्राय पापड", en: "Fry Papad", price: 40 },
      { mr: "मसाला पापड", en: "Masala Papad", price: 50 },
      { mr: "पनीर चुटकी", en: "Paneer Chutki", price: 170 },
      { mr: "पनीर चिल्ली", en: "Paneer Chilli", price: 210 },
      { mr: "व्हेज मॅजिक स्पेशल", en: "Veg Magic Special", price: 210 },
      { mr: "पनीर ६५", en: "Paneer 65", price: 210 },
      { mr: "पनीर टिक्का", en: "Paneer Tikka", price: 250 },
    ],
  },
  {
    id: "atithi-veg-main",
    titleMr: "अतिथी स्पे. व्हेज मेनकोर्स",
    titleEn: "Atithi Sp. Veg Maincourse",
    veg: true,
    items: [
      { mr: "अतिथी स्पेशल", en: "Atithi Special", price: 390 },
      { mr: "व्हेज अंगारा", en: "Veg Angara", price: 360 },
      { mr: "व्हेज मराठा", en: "Veg Maratha", price: 270 },
      { mr: "व्हेज हंडी", en: "Veg Handi", price: 280 },
      { mr: "व्हेज मालवणी", en: "Veg Malvani", price: 290 },
    ],
  },
  {
    id: "veg-main",
    titleMr: "व्हेज मेनकोर्स",
    titleEn: "Veg Main Course",
    veg: true,
    items: [
      { mr: "आख्खा मसुरा", en: "Akkha Masura", price: 140 },
      { mr: "दाल फ्राय", en: "Daal Fry", price: 120 },
      { mr: "दाल तडका", en: "Daal Tadka", price: 140 },
      { mr: "दाल कोल्हापुरी", en: "Daal Kolhapuri", price: 130 },
      { mr: "ग्रीन पीस मसाला", en: "Green Peace Masala", price: 190 },
      { mr: "मिक्स व्हेज", en: "Mix Veg", price: 190 },
      { mr: "व्हेज कोल्हापुरी", en: "Veg Kolhapuri", price: 210 },
      { mr: "भरलेले वांगे", en: "Bharlele Wange", price: 160 },
      { mr: "शेव भाजी", en: "Shev Bhaji", price: 170 },
    ],
  },
  {
    id: "paneer",
    titleMr: "पनीर स्पेशल",
    titleEn: "Paneer Special",
    veg: true,
    items: [
      { mr: "पनीर मालवणी", en: "Paneer Malwani", price: 310 },
      { mr: "पनीर टिक्का मसाला", en: "Paneer Tikka Masala", price: 250 },
      { mr: "पनीर बटर मसाला", en: "Paneer Butter Masala", price: 230 },
      { mr: "पनीर मसाला", en: "Paneer Masala", price: 220 },
      { mr: "पनीर मटर मसाला", en: "Paneer Mutter Masala", price: 210 },
      { mr: "पनीर बुर्जी", en: "Paneer Burji", price: 220 },
    ],
  },
  {
    id: "kaju",
    titleMr: "काजू स्पेशल",
    titleEn: "Kaju Special",
    veg: true,
    items: [
      { mr: "काजू पनीर मसाला", en: "Kaju Paneer Masala", price: 240 },
      { mr: "काजू मटर मसाला", en: "Kaju Mutter Masala", price: 220 },
      { mr: "काजू मसाला", en: "Kaju Masala", price: 240 },
      { mr: "काजू करी", en: "Kaju Curry", price: 230 },
    ],
  },
  {
    id: "veg-thali",
    titleMr: "व्हेज थाळी स्पेशल",
    titleEn: "Veg Thali Special",
    veg: true,
    items: [
      {
        mr: "व्हेज पंजाबी थाळी",
        en: "Veg Punjabi Thali",
        price: 240,
        note: "पनीर वाटी, मिक्स व्हेज, दाल फ्राय, आख्खा मसुरा, ताक वाटी, श्रीखंड वाटी, पापड, चपाती/रोटी–३, राईस प्लेट",
      },
      {
        mr: "स्पेशल पिठलं थाळी",
        en: "Special Pithla Thali",
        price: 200,
        note: "पिठलं प्लेट, दाल वाटी, शेंगदाणे चटणी, खरडा, पापड, ताक, भाकरी–२, चपाती/रोटी–२, राईस प्लेट",
      },
      { mr: "व्हेज महाराष्ट्रीयन थाळी", en: "Veg Maharashtrian Thali", price: 190 },
    ],
  },
  {
    id: "roti",
    titleMr: "रोटी",
    titleEn: "Roti",
    veg: true,
    items: [
      { mr: "तंदूर रोटी", en: "Tandoor Roti", price: 20 },
      { mr: "बटर रोटी", en: "Butter Roti", price: 30 },
      { mr: "चपाती", en: "Chapati", price: 25 },
      { mr: "नान", en: "Naan", price: 45 },
      { mr: "बटर नान", en: "Butter Naan", price: 55 },
      { mr: "गार्लिक नान", en: "Garlic Naan", price: 70 },
      { mr: "ज्वारी भाकरी", en: "Jwari Bhakari", price: 30 },
      { mr: "बाजरी भाकरी", en: "Bajari Bhakari", price: 30 },
    ],
  },
  {
    id: "veg-rice",
    titleMr: "व्हेज राईस",
    titleEn: "Veg Rice",
    veg: true,
    items: [
      { mr: "प्लेन राईस", en: "Plain Rice", price: 110, half: 70 },
      { mr: "जिरा राईस", en: "Jeera Rice", price: 120, half: 80 },
      { mr: "स्टीम राईस", en: "Steam Rice", price: 110 },
      { mr: "व्हेज बिर्याणी", en: "Veg Biryani", price: 240 },
      { mr: "व्हेज पुलाव", en: "Veg Pulav", price: 220 },
      { mr: "दाल खिचडी", en: "Daal Khichadi", price: 190 },
    ],
  },
  {
    id: "cold-drinks",
    titleMr: "कोल्ड्रिंक्स",
    titleEn: "Cold Drinks",
    veg: true,
    items: [
      { mr: "दही", en: "Dahi", price: 20 },
      { mr: "ताक", en: "Taak", price: 30 },
      { mr: "मसाला ताक", en: "Masala Taak", price: 40 },
      { mr: "सोलकडी", en: "Solkadi", price: 40 },
      { mr: "फ्रेश लाईम सोडा", en: "Fresh Lime Soda", price: 60 },
    ],
  },

  // ------------------------------------------------------------ non-veg ---
  {
    id: "nonveg-starters",
    titleMr: "नॉनव्हेज स्टार्टर",
    titleEn: "Non-veg Starter",
    veg: false,
    items: [
      { mr: "तंदूर चिकन", en: "Tandoor Chicken", price: 550, half: 300 },
      { mr: "चिकन चिल्ली", en: "Chicken Chilli", price: 240 },
      { mr: "चिकन ६५", en: "Chicken 65", price: 190 },
      { mr: "चिकन मॅजिक", en: "Chicken Magic", price: 230 },
      { mr: "चिकन टिक्का", en: "Chicken Tikka", price: 200 },
      { mr: "चिकन क्रिस्पी", en: "Chicken Crispy", price: 230 },
      { mr: "चिकन पहाडी कबाब", en: "Chicken Pahadi Kabab", price: 240 },
      { mr: "बंजारा कबाब", en: "Banjara Kabab", price: 250 },
      { mr: "अंडा ऑम्लेट", en: "Anda Omelette", price: 80 },
      { mr: "अंडा बुर्जी", en: "Anda Bhurji", price: 90 },
      { mr: "अंडा हाफ फ्राय", en: "Egg Half Fry", price: 80 },
      { mr: "बॉयल अंडा", en: "Boil Anda", price: 30 },
    ],
  },
  {
    id: "mutton-main",
    titleMr: "मटण मेन कोर्स",
    titleEn: "Mutton Main Course",
    veg: false,
    items: [
      { mr: "मटण मालवणी", en: "Mutton Malwani", price: 920, half: 570 },
      { mr: "मटण धनगरी हंडी", en: "Mutton Dhangari Handi", price: 900, half: 560 },
      { mr: "मटण हंडी", en: "Mutton Handi", price: 900, half: 550 },
      { mr: "मटण मसाला", en: "Mutton Masala", price: 270 },
      { mr: "मटण सुक्का", en: "Mutton Sukka", price: 240 },
      { mr: "मटण प्लेट", en: "Mutton Plate", price: 220 },
      { mr: "मटण खिमा प्लेट", en: "Mutton Kheema Plate", price: 130 },
    ],
  },
  {
    id: "chicken-main",
    titleMr: "चिकन मेन कोर्स",
    titleEn: "Chicken Main Course",
    veg: false,
    items: [
      { mr: "स्पे. बटर चिकन", en: "Sp. Butter Chicken", price: 790, half: 470 },
      { mr: "स्पे. चिकन धनगरी हंडी", en: "Sp. Chicken Dhangari Handi", price: 760, half: 440 },
      { mr: "स्पे. मुर्गमुसल्लम", en: "Tandoori Chicken Boneless Handi", price: 950, half: 490 },
      { mr: "चिकन मालवणी", en: "Chicken Malwani", price: 800, half: 470 },
      { mr: "चिकन हंडी", en: "Chicken Handi", price: 790, half: 460 },
      { mr: "गावराण चिकन हंडी", en: "Gavran Chicken Handi", price: 950, half: 600 },
      { mr: "चिकन मसाला", en: "Chicken Masala", price: 260 },
      { mr: "चिकन सुक्का", en: "Chicken Sukka", price: 180 },
      { mr: "चिकन प्लेट", en: "Chicken Plate", price: 170 },
      { mr: "अंडा करी", en: "Egg Curry", price: 130 },
      { mr: "अंडा मसाला", en: "Egg Masala", price: 140 },
    ],
  },
  {
    id: "biryani",
    titleMr: "बिर्याणी राईस नॉनव्हेज",
    titleEn: "Biryani Rice",
    veg: false,
    items: [
      { mr: "मटण बिर्याणी", en: "Mutton Biryani", price: 460, half: 330 },
      { mr: "चिकन बिर्याणी", en: "Chicken Biryani", price: 390, half: 260 },
      { mr: "अंडा बिर्याणी", en: "Egg Biryani", price: 190 },
    ],
  },
  {
    id: "mutton-thali",
    titleMr: "नॉनव्हेज थाळी स्पेशल — मटण",
    titleEn: "Mutton Thali Special",
    veg: false,
    items: [
      {
        mr: "स्पेशल नादखुळा मटण थाळी",
        en: "Special Nadkhula Mutton Thali",
        price: 440,
        note: "मटण प्लेट, खर्डा मटण प्लेट, खिमा प्लेट, वजडी प्लेट, बॉयल अंडा /मर्यादित, अळणी–तांबडा–पांढरा रस्सा, सोलकडी, भाकरी/रोटी/चपाती, बिर्याणी/ इंद्रायणी राईस – अमर्यादित",
      },
      {
        mr: "स्पेशल मटण फ्राय थाळी",
        en: "Special Mutton Fry Thali",
        price: 370,
        note: "मटण फ्राय प्लेट, खिमा प्लेट, अळणी–तांबडा–पांढरा रस्सा, सोलकडी, भाकरी/रोटी/चपाती, बिर्याणी/ इंद्रायणी राईस – अमर्यादित",
      },
      { mr: "उकड मटण थाळी", en: "Ukad Mutton Thali", price: 370 },
      { mr: "मटण मसाला थाळी", en: "Mutton Masala Thali", price: 360 },
      { mr: "खर्डा मटण थाळी", en: "Kharda Mutton Thali", price: 360 },
      { mr: "स्पेशल मटण धनगरी थाळी", en: "Special Mutton Dhangari Thali", price: 360 },
      {
        mr: "मटण थाळी",
        en: "Mutton Thali",
        price: 350,
        note: "मटण प्लेट, खिमा प्लेट/मर्यादित, अळणी–तांबडा–पांढरा रस्सा, सोलकडी, भाकरी/रोटी/चपाती, बिर्याणी/इंद्रायणी राईस – अमर्यादित",
      },
    ],
  },
  {
    id: "chicken-thali",
    titleMr: "नॉनव्हेज थाळी स्पेशल — चिकन आणि अंडा",
    titleEn: "Chicken & Egg Thali Special",
    veg: false,
    items: [
      { mr: "स्पेशल नादखुळा चिकन थाळी", en: "Special Nadkhula Chicken Thali", price: 360 },
      { mr: "गावराण चिकन थाळी", en: "Gavran Chicken Thali", price: 320 },
      { mr: "स्पे. बटर चिकन थाळी", en: "Special Butter Chicken Thali", price: 300 },
      { mr: "स्पेशल चिकन फ्राय थाळी", en: "Special Chicken Fry Thali", price: 270 },
      { mr: "उकड चिकन थाळी", en: "Ukad Chicken Thali", price: 270 },
      { mr: "खर्डा चिकन थाळी", en: "Kharda Chicken Thali", price: 270 },
      { mr: "चिकन मसाला थाळी", en: "Chicken Masala Thali", price: 260 },
      { mr: "स्पेशल चिकन धनगरी थाळी", en: "Special Chicken Dhangari Thali", price: 260 },
      { mr: "चिकन थाळी", en: "Chicken Thali", price: 250 },
      { mr: "अंडा मसाला थाळी", en: "Egg Masala Thali", price: 230 },
      { mr: "अंडा करी थाळी", en: "Egg Curry Thali", price: 220 },
      {
        mr: "Empty थाळी (मर्यादित)",
        en: "Empty Thali (Limited)",
        price: 150,
        note: "तांबडा रस्सा, पांढरा रस्सा, २ रोटी/ १ भाकरी, इंद्रायणी राईस प्लेट",
      },
    ],
  },
];

/** Printed at the foot of the card — both lines are the hotel's own wording. */
export const MENU_NOTES = [
  "एक थाळी एक व्यक्तीसाठी मर्यादित राहील.",
  "ऑर्डरसाठी २५ मिनिटे लागतील.",
];

export const MENU_PDF_UPDATED = "नोव्हेंबर २०२५";
