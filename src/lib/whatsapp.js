import { SITE } from "../data/siteData";

/**
 * Every WhatsApp deep link the site opens is composed here.
 *
 * The hotel has no booking backend and no inbox it watches — WhatsApp is the
 * number on the signboard and the one it actually answers. So an enquiry, a
 * dish order and a table booking all arrive the same way, and the wording of
 * each can only be changed in one place.
 */

/** Devanagari digits, because the rest of the site prints numbers this way. */
const MR_DIGITS = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
const toMr = (value) => String(value).replace(/\d/g, (d) => MR_DIGITS[Number(d)]);

function link(lines) {
  return `${SITE.whatsappHref}?text=${encodeURIComponent(lines.filter(Boolean).join("\n"))}`;
}

/** "ऑर्डर करा" on a dish card. */
export function orderLink({ nameMr, price }) {
  return link([
    `नमस्कार! मला ${SITE.nameMr} मधून "${nameMr}" (₹${price}) ऑर्डर करायचं आहे.`,
  ]);
}

/**
 * The general enquiry button — hall bookings, party planning, anything that
 * needs a conversation rather than a form.
 */
export function enquiryLink(topicMr) {
  return link([
    `नमस्कार ${SITE.nameMr}!`,
    topicMr
      ? `मला ${topicMr} बद्दल चौकशी करायची आहे.`
      : "मला तुमच्या सेवांबद्दल चौकशी करायची आहे.",
    "",
    "कृपया अधिक माहिती द्या. धन्यवाद!",
  ]);
}

/** ISO date (YYYY-MM-DD) → "२८-०८-२०२६", the way a reader here expects it. */
function formatDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return toMr(`${d}-${m}-${y}`);
}

/** 24h "19:30" → "संध्याकाळी ७:३०". */
function formatTime(value) {
  if (!value) return "";
  const [hRaw, min] = value.split(":");
  const h = Number(hRaw);
  const period =
    h < 12 ? "सकाळी" : h < 16 ? "दुपारी" : h < 20 ? "संध्याकाळी" : "रात्री";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${period} ${toMr(h12)}:${toMr(min)}`;
}

/**
 * A table booking, laid out so the hotel can read it at a glance on a phone
 * and reply without having to ask for anything twice.
 */
export function reservationLink({ name, mobile, date, time, guests, note }) {
  return link([
    `नमस्कार ${SITE.nameMr}! मला टेबल बुक करायचं आहे.`,
    "",
    `👤 नाव: ${name}`,
    `📞 मोबाईल: ${mobile}`,
    `📅 तारीख: ${formatDate(date)}`,
    `🕒 वेळ: ${formatTime(time)}`,
    `👥 पाहुणे: ${toMr(guests)}`,
    note ? `📝 सूचना: ${note}` : null,
    "",
    "कृपया आरक्षण निश्चित करा. धन्यवाद!",
  ]);
}
