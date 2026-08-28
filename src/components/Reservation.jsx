import { useMemo, useRef, useState } from "react";
import {
  CalendarDays,
  Check,
  Clock,
  MessageSquare,
  Phone,
  User,
  Users,
} from "lucide-react";

import SectionHeading from "./ui/SectionHeading";
import SmartImage from "./ui/SmartImage";
import Reveal from "./ui/Reveal";
import Field from "./ui/Field";
import { WhatsappIcon } from "./ui/BrandIcons";
import figure from "../assets/logo/atithi-figure.png";
import { IMAGES } from "../data/images";
import { SITE } from "../data/siteData";
import { reservationLink } from "../lib/whatsapp";

const EMPTY = {
  name: "",
  mobile: "",
  date: "",
  time: "19:30",
  guests: "2",
  note: "",
};

const OPENS = "11:00";
const CLOSES = "23:00";

/** Local YYYY-MM-DD (never UTC — that can roll the date back a day in IST). */
function todayISO() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

/** Indic text uses ZWJ/ZWNJ to control conjunct forms; they are not letters. */
const stripJoiners = (value) => value.replace(/[‌‍]/g, "");

function validate(values) {
  const errors = {};

  const name = values.name.trim();
  if (!name) errors.name = "कृपया आपले नाव लिहा.";
  else if (name.length < 2) errors.name = "नाव किमान २ अक्षरांचे हवे.";
  // \p{M} matters: Devanagari matras are combining marks, not letters, so a
  // letters-only check would reject every Marathi name.
  else if (!/^[\p{L}\p{M}\s.'-]+$/u.test(stripJoiners(name)))
    errors.name = "नावात फक्त अक्षरे वापरा.";

  const mobile = values.mobile.replace(/[\s-]/g, "").replace(/^\+?91/, "");
  if (!mobile) errors.mobile = "मोबाईल नंबर आवश्यक आहे.";
  else if (!/^[6-9]\d{9}$/.test(mobile)) errors.mobile = "१० अंकी वैध मोबाईल नंबर टाका.";

  if (!values.date) errors.date = "तारीख निवडा.";
  else if (values.date < todayISO()) errors.date = "मागील तारीख निवडता येणार नाही.";

  if (!values.time) errors.time = "वेळ निवडा.";
  else if (values.time < OPENS || values.time > CLOSES)
    errors.time = "आमची वेळ ११:०० AM ते ११:०० PM आहे.";

  const guests = Number(values.guests);
  if (!values.guests) errors.guests = "पाहुण्यांची संख्या लिहा.";
  else if (!Number.isInteger(guests) || guests < 1 || guests > 30)
    errors.guests = "१ ते ३० दरम्यान संख्या टाका. मोठ्या ग्रुपसाठी फोन करा.";

  if (values.note.length > 300) errors.note = "जास्तीत जास्त ३०० अक्षरे.";

  return errors;
}

const INPUT =
  "w-full rounded-xl border-2 bg-white px-4 py-3 text-ink outline-none transition-colors duration-200 placeholder:text-ink/55 focus:border-vermillion";

/** Hours and the direct line — shown beside the form, or above it on a phone. */
function BookingFacts({ className = "" }) {
  return (
    <ul className={`space-y-4 text-sm ${className}`}>
      <li className="flex items-start gap-3">
        <Clock className="mt-0.5 size-5 shrink-0 text-vermillion" aria-hidden="true" />
        <span>
          <span className="block font-semibold text-ink">{SITE.hours.daysMr}</span>
          <span className="text-ink/75">{SITE.hours.time}</span>
        </span>
      </li>
      <li className="flex items-start gap-3">
        <Phone className="mt-0.5 size-5 shrink-0 text-vermillion" aria-hidden="true" />
        <span>
          <span className="block font-semibold text-ink">थेट बुकिंग</span>
          <a
            href={SITE.phoneHref}
            className="text-ink/75 underline-offset-2 hover:text-vermillion hover:underline"
          >
            {SITE.phone}
          </a>
        </span>
      </li>
    </ul>
  );
}

/**
 * Table booking.
 *
 * The hotel runs no booking backend and watches no inbox — the number on the
 * signboard is a WhatsApp number. So the form's job is to *compose* the
 * booking, not to transmit it: it validates, formats the details the way the
 * kitchen wants to read them, and hands the reader to WhatsApp with the
 * message already typed. Nothing can be silently lost in a queue nobody reads.
 */
export default function Reservation() {
  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [sent, setSent] = useState(null); // null | { name, href }

  const formRef = useRef(null);
  const minDate = useMemo(() => todayISO(), []);

  // Errors are derived, never stored — that keeps them in lockstep with the
  // values and avoids one stale update clobbering another field.
  const errors = useMemo(() => validate(values), [values]);

  const update = (field) => (event) => {
    const { value } = event.target;
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const blur = (field) => () => setTouched((prev) => ({ ...prev, [field]: true }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = validate(values);
    setTouched({
      name: true,
      mobile: true,
      date: true,
      time: true,
      guests: true,
      note: true,
    });

    if (Object.keys(found).length) {
      // Send the reader to the first thing that needs fixing rather than
      // leaving them at a button that quietly did nothing.
      formRef.current?.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    const href = reservationLink({
      name: values.name.trim(),
      mobile: values.mobile.replace(/[\s-]/g, ""),
      date: values.date,
      time: values.time,
      guests: Number(values.guests),
      note: values.note.trim(),
    });

    // Opened straight from the submit gesture, so it is not treated as a
    // popup. The confirmation still carries the link in case it is blocked.
    window.open(href, "_blank", "noopener,noreferrer");
    setSent({ name: values.name.trim(), href });
  };

  const reset = () => {
    setValues(EMPTY);
    setTouched({});
    setSent(null);
  };

  const errorFor = (field) => (touched[field] ? errors[field] : undefined);
  const borderFor = (field) =>
    errorFor(field) ? "border-vermillion/60" : "border-sand-2";

  return (
    <section id="reservation" className="section-pad relative overflow-hidden bg-ink">
      <div className="absolute inset-0" aria-hidden="true">
        <SmartImage src={IMAGES.hallIndoor} alt="" className="h-full w-full" />
        <div className="absolute inset-0 bg-ink/90" />
        <div className="absolute inset-0 motif opacity-[0.06]" />
      </div>

      <div className="shell relative">
        {/* tone="light" is not decoration here: the default ink headline was
            being painted onto an ink ground and was effectively invisible. */}
        <SectionHeading
          kicker="Reservation"
          title="आजच आपली टेबल बुक करा!"
          subtitle="फॉर्म भरा — तुमचं बुकिंग थेट आमच्या व्हॉट्सअ‍ॅपवर तयार होईल."
          tone="light"
        />

        <Reveal delay={140}>
          <div className="mx-auto mt-12 grid max-w-5xl overflow-hidden rounded-3xl bg-cream shadow-lift lg:grid-cols-[0.82fr_1.18fr]">
            {/* ---------- yellow rail ---------- */}
            <aside className="relative hidden flex-col justify-center gap-9 overflow-hidden bg-saffron p-8 lg:flex">
              <img
                src={figure}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-3 left-1/2 w-64 -translate-x-1/2 opacity-95"
              />

              <div className="relative">
                <h3 className="font-marathi text-2xl leading-snug text-vermillion">
                  पाहुणचार आमची परंपरा
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">
                  आगाऊ आरक्षण केल्यास तुमच्या आवडीची जागा मिळवणे सोपे जाते —
                  विशेषतः शनिवार-रविवार आणि सणासुदीला.
                </p>
              </div>

              <BookingFacts className="relative pb-40" />
            </aside>

            {/* ---------- form ---------- */}
            <div className="relative p-6 sm:p-9">
              {sent ? (
                <div
                  role="status"
                  className="flex min-h-[26rem] animate-fade-in flex-col items-center justify-center text-center"
                >
                  <span className="grid size-20 place-items-center rounded-full bg-whatsapp-deep text-white shadow-[0_16px_40px_-12px_rgba(10,107,61,0.6)]">
                    <Check className="size-10" strokeWidth={3} aria-hidden="true" />
                  </span>

                  <h3 className="mt-6 font-marathi text-2xl text-ink sm:text-3xl">
                    व्हॉट्सअ‍ॅप उघडलं आहे!
                  </h3>
                  <p className="mt-3 max-w-sm font-mr-ui text-base leading-relaxed text-ink/75">
                    धन्यवाद {sent.name}! तुमच्या बुकिंगचा संदेश तयार आहे — फक्त
                    <span className="font-semibold text-ink"> Send </span>
                    दाबा. आम्ही खात्रीसाठी लगेच उत्तर देऊ.
                  </p>

                  {/* A blocked popup would otherwise leave the reader stranded
                      on a success screen with nothing sent. */}
                  <a
                    href={sent.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-whatsapp-deep px-6 py-3 text-sm font-semibold text-white shadow-lift transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-whatsapp-deep-2"
                  >
                    <WhatsappIcon className="size-5" />
                    व्हॉट्सअ‍ॅप उघडलं नाही? इथे क्लिक करा
                  </a>

                  <button
                    type="button"
                    onClick={reset}
                    className="mt-5 rounded-full px-2 py-1 text-sm font-semibold text-vermillion underline underline-offset-4 hover:text-vermillion-2"
                  >
                    आणखी एक बुकिंग करा
                  </button>
                </div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  noValidate
                  className="grid gap-5 sm:grid-cols-2"
                >
                  {/* On a phone the saffron rail is hidden, and with it the
                      only mention of the opening hours and the direct line. */}
                  <div className="rounded-2xl border border-sand-2 bg-white/70 p-5 sm:col-span-2 lg:hidden">
                    <BookingFacts />
                  </div>

                  <div className="sm:col-span-2">
                    <Field label="पूर्ण नाव" icon={User} error={errorFor("name")} required>
                      <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        placeholder="उदा. अमोल पाटील"
                        value={values.name}
                        onChange={update("name")}
                        onBlur={blur("name")}
                        className={`${INPUT} ${borderFor("name")}`}
                      />
                    </Field>
                  </div>

                  <Field label="मोबाईल नंबर" icon={Phone} error={errorFor("mobile")} required>
                    <input
                      type="tel"
                      name="mobile"
                      inputMode="numeric"
                      autoComplete="tel"
                      placeholder="98765 43210"
                      value={values.mobile}
                      onChange={update("mobile")}
                      onBlur={blur("mobile")}
                      className={`${INPUT} ${borderFor("mobile")}`}
                    />
                  </Field>

                  <Field
                    label="पाहुण्यांची संख्या"
                    icon={Users}
                    error={errorFor("guests")}
                    required
                  >
                    <input
                      type="number"
                      name="guests"
                      min="1"
                      max="30"
                      step="1"
                      value={values.guests}
                      onChange={update("guests")}
                      onBlur={blur("guests")}
                      className={`${INPUT} ${borderFor("guests")}`}
                    />
                  </Field>

                  <Field label="तारीख" icon={CalendarDays} error={errorFor("date")} required>
                    <input
                      type="date"
                      name="date"
                      min={minDate}
                      value={values.date}
                      onChange={update("date")}
                      onBlur={blur("date")}
                      className={`${INPUT} ${borderFor("date")}`}
                    />
                  </Field>

                  <Field
                    label="वेळ"
                    icon={Clock}
                    error={errorFor("time")}
                    hint="११:०० AM – ११:०० PM"
                    required
                  >
                    <input
                      type="time"
                      name="time"
                      min={OPENS}
                      max={CLOSES}
                      value={values.time}
                      onChange={update("time")}
                      onBlur={blur("time")}
                      className={`${INPUT} ${borderFor("time")}`}
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <Field
                      label="खास सूचना"
                      icon={MessageSquare}
                      error={errorFor("note")}
                      hint={`ऐच्छिक — वाढदिवस, जैन जेवण, बसण्याची आवड इत्यादी. (${values.note.length}/300)`}
                    >
                      <textarea
                        name="note"
                        rows="3"
                        maxLength="300"
                        placeholder="उदा. खिडकीजवळचे टेबल हवे आहे."
                        value={values.note}
                        onChange={update("note")}
                        onBlur={blur("note")}
                        className={`${INPUT} resize-none ${borderFor("note")}`}
                      />
                    </Field>
                  </div>

                  <div className="sm:col-span-2">
                    {/* The button says where it goes: tapping it leaves the
                        site for WhatsApp, and that should not be a surprise. */}
                    <button
                      type="submit"
                      className="group/btn inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-whatsapp-deep px-8 py-4 text-base font-semibold text-white shadow-[0_18px_40px_-14px_rgba(10,107,61,0.7)] transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-whatsapp-deep-2 active:scale-[0.98]"
                    >
                      <WhatsappIcon className="size-5" />
                      व्हॉट्सअ‍ॅपवर बुकिंग पाठवा
                    </button>
                    <p className="mt-3 text-center text-xs text-ink/70">
                      <span aria-hidden="true" className="text-vermillion">
                        *
                      </span>{" "}
                      आवश्यक माहिती · संदेश आधीच टाईप केलेला असेल, फक्त Send दाबा.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
