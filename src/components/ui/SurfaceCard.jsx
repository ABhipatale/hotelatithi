/**
 * The lift-on-hover card shell used by every "icon + title + body" row on a
 * light ground (Why Choose Us, Contact details). Keeping it here means the
 * border, the hover lift and the shadow can only be tuned in one place.
 *
 * Renders a plain <div>; the caller supplies the semantics around it.
 */
export default function SurfaceCard({
  as: Tag = "div",
  className = "",
  children,
  ...props
}) {
  return (
    <Tag
      className={`group relative h-full rounded-2xl border border-sand-2 bg-white/75 transition-[transform,border-color,background-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-saffron hover:bg-white hover:shadow-soft ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
