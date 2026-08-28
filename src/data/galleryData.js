import { IMAGES } from "./images";

/**
 * `span` drives the masonry rhythm on large screens:
 *  - "tall" occupies two rows, "wide" occupies two columns.
 * All photographs are the hotel's own.
 */
export const GALLERY_ITEMS = [
  { id: "g1", image: IMAGES.exteriorFront, span: "wide", captionMr: "गावाकडची माणसं... गावाकडची चव..!", alt: "Front of Hotel Atithi family garden restaurant" },
  { id: "g2", image: IMAGES.thaliJatraDhangari, span: "tall", captionMr: "जत्रा धनगरी थाळी", alt: "Jatra Dhangari thali served at Hotel Atithi" },
  { id: "g3", image: IMAGES.handiNaan, span: "normal", captionMr: "मटण हंडी आणि बटर नान", alt: "Mutton handi with butter naan" },
  { id: "g4", image: IMAGES.gardenSeating, span: "normal", captionMr: "गार्डन बैठक व्यवस्था", alt: "Open-air garden seating at Hotel Atithi" },
  { id: "g5", image: IMAGES.thaliMuttonTable, span: "normal", captionMr: "भरलेली मटण थाळी", alt: "Two mutton thalis served on the table" },
  { id: "g6", image: IMAGES.hallIndoorWide, span: "wide", captionMr: "प्रशस्त इनडोअर हॉल", alt: "Spacious indoor dining hall at Hotel Atithi" },
  { id: "g7", image: IMAGES.kandaBhajiPlates, span: "normal", captionMr: "गरमागरम कांदा भजी", alt: "Plates of crisp onion bhaji with chutney" },
  { id: "g8", image: IMAGES.guestsJevan, span: "normal", captionMr: "पाहुण्यांसोबतचं जेवण", alt: "Guests enjoying a meal together in the garden" },
  { id: "g9", image: IMAGES.kheemaPav, span: "normal", captionMr: "खिमा पाव", alt: "Mutton kheema served with pav" },
  { id: "g10", image: IMAGES.thaliVeg, span: "normal", captionMr: "व्हेज थाळी", alt: "Vegetarian thali with chapati, rice and dal" },
  { id: "g11", image: IMAGES.exteriorParking, span: "normal", captionMr: "प्रशस्त पार्किंग", alt: "Covered parking in front of Hotel Atithi" },
  { id: "g12", image: IMAGES.chaha, span: "normal", captionMr: "कडक स्पेशल चहा", alt: "Two steel cups of strong masala tea" },
];
