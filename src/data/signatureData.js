import { IMAGES } from "./images";

/**
 * The three plates the hotel puts on its own table card and signboard.
 * "कमी कालावधीत प्रसिद्ध झालेले थाळी" is their wording, not ours.
 *
 * Each dish is shown inside a circular medallion, so the photograph has to
 * survive a round crop. `fit: "contain"` is for the studio cut-out, which has
 * a transparent background and should float on the saffron disc rather than be
 * cropped into it — the same composition as the logo badge.
 */
export const SIGNATURES = [
  {
    id: "jatra-dhangari-thali",
    nameMr: "जत्रा धनगरी थाळी",
    nameEn: "Jatra Dhangari Thali",
    descMr:
      "मटण किंवा चिकन — कमी कालावधीत प्रसिद्ध झालेली आमची खास थाळी. रस्सा, सुक्कं, ज्वारीची भाकरी, भात आणि सोलकढी.",
    price: 240,
    priceNote: "मटण / चिकन",
    image: IMAGES.cutoutMuttonThali,
    fit: "contain",
    tagMr: "सर्वाधिक प्रसिद्ध",
  },
  {
    id: "jatra-dhangari-handi",
    nameMr: "जत्रा धनगरी हंडी",
    nameEn: "Jatra Dhangari Handi",
    descMr:
      "सर्वांना आवडणारी हंडी — गावरान मसाल्यात मंद आचेवर शिजवलेलं मटण, सोबत बटर नान.",
    price: 350,
    priceNote: "हाफ / फुल ६५०",
    image: IMAGES.heroMuttonBowl,
    tagMr: "सर्वांना आवडणारी",
  },
  {
    id: "mutton-thali",
    nameMr: "मटण थाळी",
    nameEn: "Mutton Thali",
    descMr:
      "तांबडा रस्सा, सुक्कं मटण, कोशिंबीर, ताक आणि गरम ज्वारीची भाकरी — पूर्ण गावाकडचं जेवण.",
    price: 240,
    priceNote: "चिकन थाळी ₹180",
    image: IMAGES.thaliMuttonTop,
    tagMr: "गावाकडची चव",
  },
];
