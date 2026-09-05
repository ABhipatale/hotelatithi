/**
 * Single source of truth for brand copy and contact details.
 *
 * Everything not marked TODO was read off the hotel's own signboard, menu cards
 * or table card. The TODO items still need confirming before launch.
 */
export const SITE = {
  nameMr: "हॉटेल अतिथी",
  nameEn: "Hotel Atithi",
  kindMr: "फॅमिली गार्डन रेस्टॉरंट",
  kindEn: "Family Garden Restaurant",

  // printed on the signboard
  tagline: "गावाकडची माणसं... गावाकडची चव..!",
  taglineEn: "Village folk, village flavour",

  // printed on the menu card
  blessing: "|| अतिथी देवो भव ||",

  intro:
    "जत्रा धनगरी थाळी, गावरान मटण हंडी आणि चुलीवरची चव — व्हेज आणि नॉनव्हेज, दोन्ही एकाच ठिकाणी.",

  // from the signboard
  phone: "+91 89992 44403",
  phoneHref: "tel:+918999244403",
  whatsappHref: "https://wa.me/918999244403",

  // TODO: the hotel has not supplied an email address. Leave this null until
  // there is a real, monitored inbox — the contact card and the schema both
  // skip it while it is empty. Publishing a placeholder that bounces is worse
  // than showing no email at all.
  email: null,

  address: {
    line1: "हायवेलगत, फॅमिली गार्डन रेस्टॉरंट",
    line2: "कराड, जि. सातारा",
    line3: "महाराष्ट्र",
  },
  mapQuery: "Hotel Atithi, Karad, Maharashtra",
  mapEmbed:
    "https://www.google.com/maps?q=Karad%2C%20Maharashtra%20415110&output=embed",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Karad%2C+Maharashtra+415110",

  // TODO: confirm exact opening hours
  hours: {
    daysMr: "सोमवार – रविवार",
    daysEn: "Monday – Sunday",
    time: "सकाळी ११:०० – रात्री ११:००",
  },

  // printed at the foot of the menu card
  // The printed card says 25 minutes, not 30.
  orderNote: "ऑर्डरसाठी २५ मिनिटे लागतील",

  social: {
    // printed on the table card
    instagram: "https://instagram.com/hotelatithi_",
    instagramHandle: "@hotelatithi_",
    facebook: "https://facebook.com/",
    whatsapp: "https://wa.me/918999244403",
  },
};

/**
 * ⚠️ DRAFT COPY — the quote below is written on the owner's behalf, not
 * transcribed from him. Get इम्रान अत्तार to approve or rewrite it before
 * launch; nothing should be published in his voice that he has not agreed to.
 */
export const OWNER = {
  nameMr: "इम्रान अत्तार",
  nameEn: "Imran Attar",
  roleMr: "संचालक",
  roleEn: "Proprietor",
  introMr:
    "हॉटेल अतिथीच्या मागे एकच साधा विचार आहे — दारात येणारा पाहुणा हा देवासमान. तो विचार रोज ताटात उतरवण्याचं काम इम्रान अत्तार आणि त्यांची टीम करते.",
  quoteMr: [
    "हॉटेल सुरू करताना डोक्यात एकच गोष्ट होती — इथं येणाऱ्या प्रत्येक माणसाला घरच्यासारखं वाटलं पाहिजे.",
    "म्हणूनच मसाला आम्ही घरीच वाटतो, हंडी आधी बनवून ठेवत नाही आणि ऑर्डर आल्यावरच चूल पेटते. थोडा वेळ लागतो, पण ताटात येणारी चव तीच असते — गावाकडची.",
    "तुम्ही एकदा जेवायला या, आणि चव कशी वाटली ते आवर्जून सांगा. तीच आमची खरी कमाई.",
  ],
};

/** Who built the site. Sits in its own strip at the very foot of the page. */
export const DEVELOPER = {
  name: "ABtech Solution",
  phone: "7666287015",
  phoneHref: "tel:+917666287015",
  url: "https://abtechservices.store/",
};

export const NAV_LINKS = [
  { id: "home", labelEn: "Home", labelMr: "मुख्यपृष्ठ" },
  { id: "signature", labelEn: "Specials", labelMr: "खासियत" },
  { id: "about", labelEn: "About Us", labelMr: "आमच्याबद्दल" },
  { id: "menu", labelEn: "Menu", labelMr: "मेनू" },
  { id: "gallery", labelEn: "Gallery", labelMr: "गॅलरी" },
  { id: "services", labelEn: "Services", labelMr: "सेवा" },
  { id: "reviews", labelEn: "Reviews", labelMr: "अभिप्राय" },
  { id: "contact", labelEn: "Contact", labelMr: "संपर्क" },
];

/**
 * Deliberately countable facts taken from the hotel's own menu and photographs
 * — no invented customer counts or ratings.
 */
export const STATS = [
  { value: 60, plus: true, labelMr: "मेनूमधील पदार्थ", labelEn: "Dishes on the menu" },
  { value: 30, unit: "मिनिटं", labelMr: "ताज्या जेवणाची तयारी", labelEn: "Cooked to order" },
  { value: 2, labelMr: "गार्डन आणि इनडोअर हॉल", labelEn: "Dining halls" },
  { value: 4, labelMr: "थाळी प्रकार", labelEn: "Thali varieties" },
];
