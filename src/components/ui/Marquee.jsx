/**
 * Infinite ticker. The list is rendered twice so the -50% keyframe loops
 * seamlessly; the duplicate is hidden from assistive tech.
 */
export default function Marquee({
  items,
  className = "",
  itemClassName = "",
  speed = "34s",
  separator = "◆",
}) {
  const row = (aria) => (
    <ul className="flex shrink-0 items-center" aria-hidden={aria}>
      {items.map((item, index) => (
        <li key={`${item}-${index}`} className={`flex items-center ${itemClassName}`}>
          <span>{item}</span>
          <span className="mx-5 text-[0.6em] opacity-50 sm:mx-8">{separator}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="marquee-track" style={{ animationDuration: speed }}>
        {row(undefined)}
        {row(true)}
      </div>
    </div>
  );
}
