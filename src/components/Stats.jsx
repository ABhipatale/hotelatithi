import { useRef } from "react";

import { STATS } from "../data/siteData";
import { useCountUp } from "../hooks/useCountUp";
import { useInView } from "../hooks/useInView";

function Stat({ stat, start, index }) {
  const value = useCountUp(stat.value, start, { duration: 1600 + index * 150 });

  return (
    <div className="px-4 text-center">
      <dd className="flex items-baseline justify-center gap-1.5">
        <span className="font-display text-[3rem] leading-none text-cream sm:text-[3.5rem]">
          {Math.round(value)}
        </span>
        {stat.plus && (
          <span className="font-display text-2xl leading-none text-amber">+</span>
        )}
        {stat.unit && (
          <span className="font-mr-ui text-base font-semibold text-cream/80">
            {stat.unit}
          </span>
        )}
      </dd>

      <dt className="mt-4">
        <span className="block font-mr-ui text-[0.95rem] font-medium text-cream/85">
          {stat.labelMr}
        </span>
        <span className="mt-1.5 block text-[0.62rem] font-bold uppercase tracking-[0.22em] text-cream/70">
          {stat.labelEn}
        </span>
      </dt>
    </div>
  );
}

/**
 * A quiet counting strip. Deliberately the calmest band on the page — these
 * are supporting facts, so they get hairlines and space rather than a loud
 * fill. The dividers sit between columns only, which is why the rule is drawn
 * on every item except the first of each row.
 */
export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.35 });

  return (
    <section
      ref={ref}
      aria-label="Hotel Atithi in numbers"
      className="relative overflow-hidden bg-maroon py-16 sm:py-20"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 motif-dark opacity-5"
      />
      <div className="shell relative">
        <dl className="grid grid-cols-2 gap-y-12 py-4 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <div
              key={stat.labelEn}
              className={`border-cream/12 ${index % 2 === 1 ? "border-l" : ""} ${
                index % 4 !== 0 ? "lg:border-l" : ""
              }`}
            >
              <Stat stat={stat} start={inView} index={index} />
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
